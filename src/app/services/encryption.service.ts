import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private readonly ENCRYPTION_KEY = 'coreui-admin-secure-key-2024!';
  private readonly ALGORITHM = 'AES-GCM';
  private readonly IV_LENGTH = 12;
  private readonly TAG_LENGTH = 16;

  // Generate a proper AES key from the password
  private async deriveKey(password: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    // Use PBKDF2 to derive a proper key
    const salt = encoder.encode('coreui-salt-2024');
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );
    
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: this.ALGORITHM, length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  constructor() {}

  /**
   * Encrypts data using AES-GCM
   */
  async encrypt(data: string): Promise<string> {
    try {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      
      // Generate a random IV
      const iv = crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
      
      // Derive the key properly
      const key = await this.deriveKey(this.ENCRYPTION_KEY);
      
      // Encrypt the data
      const encryptedBuffer = await crypto.subtle.encrypt(
        { name: this.ALGORITHM, iv },
        key,
        dataBuffer
      );
      
      // Combine IV and encrypted data
      const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
      combined.set(iv);
      combined.set(new Uint8Array(encryptedBuffer), iv.length);
      
      // Convert to base64
      return btoa(String.fromCharCode(...combined));
    } catch (error) {
      console.error('EncryptionService: Encryption failed:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  /**
   * Decrypts data using AES-GCM
   */
  async decrypt(encryptedData: string): Promise<string> {
    try {
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      
      // Convert from base64
      const combined = new Uint8Array(
        atob(encryptedData).split('').map(char => char.charCodeAt(0))
      );
      
      // Extract IV and encrypted data
      const iv = combined.slice(0, this.IV_LENGTH);
      const encryptedBuffer = combined.slice(this.IV_LENGTH);
      
      // Derive the key properly
      const key = await this.deriveKey(this.ENCRYPTION_KEY);
      
      // Decrypt the data
      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: this.ALGORITHM, iv },
        key,
        encryptedBuffer
      );
      
      return decoder.decode(decryptedBuffer);
    } catch (error) {
      console.error('EncryptionService: Decryption failed:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  /**
   * Safely stores encrypted data in localStorage
   */
  async setEncryptedItem(key: string, value: any): Promise<void> {
    try {
      const jsonString = JSON.stringify(value);
      const encrypted = await this.encrypt(jsonString);
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('EncryptionService: Failed to store encrypted data:', error);
      throw error;
    }
  }

  /**
   * Safely retrieves and decrypts data from localStorage
   */
  async getEncryptedItem<T>(key: string): Promise<T | null> {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) {
        return null;
      }
      
      const decrypted = await this.decrypt(encrypted);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('EncryptionService: Failed to retrieve encrypted data:', error);
      // If decryption fails, remove the corrupted data
      localStorage.removeItem(key);
      return null;
    }
  }

  /**
   * Removes encrypted data from localStorage
   */
  removeEncryptedItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Checks if encrypted data exists in localStorage
   */
  hasEncryptedItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }


}

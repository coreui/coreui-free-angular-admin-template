import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResizeImagesService {

  constructor() { }


  resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<File> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event: any) => {
        const img = new Image();
  
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
  
          // Calculate the new dimensions while maintaining the aspect ratio
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
  
          canvas.width = width;
          canvas.height = height;
  
          const ctx = canvas.getContext('2d');
          ctx!.drawImage(img, 0, 0, width, height);
  
          canvas.toBlob((blob) => {
            const resizedImage = new File([blob!], file.name);
            resolve(resizedImage);
          }, file.type);
  
        };
  
        img.onerror = (error: any) => {
          reject(error);
        };
  
        img.src = event.target.result;
      };
  
      reader.onerror = (error: any) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
  }

}

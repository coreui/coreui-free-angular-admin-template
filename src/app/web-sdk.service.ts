import { Injectable } from '@angular/core';
declare var Hansel: any;

@Injectable({
  providedIn: "root"
})

export class WebSdkService {
  public sdkReady: boolean;
  private sdkPending: boolean;
  private appMetadata = {
    stage: {
      appId: 'ZW5GL9L8X9F1CBXO3509IKK6D',
      appKey: 'D037QVPS2KA71IZ7WGO5I0O84030GVSY7CWOGKU5EWWN2GJS6Q',
      appName: 'Webv8SDK'
    },
    prod: {
      appId: 'O0EM52JT2BPOLQLEG2GO2TZOY',
      appKey: 'HZEBV4D84E8AUVUFU4IHAT0KRM454EJANYCTFQ5LHYAT5EGD0F',
      appName: 'Webv8SDK'
    }
  };
  constructor() {
    this.connect();
  }

  private connect() {
    // cancel if a connection is already in progress
    if (this.sdkPending) {
      return new Promise<any>(resolve => { });
    }
    this.sdkPending = true;
    const connectionPromise = new Promise<boolean>((resolve, reject) => {
      try {
        Hansel.initialize(this.appMetadata.prod.appId, this.appMetadata.prod.appKey, () => {
          this.sdkPending = false;
          console.log('sdk init!!', Hansel);
          resolve(this.sdkReady);
        });
      } catch (error) {
        this.sdkReady = false;
        this.sdkPending = false;
        console.log('sdk failed to init!!');
        reject(this.sdkReady);
      }
    });

    return connectionPromise;
  }

  public getData(type: string, key: string, fallback: any): Promise<any> {
    const promise = new Promise<any>(resolve => {
      // if connection has already been establised
      if (this.sdkReady) {
        try {
          resolve(this.getSDKMethod(type)(key, fallback));
        } catch (error) {
          resolve(fallback);
        }
      } else {
        this.connect()
          .then((status: boolean) => {
            resolve(this.getSDKMethod(type)(key, fallback));
          })
          .catch(er => {
            resolve(fallback);
          });
      }
    });

    return promise;
  }

  private getSDKMethod(type: string) {
    switch (type) {
      case "string":
        return Hansel.getString;
      case "number":
        return Hansel.getNumber;
      case "boolean":
        return Hansel.getBoolean;
      case "JSON":
        return Hansel.getJSON;
    }
  }

  logEvent(event) {
    console.log('logging event!!', event);
    Hansel.logEvent(event);
  }
}

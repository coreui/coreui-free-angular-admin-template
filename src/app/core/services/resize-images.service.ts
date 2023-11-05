import {ApplicationRef, ChangeDetectorRef, Injectable} from '@angular/core';
import {Product} from "@core/model/product";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {AsyncSubject, BehaviorSubject, Observable, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResizeImagesService {

  constructor(private domSanitizer: DomSanitizer) { }


  resizeImage2(file: File, maxWidth: number, maxHeight: number, minWidth: number, minHeight: number): Observable<SafeUrl> {
    const reader = new FileReader();
    const safeUrlSubject = new ReplaySubject<SafeUrl>();
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

        canvas.width = width > minWidth ? width: minWidth;
        canvas.height = height > minHeight? height: minHeight;

        const ctx = canvas.getContext('2d');
        ctx!.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const resizedImage = new File([blob!], file.name);
          safeUrlSubject.next(this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(resizedImage)));
        }, file.type);

      };

      img.onerror = (error: any) => {
        safeUrlSubject.error(error);
      };

      img.src = event.target.result;

    };

    reader.onerror = (error: any) => {
      safeUrlSubject.error(error);
    };
    reader.readAsDataURL(file);
    return safeUrlSubject.asObservable();
  }


}

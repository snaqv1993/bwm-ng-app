import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload.component';
import { ImageCropperModule } from 'ngx-image-cropper';


import { ImageUploadServiceService } from './image-upload-service.service';

@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  exports: [
  ImageUploadComponent
  ],
  declarations: [
  ImageUploadComponent
  ],
  providers: [
  ImageUploadServiceService
  ]
})
export class ImageUploadModule { }

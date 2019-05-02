import { Component, OnInit } from '@angular/core';
import { EditableComponent } from '../editable-component';

@Component({
  selector: 'bwm-editable-image',
  templateUrl: './editable-image.component.html',
  styleUrls: ['./editable-image.component.scss']
})
export class EditableImageComponent extends EditableComponent  implements OnInit {


  ngOnInit() {
  }

  handleImageUpload(imageUrl : string){
  	this.entity[this.entityField] = imageUrl;
  	this.updateEntity();
  }

  handleImageUploadError(){
  	this.cancelUpdate();
  }

  handlerImageLoad(){
  	this.isActiveInput = true;
  }

}

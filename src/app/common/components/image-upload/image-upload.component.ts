import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef  } from '@angular/core';
import { ImageUploadServiceService } from './image-upload-service.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';



class FileSnippet {
	static readonly IMAGE_SIZE = {width: 950, height: 720};
	pending: boolean = false;
	status: string = "INIT";
	constructor(public src: string, public file: File) {}
}

@Component({
	selector: 'bwm-image-upload',
	templateUrl: './image-upload.component.html',
	styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

	@Output() imageUploaded = new EventEmitter();
	@Output() imageError = new EventEmitter();

	@ViewChild('inputFile') myInputVariable: ElementRef;

	imageChangedEvent: any = '';
	croppedImage: any = '';

	selectedFile: FileSnippet;

	constructor(private imageUploadService: ImageUploadServiceService,
				private toastService: ToastrService) { }

	ngOnInit() {
	}

	fileChangeEvent(event: any): void {
		this.imageChangedEvent = event;
		debugger;
	}
	imageCropped(event: ImageCroppedEvent) {
		console.log('1')
		this.croppedImage = event.file;
		if(this.selectedFile){
			this.selectedFile.file = this.croppedImage;
		}
		return this.selectedFile = new FileSnippet('', this.croppedImage)
	}
	imageLoaded() {
		debugger
		// show cropper
		console.log("1");
	}
	cropperReady() {
		// cropper ready
		console.log("2");
	}
	loadImageFailed() {
		// show message
	}

	private onSucess(imageUrl: string) {
		this.selectedFile.pending = false;
		this.selectedFile.status = 'OK';
		this.imageChangedEvent = null;
		this.imageUploaded.emit(imageUrl)
	}

	private onFailure() {
		this.selectedFile.pending = false;
		this.selectedFile.status = 'FAIL';
		this.imageChangedEvent = null;
		this.imageError.emit('')

	}

	processFile(event: any){
		console.log(event.target.files);
		console.log('2')
		//this.imageChangedEvent = event;
		this.selectedFile = undefined;
		const URL = window.URL;
		let file, img;

		if( (file = event.target.files[0]) && (file.type === 'image/png' || file.type === 'image/jpeg') ) {
			img = new Image();
			const self = this;
			img.onload = function () {
				console.log(this.width + "  " + this.height + "   |    " + FileSnippet.IMAGE_SIZE.width + "  " + FileSnippet.IMAGE_SIZE.height);
				if(this.width > FileSnippet.IMAGE_SIZE.width && this.height > FileSnippet.IMAGE_SIZE.height){
					self.imageChangedEvent = event;
				}
				else{
					//self.imageChangedEvent = null;
					this.myInputVariable.nativeElement.value = '';
					self.toastService.error(`Min width is ${FileSnippet.IMAGE_SIZE.width} and Min height is ${FileSnippet.IMAGE_SIZE.height}`, 'Error!')
				}
			}
			img.src = URL.createObjectURL(file);
		}
		else{
			debugger;
			this.myInputVariable.nativeElement.value = '';
			event.target.files = null;
			//this.imageChangedEvent = null;
			this.toastService.error(`Unsupported file type. Only jpeg and png allowed`, 'Error!')
		}
		//this.imageChangedEvent = event;

	}

	uploadImage(event:any) {
		if(this.selectedFile){
			const reader = new FileReader();
			reader.addEventListener('load', (event: any) => {
				this.selectedFile.src = event.target.result;
				this.selectedFile.pending = true;

				this.imageUploadService.uploadImage(this.selectedFile.file).subscribe(
					(imageUrl :string) => {
						this.onSucess(imageUrl)
					},
					(err) => {
						this.toastService.error(err.error.errors[0].detail, 'Failed!')
						this.onFailure()
					})
			})
			reader.readAsDataURL(this.selectedFile.file);
		}	
	}
}

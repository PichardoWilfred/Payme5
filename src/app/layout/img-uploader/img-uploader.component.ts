import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "img-uploader",
  templateUrl: "./img-uploader.component.html",
  styleUrls: ["./img-uploader.component.scss"],
})
export class ImgUploaderComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
  @Output() loan_files = new EventEmitter<File[]>();
  isHovering: boolean;
  files: File[] = [];
  loaded_urls = new Array<string>();

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(event: any) {
    let files = event;
    if (files) {
      for (let file of files) {
        this.files.push(file);
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.loaded_urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
      this.loan_files.emit(this.files);
    }
  }
  deleteImg(index: any): void {
    this.loaded_urls.splice(index, 1);
    this.files.splice(index, 1);
    this.loan_files.emit(this.files); //This updates the main list
  }

  //
}

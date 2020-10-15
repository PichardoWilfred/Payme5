import { Component, OnInit } from "@angular/core";

@Component({
  selector: "img-uploader",
  templateUrl: "./img-uploader.component.html",
  styleUrls: ["./img-uploader.component.scss"],
})
export class ImgUploaderComponent implements OnInit {
  constructor() {}
  ngOnInit() {}

  isHovering: boolean;
  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(file: FileList) {
    for (let i = 0; i < file.length; i++) {
      this.files.push(file.item(i));
    }
  }
}

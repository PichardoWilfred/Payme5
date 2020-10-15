import {
  Directive,
  HostListener,
  Output,
  EventEmitter,
  ElementRef,
} from "@angular/core";

@Directive({
  selector: "[img-drop]",
})
export class ImgDropDirective {
  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  @HostListener("drop", ["$event"])
  onDrop($event) {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  @HostListener("dragover", ["$event"])
  onDragOver($event) {
    $event.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener("dragleave", ["$event"])
  onDragLeave($event) {
    $event.preventDefault();
    this.hovered.emit(false);
  }
}

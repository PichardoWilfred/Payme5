import { Component, OnInit, Input } from "@angular/core";
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";

@Component({
  selector: "upload-task",
  templateUrl: "./upload-task.component.html",
  styleUrls: ["./upload-task.component.scss"],
})
export class UploadTaskComponent implements OnInit {
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {}
  ngOnInit() {
    this.startUpload();
  }

  @Input() file: File;
  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;

  downloadURL: string;

  startUpload() {
    //the storage path

    const path = `promisory-notes/${Date.now()}_${this.file.name}`;
    //Storage bucket
    const ref = this.storage.ref(path);

    //The task itself
    this.task = this.storage.upload(path, this.file);

    //Progress monitoring related
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.db
          .collection("files")
          .add({ downloadURL: this.downloadURL, path });
      })
    );
  }
  isActive(snapshot) {
    return (
      snapshot.state == "running" &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}

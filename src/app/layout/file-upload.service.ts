import { Injectable } from "@angular/core";

import {
  AngularFireStorage,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  constructor(public storage: AngularFireStorage) {}
  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  downloadURL = [];

  async uploadImages(file: File) {
    return new Promise((resolve, reject) => {
      //The storage path
      const path = `promisory-notes/${Date.now()}_${file.name}`;
      //Storage bucket
      const ref = this.storage.ref(path);
      //The task itself
      this.task = this.storage.upload(path, file);
      //return file_urls;
      this.task.then((ref) => {
        let url = ref.ref.getDownloadURL();
        resolve(url);
      });
    });
    //END
  }
  async returnURLs(files: FileList) {
    for (var i = 0; i < files.length; i++) {
      let img_file = files[i];
      await this.uploadImages(img_file).then((res) => {
        this.downloadURL.push(res);
        console.log(`${i + 1}-) ${res}`);
      });
    }
    console.log("The image array:" + this.downloadURL);
    return this.downloadURL;
  }
}

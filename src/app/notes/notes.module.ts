import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesListComponent } from './notes-list/notes-list.component';



@NgModule({
  declarations: [NotesListComponent],
  imports: [
    CommonModule
  ],
  exports:[
    NotesListComponent
  ]
})
export class NotesModule { }

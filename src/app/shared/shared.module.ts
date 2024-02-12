import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSongComponent } from './sharedComponents/add-song/add-song.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteSongComponent } from './sharedComponents/delete-song/delete-song.component';

@NgModule({
  declarations: [AddSongComponent, DeleteSongComponent],
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  exports: [AddSongComponent],
})
export class SharedModule {}

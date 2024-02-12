import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MusicDataService } from '../../services/music-data/music-data.service';

@Component({
  selector: 'app-delete-song',
  templateUrl: './delete-song.component.html',
  styleUrls: ['./delete-song.component.scss'],
})
export class DeleteSongComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { deleteSongName: string[]; deleteSongId: string[] },
    public dialogRef: MatDialogRef<DeleteSongComponent>,
    private songService: MusicDataService
  ) {}
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  /**
   * Function to delete the song
   */
  deleteSelectedSongs(): void {
    const decision = confirm(
      'This process cant be undone. Are you sure you want to delete the selected songs?'
    );

    //If user confirms the delete then delete it
    if (decision) {
      this.songService.deleteMarkedSongs(this.data.deleteSongId);
      this.data.deleteSongName = [];
      this.data.deleteSongId = [];
      console.log(this.data.deleteSongId);
      this.dialogRef.close(true);
    }
  }
}

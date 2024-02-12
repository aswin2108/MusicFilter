import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Songs } from '../../model/Song';
import { MusicDataService } from '../../services/music-data/music-data.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss'],
})
export class AddSongComponent implements OnInit {
  addForm: FormGroup;
  newSong: Songs;

  constructor(
    public dialogRef: MatDialogRef<AddSongComponent>,
    private fb: FormBuilder,
    private songService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.initializeAddSongForm();
  }

  /**
   * Function initialize the add song form and to add validators
   */
  initializeAddSongForm(): void {
    this.addForm = this.fb.group({
      id: this.fb.control(
        this.songService.generateSongId(),
        Validators.required
      ),
      songName: this.fb.control('', Validators.required),
      artistName: this.fb.control('', Validators.required),
      numberOfStreams: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      releaseYear: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      durationInSeconds: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    }) as FormGroup & Songs;
    this.valueChanges();
  }

  /**
   * Function to subscribe to the add form
   */
  valueChanges(): void {
    this.addForm.valueChanges.subscribe((newData: Songs) => {
      this.newSong = newData;
      console.log(this.newSong);
    });
  }

  /**
   * Function to add song into the list
   */
  submitAddSong(): void {
    this.songService.addSongEntry(this.newSong);
    this.dialogRef.close(true);
  }

  /**
   * Toclose the dialog box
   */
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}

import { Component, OnInit } from '@angular/core';
import {
  Filter,
  MusicDataService,
} from './shared/services/music-data/music-data.service';
import { songs as AllSongs } from './../assets/songs';
import { cloneDeep } from 'lodash';
import { Songs } from './shared/model/Song';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  searchData: Filter = { songName: '', artistName: '' };
  displaySongs: Songs[] = [];
  filteredSongs: Songs[] = [];
  dataManipulated = false;
  constructor(private songService: MusicDataService) {}

  ngOnInit(): void {
    this.displaySongs = cloneDeep(AllSongs);
    this.getSearchData();
    this.getFilteredData();
    // this.getStatusOfData();
  }

  /**
   * To recieve the search data into the app component by subscribing
   */
  getSearchData(): void {
    this.songService.searchDataSubject$.subscribe((data: Filter) => {
      this.searchData = data;
      this.filteredSongs = this.songService.filterSongs(this.searchData);
    });
  }

  /**
   * Calls the filtered data to get the updated list
   * @param status Recieves true when data is deleted or added
   */
  getDataManipulatedStatus(status: boolean): void {
    if (status) this.getFilteredData();
  }

  /**
   * To obtain the filtered data using the search data
   */
  getFilteredData(): void {
    this.filteredSongs = this.songService.filterSongs(this.searchData);
  }
}

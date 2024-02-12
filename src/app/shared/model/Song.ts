//Song type which has the fields of one song
export class Songs {
  id: string;
  songName: string;
  artistName: string;
  numberOfStreams: number;
  releaseYear: number;
  durationInSeconds: number;
  durationInMMSS: string;
}

//The extra property for maintaining the check mark on table
export class SongDisplay extends Songs {
  isSelected: boolean;
}

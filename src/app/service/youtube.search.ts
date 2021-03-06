import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { YoutubeDataApi } from './youtube-data-api.service';

@Injectable()
export class YoutubeSearch {
  private _api: string = 'search';
  private _apiOptions = {
    part: 'snippet,id',
    q: '',
    type: 'video',
    pageToken: '',
    chart: '',
    regionCode: ''
  };

  constructor(
    private youtubeDataApi: YoutubeDataApi
  ) { }

  search(query: string, params?: any): Observable<Object> {
    if (query || '' === query) {
      const preset = params ? ` ${params.preset}` : '';
      this._apiOptions.q = `${query}${preset}`;
    }
    return this.youtubeDataApi.list(this._api, this._apiOptions);
  }

  searchMore(nextPageToken: string) {
    this._apiOptions.pageToken = nextPageToken;
    return this;
  }

  resetPageToken() {
    this._apiOptions.pageToken = '';
    return this;
  }

  getMostPopularVideos(region: string) {
    this._apiOptions.chart = 'mostPopular';
    this._apiOptions.regionCode = region;
    return this.youtubeDataApi.list(this._api, this._apiOptions);
  }
}

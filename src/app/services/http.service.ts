/*
* HTTP Service
* @author Ludovic Dupont
*/

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BookmarkModel } from '../models/bookmarkModel';
import { Observable } from 'rxjs/Rx';
import { Video } from '../add-bookmark/video/video.component';
import { Photo } from '../add-bookmark/photo/photo.component';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {

	private BASE_URL: string = 'http://localhost:8080/api/bookmarks/';

	constructor(
		private http: Http
	) { }

	public getAllBookmark() {
		return this.http.get(`${this.BASE_URL}`)
			.map(function(res: Response) {
				return this.convertBookmarkData(res.json());
			}.bind(this))
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public addBookmark(body: BookmarkModel) {
		let options = new RequestOptions({
			headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
		});
		return this.http.post(`${this.BASE_URL}`, JSON.stringify(body), options)
			.map(function(res: Response) {
				return this.convertBookmarkData(res.json());
			}.bind(this))
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public updateBookmark(body: BookmarkModel) {
		let options = new RequestOptions({
			headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
		});

		return this.http.put(`${this.BASE_URL}${body['_id']}`, JSON.stringify(body), options)
			.map(function(res: Response) {
				return this.convertBookmarkData(res.json());
			}.bind(this))
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public deleteBookmarks(bookmarksID: string) {
		let options = new RequestOptions({
			headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
		});

		return this.http.delete(`${this.BASE_URL}${bookmarksID}`, options)
			.map(function(res: Response) {
				return this.convertBookmarkData(res.json());
			}.bind(this))
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	private convertBookmarkData(data){
		var bookmarks = [];
		for(var i in data.bookmarks){
			bookmarks[i] = new BookmarkModel(data.bookmarks[i].type == 'v' ? Video : Photo, data.bookmarks[i]);
		}
		data.bookmarks = bookmarks;
		return data;
	}
}

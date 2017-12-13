/*
* List bookmarks
* @author Ludovic Dupont
*/
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HttpService } from '../services/http.service';
import { EmitterService } from '../services/emitter.service';
import { BookmarkModel } from '../models/bookmarkModel';

@Component({
	selector: 'app-bookmark-list',
	templateUrl: './bookmark-list.component.html',
	styleUrls: ['./bookmark-list.component.css'],
	providers: [HttpService],
})
export class BookmarkListComponent implements OnInit, OnChanges{

	@Input() reset: string;
	@Input() editData: string;
	@Input() showList: string;

	private bookmarks;
	private currentBookmark;
	// dataTable
	private rowsOnPage = 5;
	private sortBy = "authorName";
	private sortOrder = "asc";

	constructor(
		private httpService: HttpService
	) { }

	ngOnInit() {
		this.httpService.getAllBookmark().subscribe(
			response => {
				this.bookmarks = response.bookmarks;
			},
			error => { alert(`Can't get bookmarks.`); }
		);
	}

	public editBookmark(bookmark) {
		this.currentBookmark = bookmark;// Current bookmark in edition
		// Call edition form
		EmitterService.get(this.editData).emit(this.currentBookmark);
	}

	public deleteBookmarks(bookmarkId: string) {
		this.httpService.deleteBookmarks(bookmarkId).subscribe(
			response => {
				if (response.error) {
					alert(`The bookmark could not be deleted, server Error.`);
				} else {
					this.bookmarks = response.bookmarks;
					// Reset add form if the deleted bookmark was in edition
					if(this.currentBookmark && this.currentBookmark.data._id == bookmarkId){
						EmitterService.get(this.reset).emit();
					}
				}
			},
			error => {
				alert(`The bookmark could not be deleted, server Error.`);
			}
		);
	}

	public addBookmark(bookmarkId: string) {
		// Reset form on click on add button
		EmitterService.get(this.reset).emit();
	}

	ngOnChanges(changes: any) {
		// Delete currentBookmark if add form is reset
		EmitterService.get(this.reset).subscribe((value: BookmarkModel) => {
			this.currentBookmark = null;
		});
		// Refresh list of bookmarks
		EmitterService.get(this.showList).subscribe((bookmarks: BookmarkModel[]) => {
			this.bookmarks = bookmarks;
		});
	}
}

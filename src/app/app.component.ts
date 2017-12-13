/*
* Component
* @author Ludovic Dupont
*/

import { Component } from '@angular/core';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';
import { AddBookmarkComponent } from './add-bookmark/add-bookmark.component';
import { EmitterService } from './services/emitter.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {

	public title: string = 'Gestion des bookmarks';

	private editData = 'CRUD_BOOKMARK_INFO';
	private reset = 'CRUD_RESET_FORM';
	private showList = 'CRUD_BOOKMARK_LIST';

	constructor(private _emitterService: EmitterService) { }
}

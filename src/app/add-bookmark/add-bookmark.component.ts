/*
* Add bookmark
* @author Ludovic Dupont
*/

import { Component, Input, OnChanges, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { EmitterService } from '../services/emitter.service';
import { BookmarkModel } from '../models/bookmarkModel';
import { BookmarkComponent } from './bookmark.component';
import { BookmarkDirective } from './bookmark.directive';
import { Video } from './video/video.component';
import { Photo } from './photo/photo.component';

@Component({
	selector: 'app-add-bookmark',
	templateUrl: './add-bookmark.component.html',
	styleUrls: ['./add-bookmark.component.css'],
	providers: [HttpService]
})
export class AddBookmarkComponent implements OnChanges, OnInit {

	@Input() editData: string;
	@Input() reset: string;
	@Input() showList: string;
	@ViewChild(BookmarkDirective) adHost: BookmarkDirective;

	private isInsert: boolean = true;
	private bookmarkModel;
	private editForm : FormGroup;

	constructor(
		private httpService: HttpService,
		private componentFactoryResolver: ComponentFactoryResolver,
		formBuilder: FormBuilder
	) {
		this.bookmarkModel = new BookmarkModel(Video, {type: "v", tags:[]});
		// Config required fields
		this.editForm = formBuilder.group({
			'type' : [this.bookmarkModel.data.type, Validators.required],
			'url': [this.bookmarkModel.data.url, Validators.required],
			'title' : [this.bookmarkModel.data.title, Validators.required],
			'authorName' : this.bookmarkModel.data.authorName,
			'tags': this.bookmarkModel.data.tags
		})
	}

	ngOnInit() {
		this.resetAddBookmark();
	}

	public addBookmark() {
		this.httpService.addBookmark(this.bookmarkModel.data).subscribe(
			response => {
				if (response.error) {
					alert(`The bookmark could not be added, server Error.`);
				} else {
					EmitterService.get(this.showList).emit(response.bookmarks);
					EmitterService.get(this.reset).emit();
				}
			},
			error => {
				alert(`The bookmark could not be added, server Error.`);
			}
		);
	}

	public updateBookmark() {
		this.httpService.updateBookmark(this.bookmarkModel.data).subscribe(
			response => {
				if (response.error) {
					alert(`The bookmark could not be updated, server Error.`);
				} else {
					EmitterService.get(this.showList).emit(response.bookmarks);
				}
			},
			error => {
				alert(`The bookmark could not be updated, server Error.`);
			}
		);
	}

	public resetAddBookmark() {
		this.bookmarkModel = new BookmarkModel(Video, {type: "v", tags:[]});
		this.loadBookmarkComponent(this.bookmarkModel);
		this.isInsert = true;
	}

	public changeType(type){
		var item = this.bookmarkModel;
		item.data.type = type;
		var bookmark = new BookmarkModel(item.data.type == 'v' ? Video : Photo, item.data);
		this.loadBookmarkComponent(bookmark);
	}

	public loadBookmarkComponent(bookmark){
		this.bookmarkModel = bookmark;
		let componentFactory = this.componentFactoryResolver.resolveComponentFactory(bookmark.component);

		let viewContainerRef = this.adHost.viewContainerRef;// parent html container
		viewContainerRef.clear();

		let componentRef = viewContainerRef.createComponent(componentFactory);
		(<BookmarkComponent>componentRef.instance).data = bookmark.data;
	}

	ngOnChanges(changes: any) {
		EmitterService.get(this.editData).subscribe((bookmark: BookmarkModel) => {
			this.loadBookmarkComponent(bookmark);
			this.isInsert = false;
		});
		EmitterService.get(this.reset).subscribe((value: BookmarkModel) => {
			this.resetAddBookmark();
		});
	}
}

/*
* Module
* @author Ludovic Dupont
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';
import { AddBookmarkComponent } from './add-bookmark/add-bookmark.component';
import { Photo } from './add-bookmark/photo/photo.component';
import { Video } from './add-bookmark/video/video.component';
import { EmitterService } from './services/emitter.service';
import { DataTableModule } from "angular2-datatable";
import { BookmarkDirective } from './add-bookmark/bookmark.directive';
import { RlTagInputModule } from 'angular2-tag-input-fork';

@NgModule({
	declarations: [AppComponent, BookmarkListComponent, AddBookmarkComponent, Photo, Video, BookmarkDirective],
	imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, DataTableModule, RlTagInputModule],
	providers: [EmitterService],
	bootstrap: [AppComponent],
	entryComponents: [
		Photo,
		Video
	],
})
export class AppModule { }

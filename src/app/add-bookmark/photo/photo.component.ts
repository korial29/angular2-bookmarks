/*
* Photo bookmark
* @author Ludovic Dupont
*/
import { Component, Input } from '@angular/core';
import { BookmarkComponent } from '../bookmark.component';

@Component({
	templateUrl: './photo.component.html'
})
export class Photo implements BookmarkComponent{
	@Input() data: any;
}

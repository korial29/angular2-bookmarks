/*
* Video bookmark
* @author Ludovic Dupont
*/

import { Component, Input } from '@angular/core';
import { BookmarkComponent } from '../bookmark.component';

@Component({
	templateUrl: './video.component.html'
})
export class Video implements BookmarkComponent{
	@Input() data: any;
}

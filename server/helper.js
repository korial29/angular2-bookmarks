/*
 * Helper
 * @author Ludovic Dupont
 */

'use strict';

class Helper {

	constructor() {
		this.bookmarks = [];
		for(var i=0; i<10; i++){
			this.bookmarks.push({
				"_id": i,
				"title":"Titre "+i,
				"authorName":
				"Auteur"+i,
				"type": (i % 2 == 1) ? "v" : "p",
				"url": Math.floor(Math.random() * 100000),
				"addDate": this.randomDate(new Date(2012, 0, 1), new Date()),
				"tags": ["tag1","tag2"],
				"width" : Math.floor(Math.random() * 1000),
				"height" : Math.floor(Math.random() * 1000)
			});
		}
		// this.Mongodb = require("./db");
	}

	getBookmarks(callback) {
		callback(this.bookmarks);
	}

	addBookmark(data, callback) {
		var response = {};

		data['addDate'] = new Date();
		data['_id'] = this.bookmarks.length;

		this.bookmarks.push(data);
		response.error = false;
		callback(response);
	}

	removeBookmarks(bookmarkId, callback) {
		for (var i in this.bookmarks) {
			if (bookmarkId == this.bookmarks[i]._id) {
				this.bookmarks.splice(i, 1);
				break;
			}
		}
		callback({
			error: false
		});
	}

	updateBookmark(bookmarkId, data, callback) {
		for (var i in this.bookmarks) {
			if (bookmarkId == this.bookmarks[i]._id) {
				delete data['addDate'];// No date update
				for(var prop in data){
					this.bookmarks[i][prop] = data[prop];
				}
				break;
			}
		}
		callback({
			error: false
		});
	}

	randomDate(start, end) {
		return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	}
}

module.exports = new Helper();

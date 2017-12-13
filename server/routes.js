/*
 * Routes
 * @author Ludovic Dupont
 */
'use strict';
const helper = require("./helper");

class Routes {

	constructor(app) {
		this.app = app;
	}

	/* creating app Routes */
	appRoutes() {
		/* Route to get all bookmarks */
		this.app.get('/api/bookmarks', (request, response) => {
			helper.getBookmarks((result) => {
				if (result) {
					response.status(200).json({
						bookmarks: result
					});
				} else {
					response.status(404).json({
						message: `No bookmark found.`
					});
				}
			});
		});

		/* Route to add new bookmark */
		this.app.post('/api/bookmarks/', (request, response) => {
			helper.addBookmark(request.body, (result) => {
				if (result.error) {
					response.status(403).json({
						error: true,
						message: `Error.`
					});
				} else {
					helper.getBookmarks((result) => {
						if (result) {
							response.status(200).json({
								error: false,
								bookmarks: result
							});
						} else {
							response.status(404).json({
								error: true,
								message: `No bookmark found.`
							});
						}
					});
				};
			});
		});

		/* Route to delete bookmark */
		this.app.delete('/api/bookmarks/:id', (request, response) => {
			if (request.params.id && request.params.id != '') {
				helper.removeBookmarks(request.params.id, (result) => {
					if (result.error) {
						response.status(403).json({
							error: true,
							message: `Error.`
						});
					} else {
						helper.getBookmarks((result) => {
							if (result) {
								response.status(200).json({
									error: false,
									bookmarks: result
								});
							} else {
								response.status(404).json({
									error: true,
									message: `No usres found.`
								});
							}
						});
					};
				});
			} else {
				response.status(403).json({
					error: true,
					message: `Invalid bookmark Id.`
				});
			}
		});

		/* Route to update bookmark */
		this.app.put('/api/bookmarks/:id', (request, response) => {
			if (request.params.id && request.params.id != '') {
				helper.updateBookmark(request.params.id, request.body, (result) => {
					if (result.error) {
						response.status(403).json({
							error: true,
							message: `Error.`
						});
					} else {
						helper.getBookmarks((result) => {
							if (result) {
								response.status(200).json({
									error: false,
									bookmarks: result
								});
							} else {
								response.status(404).json({
									error: true,
									message: `No bookmark found.`
								});
							}
						});
					};
				});
			} else {
				response.status(403).json({
					error: true,
					message: `Invalid bookmark Id.`
				});
			}
		});
	}

	routesConfig() {
		this.appRoutes();
	}
}
module.exports = Routes;

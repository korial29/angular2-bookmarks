/*
* Server node js
* @author Ludovic Dupont
*/
'use strict';
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./server/routes');
class Server{

	constructor(){
		this.port = 8080;
		this.host = `localhost`;
		this.app = express();
	}

	appConfig(){
		this.app.use(bodyParser.json());
		this.app.use(
			cors()
		);
	}

	/* Including app Routes starts*/
	includeRoutes(){
		new routes(this.app).routesConfig();
	}
	/* Including app Routes ends*/

	appExecute(){

		this.appConfig();
		this.includeRoutes();
		// Point static path to dist
		this.app.use(express.static(path.join(__dirname, 'dist')));
		// Catch all other routes and return the index file
		this.app.get('*', (req, res) => {
		  res.sendFile(path.join(__dirname, 'dist/index.html'));
		});
		this.app.listen(this.port, this.host, () => {
			console.log(`Listening on http://${this.host}:${this.port}`);
		});
	}
}

const app = new Server();
app.appExecute();

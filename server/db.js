"use strict";
/*requiring mongodb node modules */
const  mongodb=require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const assert = require('assert');
const MongoUrl='mongodb://localhost:27017/angular2';

module.exports.onConnect = (callback) => {

	MongoClient.connect(MongoUrl, (err, db) => {
		assert.equal(null, err);
		console.log("Connected correctly to server");
		callback(db,ObjectID);
	});

}

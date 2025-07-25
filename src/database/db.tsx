import React from 'react';
import {MongoClient, ObjectId} from "mongodb";

const URI = process.env.MONGODB_URI;
const OPTIONS = { appName: "inventory_app" };

let Client: MongoClient;
if (process.env.NODE_ENV === "development") {
	let globalWithMongo = global as typeof globalThis & {
		_mongoClient?: MongoClient;
	};

	if (!globalWithMongo._mongoClient)
		globalWithMongo._mongoClient = new MongoClient(URI, OPTIONS);
	
	Client = globalWithMongo._mongoClient;
}
else {
	Client = new MongoClient(URI, OPTIONS);
}

Client.connect();

class Database {
	constructor(dbName: string) {
		this.db = Client.db(dbName);
	}
	
	async mapByID(collectionName: string) {
		let byID = {};
		let items = await this.db.collection(collectionName).find({}).toArray();
		items.forEach((item) => {
			byID[item["_id"]] = item;
		});
		
		return byID;
	}
	
	async getAll(collectionName: string) {
		return await this.db.collection(collectionName).find({}).toArray();
	}
	
	async getByID(collectionName: string, id: ObjectId | string) {
		if (typeof id === "string") {
			id = new ObjectId(id);
		}
		
		return await this.db.collection(collectionName).findOne({_id: id});
	}
	
	async add(collectionName: string, props) {
		return await this.db.collection(collectionName).insertOne(props);
	}
	
	async update(collectionName: string, id: (ObjectId | string), props) {
		if (typeof id === "string") {
			id = new ObjectId(id);
		}
		
		return await this.db.collection(collectionName).updateOne({_id: id}, props);
	}
	
	async delete(collectionName: string, id: (ObjectId | string)) {
		if (typeof id === "string") {
			id = new ObjectId(id);
		}
		
		return await this.db.collection(collectionName).deleteOne({_id: id});
	}
}

export default Database;
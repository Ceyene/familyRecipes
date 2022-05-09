import { MongoClient } from 'mongodb';

//FETCHING ALL DOCUMENTS FROM A COLLECTION IN A DB
export async function getAllDocuments(client, collection, sort, filter = {}) {
	const db = client.db();
	//fetching all documents in this collection for this recipe id, in descending order, as an array
	const documents = await db
		.collection(collection)
		.find(filter)
		.sort(sort)
		.toArray();

	return documents;
}

//CONNECTING TO DB
export async function connectDatabase() {
	//creating mongo client
	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.q2qeb.mongodb.net/recipes?retryWrites=true&w=majority`
	);
	return client;
}

//INSERTING DOCUMENT IN DB
export async function insertDocument(client, collection, document) {
	//creating db and collection
	const db = client.db();
	const recipesCollection = db.collection(collection);
	//creating a document
	const result = await recipesCollection.insertOne(document);
	return result;
}

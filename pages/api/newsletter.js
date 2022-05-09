//dependencies
import { MongoClient } from 'mongodb';

async function handler(req, res) {
	try {
		//checking request method
		if (req.method === 'POST') {
			//extracting data from req body
			const userEmail = req.body.email;
			//checking validity of email (important, always check in the backend)
			if (!userEmail || !userEmail.includes('@')) {
				res.status(422).json({ message: 'Invalid email address' });
				return;
			}

			//USING MONGODB
			//creating mongo client
			const client = await MongoClient.connect(
				`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.q2qeb.mongodb.net/newsletter?retryWrites=true&w=majority`
			);
			//creating db and collection
			const db = client.db();
			const recipesCollection = db.collection('emails');
			//creating a document
			const result = await recipesCollection.insertOne({ email: userEmail });
			console.log(result);
			//closing db connection
			client.close();

			//once stored in database, sending json response
			res.status(201).json({ message: 'Signed Up!' });
		}
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ message: error.message });
	}
}

export default handler;

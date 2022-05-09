import { MongoClient } from 'mongodb';
//Comments API Route
// --> /comments/some-recipe-id

async function handler(req, res) {
	try {
		const recipeId = req.query.recipeId; //getting id value from path
		//USING MONGODB
		//creating mongo client
		const client = await MongoClient.connect(
			`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.q2qeb.mongodb.net/recipes?retryWrites=true&w=majority`
		);
		//checking req method
		if (req.method === 'POST') {
			//adding server-side validation (can't be tricked from client-side)
			const { email, name, text } = req.body;
			if (
				!email ||
				!email.includes('@') ||
				!name ||
				name.trim() === '' ||
				!text ||
				text.trim() === ''
			) {
				res.status(422).json({ message: 'Invalid input' });
				return;
			}

			//if valid input --->
			const newComment = {
				email: email,
				name: name,
				text: text,
				id: recipeId,
			};

			//creating db and collection
			const db = client.db();
			const recipesCollection = db.collection('comments');
			//creating a document
			const result = await recipesCollection.insertOne(newComment);
			newComment.id = result.insertedId;

			//sending json response to client
			res.status(201).json({ message: 'Added comment!' });
		}
		if (req.method === 'GET') {
			//USING MONGODB
			//creating db and collection
			const db = client.db();
			const recipesCollection = db.collection('comments');
			//fetching all documents in this collection for this recipe id, in descending order, as an array
			const documents = await recipesCollection
				.find()
				.sort({ _id: -1 })
				.toArray();
			//returning to the client
			res.status(200).json({ comments: documents });
		}

		//closing db connection
		client.close();
	} catch (error) {
		console.log(error);
	}
}

export default handler;

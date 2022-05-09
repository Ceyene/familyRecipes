import { MongoClient } from 'mongodb';
//Comments API Route
// --> /comments/some-recipe-id

async function handler(req, res) {
	try {
		const recipeId = req.query.recipeId; //getting id value from path
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

			//USING MONGODB
			//creating mongo client
			const client = await MongoClient.connect(
				`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.q2qeb.mongodb.net/recipes?retryWrites=true&w=majority`
			);
			//creating db and collection
			const db = client.db();
			const recipesCollection = db.collection('comments');
			//creating a document
			const result = await recipesCollection.insertOne(newComment);
			newComment.id = result.insertedId;
			//closing db connection
			client.close();
			//sending json response to client
			res.status(201).json({ message: 'Added comment!' });
		}
		if (req.method === 'GET') {
			const dummyList = [
				{ id: 'c1', name: 'Marcos', text: 'Awesome recipe, thanks' },
				{ id: 'c2', name: 'Cyn', text: 'Great recipe, thanks' },
			];
			res.status(200).json({ comments: dummyList });
		}
	} catch (error) {
		console.log(error);
	}
}

export default handler;

import {
	getAllDocuments,
	connectDatabase,
	insertDocument,
} from '../../../helpers/db-util';
//Comments API Route
// --> /comments/some-recipe-id

async function handler(req, res) {
	const recipeId = req.query.recipeId; //getting id value from path
	let client;
	//USING MONGODB
	//creating mongo client
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: 'Connecting to the database failed!' });
		return;
	}
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

		let result;

		//creating db and collection
		try {
			result = await insertDocument(client, 'comments', newComment);
			newComment.id = result.insertedId;
			//sending json response to client
			res.status(201).json({ message: 'Added comment!' });
		} catch (error) {
			res.status(500).json({ message: 'Inserting data failed!' });
			return;
		}
	}

	if (req.method === 'GET') {
		//USING MONGODB
		try {
			const documents = await getAllDocuments(
				client,
				'comments',
				{ _id: -1 },
				{ id: recipeId }
			);
			//returning to the client
			res.status(200).json({ comments: documents });
		} catch (error) {
			res.status(500).json({ message: 'Getting comments failed!' });
			return;
		}
	}

	//closing db connection
	client.close();
}

export default handler;

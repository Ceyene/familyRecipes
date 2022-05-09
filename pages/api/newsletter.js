//dependencies
import { MongoClient } from 'mongodb';
import { connectDatabase, insertDocument } from '../../helpers/db-util';

//MONGODB

async function handler(req, res) {
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
		try {
			const client = await connectDatabase();
		} catch (error) {
			res.status(500).json({ message: 'Connecting to the database failed!' });
			return;
		}
		try {
			await insertDocument(client, 'newsletter', { email: userEmail });
			//closing db connection
			client.close();
		} catch (error) {
			res.status(500).json({ message: 'Inserting data failed!' });
			return;
		}

		//once stored in database, sending json response
		res.status(201).json({ message: 'Signed Up!' });
	}
}

export default handler;

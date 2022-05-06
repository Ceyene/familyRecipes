function handler(req, res) {
	//checking request method
	if (req.method === 'POST') {
		//extracting data from req body
		const userEmail = req.body.email;
		//checking validity of email (important, always check in the backend)
		if (!userEmail || !userEmail.includes('@')) {
			res.status(422).json({ message: 'Invalid email address' });
			return;
		}

		//storing in database and sending json response
		console.log(userEmail);
		res.status(201).json({ message: 'Signed Up!' });
	}
}

export default handler;

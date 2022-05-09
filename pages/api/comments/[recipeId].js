//Comments API Route
// --> /comments/some-recipe-id

function handler(req, res) {
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
		//if valid input
		const newComment = {
			id: new Date().toISOString(),
			email: email,
			name: name,
			text: text,
		};
		console.log(newComment);
		res.status(201).json({ message: 'Added comment!' });
	}
	if (req.method === 'GET') {
		const dummyList = [
			{ id: 'c1', name: 'Marcos', text: 'Awesome recipe, thanks' },
			{ id: 'c2', name: 'Cyn', text: 'Great recipe, thanks' },
		];
		res.status(200).json({ comments: dummyList });
	}
}

export default handler;

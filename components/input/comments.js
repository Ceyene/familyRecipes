import { useState, useEffect } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
	const { recipeId } = props;

	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState([]);

	//fetching comments each time we click the toggle button
	useEffect(() => {
		if (showComments) {
			fetch('/api/comments/' + recipeId)
				.then((response) => response.json())
				.then((data) => {
					setComments(data.comments);
				});
		}
	}, [showComments]);

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus);
	}

	async function addCommentHandler(commentData) {
		const url = '/api/comments/' + recipeId;
		try {
			// send data to API
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(commentData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<section className={classes.comments}>
			<button className={classes.toggle} onClick={toggleCommentsHandler}>
				{showComments ? 'Hide' : 'Show'} Comments
			</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && <CommentList comments={comments} />}
		</section>
	);
}

export default Comments;

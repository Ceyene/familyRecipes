import { useState, useEffect, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
	const { recipeId } = props;

	const notificationCtx = useContext(NotificationContext);

	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState([]);
	const [isFetchingComments, setIsFetchingComments] = useState(false);

	//fetching comments each time we click the toggle button
	useEffect(() => {
		if (showComments) {
			setIsFetchingComments(true);
			fetch('/api/comments/' + recipeId)
				.then((response) => response.json())
				.then((data) => {
					setIsFetchingComments(false);
					setComments(data.comments);
				});
		}
	}, [showComments]);

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus);
	}

	async function addCommentHandler(commentData) {
		const url = '/api/comments/' + recipeId;

		notificationCtx.showNotification({
			title: 'Sending comment...',
			message: 'Your comment is being sent',
			status: 'pending',
		});

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
			if (response.ok) {
				notificationCtx.showNotification({
					title: 'Success',
					message: 'Your comment was successfully sent',
					status: 'success',
				});
				toggleCommentsHandler();
			} else {
				throw new Error(data.message || 'Something went wrong...');
			}
		} catch (error) {
			console.log(error.message);
			notificationCtx.showNotification({
				title: 'Error',
				message: error.message,
				status: 'error',
			});
		}
	}

	return (
		<section className={classes.comments}>
			<button className={classes.toggle} onClick={toggleCommentsHandler}>
				{showComments ? 'Hide' : 'Show'} Comments
			</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && !isFetchingComments && (
				<CommentList comments={comments} />
			)}
			{showComments && isFetchingComments && (
				<p className="center">Loading...</p>
			)}
		</section>
	);
}

export default Comments;

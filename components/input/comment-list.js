import classes from './comment-list.module.css';

function CommentList() {
	return (
		<ul className={classes.comments}>
			{/* Render list of comments - fetched from API */}
			<li>
				<p>The recipe is amazing!</p>
				<div>
					By <address>Teo</address>
				</div>
			</li>
			<li>
				<p>The recipe is amazing!</p>
				<div>
					By <address>Mina</address>
				</div>
			</li>
		</ul>
	);
}

export default CommentList;

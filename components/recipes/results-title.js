import Button from '../ui/button';
import classes from './results-title.module.css';

function ResultsTitle(props) {
	const { difficulty, mealType } = props;

	return (
		<section className={classes.title}>
			<h1>
				{mealType} {difficulty} recipes{' '}
			</h1>
			<Button link="/recipes">Show all recipes</Button>
		</section>
	);
}

export default ResultsTitle;

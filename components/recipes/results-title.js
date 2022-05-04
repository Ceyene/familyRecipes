import Button from '../ui/button';
import classes from './results-title.module.css';

function ResultsTitle(props) {
	const { difficulty, mealType } = props;
	const titleCaseMealType =
		mealType.charAt(0).toUpperCase() + mealType.slice(1);
	const titleCaseDifficulty =
		difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

	return (
		<section className={classes.title}>
			<h1>
				{titleCaseMealType !== 'All' && titleCaseMealType}{' '}
				{titleCaseDifficulty !== 'All' && titleCaseDifficulty} Recipes:{' '}
			</h1>
			<Button link="/recipes">Show all recipes</Button>
		</section>
	);
}

export default ResultsTitle;

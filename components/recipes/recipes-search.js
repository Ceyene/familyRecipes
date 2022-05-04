import { useRef } from 'react';

import Button from '../ui/button';
import classes from './recipes-search.module.css';

function RecipesSearch(props) {
	const mealTypeInputRef = useRef();
	const difficultyInputRef = useRef();

	function submitHandler(event) {
		event.preventDefault();

		const selectedMealType = mealTypeInputRef.current.value;
		const selectedDifficulty = difficultyInputRef.current.value;

		//navigating programmatically to the filtered recipes page
		props.onSearch(selectedMealType, selectedDifficulty);
	}

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.controls}>
				<div className={classes.control}>
					<label htmlFor="mealType">Meal Type</label>
					<select id="mealType" ref={mealTypeInputRef}>
						<option value="all">All types</option>
						<option value="breakfast">Breakfast</option>
						<option value="lunch">Lunch</option>
						<option value="dinner">Dinner</option>
						<option value="snack">Snack</option>
					</select>
				</div>
				<div className={classes.control}>
					<label htmlFor="difficulty">Difficulty</label>
					<select id="difficulty" ref={difficultyInputRef}>
						<option value="all">All levels</option>
						<option value="beginner">Beginner</option>
						<option value="intermediate">Intermediate</option>
						<option value="advanced">Advanced</option>
					</select>
				</div>
			</div>
			<Button>Find Recipes</Button>
		</form>
	);
}

export default RecipesSearch;

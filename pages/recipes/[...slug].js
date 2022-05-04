import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getFilteredRecipes } from '../../dummy-data';
import RecipeList from '../../components/recipes/recipe-list';
import ResultsTitle from '../../components/recipes/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredRecipesPage() {
	const router = useRouter();

	const filterData = router.query.slug;

	if (!filterData) {
		return <p className="center">Loading...</p>;
	}

	const mealType = filterData[0];
	const difficulty = filterData[1];

	const validMealType = ['breakfast', 'lunch', 'dinner', 'snack'].includes(
		mealType
	);
	const validDifficulty = ['beginner', 'intermediate', 'advanced'].includes(
		difficulty
	);

	if (!validMealType || !validDifficulty) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>Invalid filter. Please adjust your values!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/recipes">Show All Recipes</Button>
				</div>
			</Fragment>
		);
	}

	const filteredRecipes = getFilteredRecipes({
		mealType: mealType,
		difficulty: difficulty,
	});

	if (!filteredRecipes || filteredRecipes.length === 0) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>No recipes found for the chosen filter!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/recipes">Show All Recipes</Button>
				</div>
			</Fragment>
		);
	}

	return (
		<Fragment>
			<ResultsTitle date={(difficulty, mealType)} />
			<RecipeList items={filteredRecipes} />
		</Fragment>
	);
}

export default FilteredRecipesPage;

import { Fragment } from 'react';
import { getFilteredRecipes } from '../../helpers/api-util';
import RecipeList from '../../components/recipes/recipe-list';
import ResultsTitle from '../../components/recipes/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredRecipesPage(props) {
	//if there is an error in the filter params, returning an error message
	if (props.hasError) {
		return (
			<Fragment>
				<ErrorAlert>
					<p></p>
				</ErrorAlert>
				<div className="center">
					<Button link="/recipes">Show All Recipes</Button>
				</div>
			</Fragment>
		);
	}

	const filteredRecipes = props.recipes;
	const mealType = props.mealType;
	const difficulty = props.difficulty;
	console.log(filteredRecipes);

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
			<ResultsTitle difficulty={difficulty} mealType={mealType} />
			<RecipeList items={filteredRecipes} />
		</Fragment>
	);
}

//server-side rendering
export async function getServerSideProps(context) {
	const { params } = context;

	const filterData = params.slug;

	const mealType = filterData[0];
	const difficulty = filterData[1];

	const validMealType = [
		'all',
		'breakfast',
		'lunch',
		'dinner',
		'snack',
		'dessert',
	].includes(mealType);
	const validDifficulty = [
		'all',
		'beginner',
		'intermediate',
		'advanced',
	].includes(difficulty);

	if (!validMealType || !validDifficulty) {
		return {
			props: {
				hasError: true,
			},
		};
	}

	const filteredRecipes = await getFilteredRecipes(mealType, difficulty);

	return {
		props: {
			recipes: filteredRecipes,
			mealType: mealType,
			difficulty: difficulty,
		},
	};
}

export default FilteredRecipesPage;

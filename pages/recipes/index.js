import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllRecipes } from '../../dummy-data';
import RecipeList from '../../components/recipes/recipe-list';
import RecipesSearch from '../../components/recipes/recipes-search';

function AllRecipesPage() {
	const router = useRouter();
	const recipes = getAllRecipes();

	function findRecipesHandler(mealType, difficulty) {
		const fullPath = `/recipes/${mealType}/${difficulty}`;

		router.push(fullPath);
	}

	return (
		<Fragment>
			<RecipesSearch onSearch={findRecipesHandler} />
			<RecipeList items={recipes} />
		</Fragment>
	);
}

export default AllRecipesPage;

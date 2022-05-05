import { Fragment } from 'react';

import { getRecipeById, getAllRecipes } from '../../helpers/api-util';
import RecipeSummary from '../../components/recipe-detail/recipe-summary';
import RecipeFeatures from '../../components/recipe-detail/recipe-features';
import RecipeContent from '../../components/recipe-detail/recipe-content';
import ErrorAlert from '../../components/ui/error-alert';

function RecipeDetailPage(props) {
	const recipe = props.selectedRecipe;

	if (!recipe) {
		return (
			<ErrorAlert>
				<p>No recipe found!</p>
			</ErrorAlert>
		);
	}

	return (
		<Fragment>
			<RecipeSummary title={recipe.title} />
			<RecipeFeatures
				mealType={recipe.mealType}
				difficulty={recipe.difficulty}
				servings={recipe.servings}
				image={recipe.image}
				imageAlt={recipe.title}
			/>
			<RecipeContent>
				<h3>Ingredients:</h3>
				<ul>
					{recipe.ingredients.map((ingredient) => (
						<li>{ingredient}</li>
					))}
				</ul>
				<h3>Preparation:</h3>
				<p>{recipe.preparation}</p>
			</RecipeContent>
		</Fragment>
	);
}

//pre-generating dynamic paths
export async function getStaticPaths() {
	const recipes = await getAllRecipes();
	const paths = recipes.map((recipe) => ({ params: { recipeId: recipe.id } }));

	return {
		paths: paths,
		fallback: false,
	};
}

//pre-generating props data
export async function getStaticProps(context) {
	const recipeId = context.params.recipeId;

	const recipe = await getRecipeById(recipeId);

	return {
		props: {
			selectedRecipe: recipe,
		},
	};
}

export default RecipeDetailPage;

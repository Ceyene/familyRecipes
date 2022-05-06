import { Fragment } from 'react';
import Head from 'next/head';

import { getRecipeById, getFeaturedRecipes } from '../../helpers/api-util';
import RecipeSummary from '../../components/recipe-detail/recipe-summary';
import RecipeFeatures from '../../components/recipe-detail/recipe-features';
import RecipeContent from '../../components/recipe-detail/recipe-content';
import Comments from '../../components/input/comments';

function RecipeDetailPage(props) {
	const recipe = props.selectedRecipe;

	if (!recipe) {
		return (
			<div className="center">
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<Fragment>
			<Head>
				<title>{recipe.title}</title>
				<meta
					name="description"
					content={`See this awesome recipe: ${recipe.title}`}
				/>
			</Head>
			<RecipeSummary title={recipe.title} />
			<RecipeFeatures
				mealType={recipe.mealType}
				difficulty={recipe.difficulty}
				servings={recipe.servings}
				image={recipe.image}
				imageAlt={recipe.title}
			/>
			<RecipeContent>
				<h3 className="sectionSubtitle">Ingredients:</h3>
				<ul>
					{recipe.ingredients.map((ingredient) => (
						<li key={ingredient}>{ingredient}</li>
					))}
				</ul>
				<h3 className="sectionSubtitle">Preparation:</h3>
				<p>{recipe.preparation}</p>
			</RecipeContent>
			<Comments recipeId={recipe.id} />
		</Fragment>
	);
}

//pre-generating dynamic paths
export async function getStaticPaths() {
	const recipes = await getFeaturedRecipes();
	const paths = recipes.map((recipe) => ({ params: { recipeId: recipe.id } }));

	return {
		paths: paths,
		fallback: true,
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
		revalidate: 30, //every 30 seconds it regenerates request
	};
}

export default RecipeDetailPage;

import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getRecipeById } from '../../dummy-data';
import RecipeSummary from '../../components/recipe-detail/recipe-summary';
import RecipeFeatures from '../../components/recipe-detail/recipe-features';
import RecipeContent from '../../components/recipe-detail/recipe-content';
import ErrorAlert from '../../components/ui/error-alert';

function RecipeDetailPage() {
	const router = useRouter();

	const recipeId = router.query.recipeId;
	const recipe = getRecipeById(recipeId);

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
				<p>{recipe.ingredients}</p>
				<p>{recipe.preparation}</p>
			</RecipeContent>
		</Fragment>
	);
}

export default RecipeDetailPage;

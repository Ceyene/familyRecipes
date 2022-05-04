import { getFeaturedRecipes } from '../dummy-data';
import RecipeList from '../components/recipes/recipe-list';

function HomePage() {
	const recipes = getFeaturedRecipes();

	return (
		<div>
			<RecipeList items={recipes} />
		</div>
	);
}

export default HomePage;

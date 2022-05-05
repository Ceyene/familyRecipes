import { getFeaturedRecipes } from '../dummy-data';
import RecipeList from '../components/recipes/recipe-list';

function HomePage() {
	const featuredRecipes = getFeaturedRecipes();

	return (
		<div>
			<RecipeList items={featuredRecipes} />
		</div>
	);
}

export default HomePage;

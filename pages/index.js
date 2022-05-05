import { getFeaturedRecipes } from '../helpers/api-util';
import RecipeList from '../components/recipes/recipe-list';

function HomePage(props) {
	return (
		<div>
			<RecipeList items={props.recipes} />
		</div>
	);
}

//adding static site generation
export async function getStaticProps() {
	const featuredRecipes = await getFeaturedRecipes();

	return {
		props: {
			recipes: featuredRecipes,
		},
	};
}

export default HomePage;

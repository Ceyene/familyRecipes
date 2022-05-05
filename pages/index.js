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
		revalidate: 1800, //every half hour it regenerates request
	};
}

export default HomePage;

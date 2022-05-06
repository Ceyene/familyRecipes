import Head from 'next/head';
import { getFeaturedRecipes } from '../helpers/api-util';
import RecipeList from '../components/recipes/recipe-list';
import NewsletterRegistration from '../components/input/newsletter-registration';

function HomePage(props) {
	return (
		<div>
			<Head>
				<title>Family Recipes - by Cyn Romero</title>
				<meta
					name="description"
					content="A list of the traditional and not so traditional recipes I know"
				/>
			</Head>
			<NewsletterRegistration />
			<h1 className="centeredTitle">Our Favorites:</h1>
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

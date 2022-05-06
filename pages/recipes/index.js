import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { getAllRecipes } from '../../helpers/api-util';
import RecipeList from '../../components/recipes/recipe-list';
import RecipesSearch from '../../components/recipes/recipes-search';

function AllRecipesPage(props) {
	const router = useRouter();
	const { recipes } = props;

	function findRecipesHandler(mealType, difficulty) {
		const fullPath = `/recipes/${mealType}/${difficulty}`;

		router.push(fullPath);
	}

	return (
		<Fragment>
			<Head>
				<title>All Recipes</title>
				<meta name="description" content="See all our available recipes" />
			</Head>
			<RecipesSearch onSearch={findRecipesHandler} />
			<RecipeList items={recipes} />
		</Fragment>
	);
}

export async function getStaticProps() {
	const recipes = await getAllRecipes();

	return {
		props: {
			recipes: recipes,
		},
		revalidate: 60, //every minute it regenerates request
	};
}

export default AllRecipesPage;

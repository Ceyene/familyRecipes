//filtering data received from firebase
export async function getAllRecipes() {
	const response = await fetch(
		'https://family-recipes-project-default-rtdb.firebaseio.com/recipes.json'
	);
	const data = await response.json();

	const recipes = [];

	//transform the object returned by firebase into an array
	for (const key in data) {
		recipes.push({
			id: key,
			...data[key],
		});
	}

	return recipes;
}

export async function getFeaturedRecipes() {
	const allRecipes = await getAllRecipes();

	return allRecipes.filter((recipe) => recipe.isFeatured);
}

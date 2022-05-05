//fetching data from firebase
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
//filtering data received from firebase
export async function getFeaturedRecipes() {
	const allRecipes = await getAllRecipes();

	return allRecipes.filter((recipe) => recipe.isFeatured);
}
//getting one recipe data by its id
export async function getRecipeById(id) {
	const allRecipes = await getAllRecipes();

	return allRecipes.find((recipe) => recipe.id === id);
}
//filtering recipes
export async function getFilteredRecipes(mealType, difficulty) {
	//getting all recipes
	const allRecipes = await getAllRecipes();
	//validating if filter is in all in both categories before filtering
	if (mealType === 'all' && difficulty === 'all') {
		return allRecipes;
	}
	//filtering recipes
	let filteredRecipes = allRecipes.filter((recipe) => {
		if (mealType !== 'all' && difficulty !== 'all') {
			return recipe.mealType === mealType && recipe.difficulty === difficulty;
		}
		return recipe.mealType === mealType || recipe.difficulty === difficulty;
	});

	return filteredRecipes;
}

const DUMMY_RECIPES = [
	{
		id: 'r1',
		title: 'Mate amargo',
		mealType: 'breakfast',
		difficulty: 'beginner',
		servings: 2,
		ingredients: ['yerba', 'hot water'],
		preparation: '...',
		image: 'images/mate.jpg',
		isFeatured: false,
	},
	{
		id: 'r2',
		title: 'Ensalada',
		mealType: 'lunch',
		difficulty: 'intermediate',
		servings: 1,
		ingredients: ['lechuga', 'tomate'],
		preparation: '...',
		image: 'images/salad.jpg',
		isFeatured: true,
	},
	{
		id: 'r3',
		title: 'Chalitas de sésamo',
		mealType: 'snack',
		difficulty: 'intermediate',
		servings: 4,
		ingredients: ['harina', 'sésamo'],
		preparation: '...',
		image: 'images/chalitas.jpg',
		isFeatured: true,
	},
];

export function getFeaturedRecipes() {
	return DUMMY_RECIPES.filter((recipe) => recipe.isFeatured);
}

export function getAllRecipes() {
	return DUMMY_RECIPES;
}

export function getFilteredRecipes(type, difficulty) {

	let filteredRecipes = DUMMY_RECIPES.filter((recipe) => {
		return (
			
		);
	});

	return filteredRecipes;
}

export function getRecipeById(id) {
	return DUMMY_RECIPES.find((recipe) => recipe.id === id);
}

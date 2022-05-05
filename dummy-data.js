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
		isFeatured: false,
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
	{
		id: 'r4',
		title: 'Guiso de arroz',
		mealType: 'dinner',
		difficulty: 'difficult',
		servings: 2,
		ingredients: ['arroz integral', 'verduras', 'curry'],
		preparation:
			'En una olla poner a dorar la cebolla picada, la zanahoria, y el pimiento rojo. Una vez dorada, agregar la carne molida hasta que cambie su color. Agregamos puré de tomate y condimentamos, cocinamos por 15 minutos. Agregamos la papa previamente hervida con el arroz (ir agregando agua hervida para que no se seque la preparación). También se puede agregar cruda antes de agregar el arroz. Cuando el arroz esté listo, servir',
		image: 'images/guiso.jpg',
		isFeatured: true,
	},
	{
		id: 'r5',
		title: 'Chocolate Bar',
		mealType: 'dessert',
		difficulty: 'beginner',
		servings: 8,
		ingredients: ['chocolate bar'],
		preparation: 'Go to the market and buy a chocolate bar.',
		image: 'images/chocolate.jpg',
		isFeatured: true,
	},
];

export function getFeaturedRecipes() {
	return DUMMY_RECIPES.filter((recipe) => recipe.isFeatured);
}

export function getAllRecipes() {
	return DUMMY_RECIPES;
}

export function getFilteredRecipes(mealType, difficulty) {
	if (mealType === 'all' && difficulty === 'all') {
		return DUMMY_RECIPES;
	}

	let filteredRecipes = DUMMY_RECIPES.filter((recipe) => {
		return recipe.mealType === mealType || recipe.difficulty === difficulty;
	});

	return filteredRecipes;
}

export function getRecipeById(id) {
	return DUMMY_RECIPES.find((recipe) => recipe.id === id);
}

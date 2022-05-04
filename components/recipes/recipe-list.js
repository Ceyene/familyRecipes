import RecipeItem from './recipe-item';
import classes from './recipe-list.module.css';

function RecipeList(props) {
	const { items } = props;

	return (
		<ul className={classes.list}>
			{items.map((recipe) => (
				<RecipeItem
					key={recipe.id}
					id={recipe.id}
					title={recipe.title}
					difficulty={recipe.difficulty}
					mealType={recipe.mealType}
					servings={recipe.servings}
					image={recipe.image}
				/>
			))}
		</ul>
	);
}

export default RecipeList;

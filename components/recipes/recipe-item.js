import Button from '../ui/button';
import DifficultyIcon from '../icons/difficulty-icon';
import MealTypeIcon from '../icons/meal-type-icon';
import UserIcon from '../icons/user-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import classes from './recipe-item.module.css';

function RecipeItem(props) {
	const { title, image, difficulty, mealType, servings, id } = props;

	const exploreLink = `/recipes/${id}`;

	return (
		<li className={classes.item}>
			<img src={'/' + image} alt={title} />
			<div className={classes.content}>
				<div className={classes.summary}>
					<h2>{title}</h2>
					<div className={classes.mealType}>
						<MealTypeIcon />
						<p>{mealType}</p>
					</div>
					<div className={classes.difficulty}>
						<DifficultyIcon />
						<p>{difficulty}</p>
					</div>
					<div className={classes.servings}>
						<UserIcon />
						<p>{servings}</p>
					</div>
				</div>
				<div className={classes.actions}>
					<Button link={exploreLink}>
						<span>See Recipe</span>
						<span className={classes.icon}>
							<ArrowRightIcon />
						</span>
					</Button>
				</div>
			</div>
		</li>
	);
}

export default RecipeItem;

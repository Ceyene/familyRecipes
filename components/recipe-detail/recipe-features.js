import Image from 'next/image';
import DifficultyIcon from '../icons/difficulty-icon';
import MealTypeIcon from '../icons/meal-type-icon';
import FeaturesItem from './features-item';
import UserIcon from '../icons/user-icon';
import classes from './recipe-features.module.css';

function RecipeFeatures(props) {
	const { difficulty, mealType, servings, image, imageAlt } = props;

	return (
		<section className={classes.features}>
			<div className={classes.image}>
				<Image src={`/${image}`} alt={imageAlt} width={500} height={500} />
			</div>
			<ul className={classes.list}>
				<FeaturesItem icon={MealTypeIcon}>
					<p>{mealType}</p>
				</FeaturesItem>
				<FeaturesItem icon={DifficultyIcon}>
					<p>{difficulty}</p>
				</FeaturesItem>
				<FeaturesItem icon={UserIcon}>
					<p>{servings}</p>
				</FeaturesItem>
			</ul>
		</section>
	);
}

export default RecipeFeatures;

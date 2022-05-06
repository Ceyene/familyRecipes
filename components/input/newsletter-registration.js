import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
	//adding ref for user input
	const emailInputRef = useRef();

	async function registrationHandler(event) {
		event.preventDefault();
		//extracting entered email from ref
		const enteredEmail = emailInputRef.current.value;

		// fetch user input (state or refs)
		const response = await fetch('/api/newsletter', {
			method: 'POST',
			body: JSON.stringify({ email: enteredEmail }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		console.log(data);
		// optional: validate input
		// send valid data to API
	}

	return (
		<section className={classes.newsletter}>
			<h2>Sign up to receive new recipes!</h2>
			<form onSubmit={registrationHandler}>
				<div className={classes.control}>
					<input
						type="email"
						id="email"
						placeholder="Your email"
						aria-label="Your email"
						ref={emailInputRef}
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	);
}

export default NewsletterRegistration;

import { useRef, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
	//adding ref for user input
	const emailInputRef = useRef();
	//getting context
	const notificationCtx = useContext(NotificationContext);

	async function registrationHandler(event) {
		event.preventDefault();
		//extracting entered email from ref
		const enteredEmail = emailInputRef.current.value;

		if (!enteredEmail) {
			return;
		}

		notificationCtx.showNotification({
			title: 'Signing up...',
			message: 'Registering for newsletter',
			status: 'pending',
		});

		try {
			// fetch user input (state or refs)
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				body: JSON.stringify({ email: enteredEmail }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();

			if (response.ok) {
				notificationCtx.showNotification({
					title: 'Success',
					message: 'Successfully registered for newsletter',
					status: 'success',
				});
			} else {
				throw new Error(data.message || 'Something went wrong...');
			}
		} catch (error) {
			notificationCtx.showNotification({
				title: 'Error',
				message: error.message || 'Something went wrong!',
				status: 'error',
			});
		}
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

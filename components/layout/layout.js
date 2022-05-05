import { Fragment } from 'react';

import MainHeader from './main-header';

function Layout(props) {
	return (
		<Fragment>
			<MainHeader />
			<main>{props.children}</main>
			<footer className="footer">
				Family Recipes © 2022 - Made with ♥ by Cynthia Romero
			</footer>
		</Fragment>
	);
}

export default Layout;

import Head from 'next/head';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Head>
				<meta charSet="utf-8" />
				<title>Family Recipes - by Cyn Romero</title>
				<meta
					name="description"
					content="A list of the traditional and not so traditional recipes I know"
				/>
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;

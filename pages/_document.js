import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
					<link
						href="https://fonts.googleapis.com/css2?family=Bitter:wght@300&family=Roboto+Slab:wght@300;400&family=Send+Flowers&display=swap"
						rel="stylesheet"
					></link>
				</Head>
				<body>
					<div id="overlays" />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
export default MyDocument;

import Layout from "../components/layout";
import { Amplify } from "aws-amplify";

import awsExports from "../src/aws-exports";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { DrinkContextProvider } from "../src/contexts/DrinkContext";
import AuthContextProvider from "../src/contexts/AuthContext";
import { CartContextProvider } from "../src/contexts/CartContext";
import { OrderContextProvider } from "../src/contexts/OrderContext";

Amplify.configure({ ...awsExports, Analytics: { disabled: true } });

function MyApp({ Component, pageProps }) {
	return (
		<AuthContextProvider>
			<DrinkContextProvider>
				<CartContextProvider>
					<OrderContextProvider>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</OrderContextProvider>
				</CartContextProvider>
			</DrinkContextProvider>
		</AuthContextProvider>
	);
}

export default MyApp;

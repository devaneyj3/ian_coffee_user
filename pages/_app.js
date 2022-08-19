import Layout from "../src/components/layout";
import { Amplify } from "aws-amplify";

import awsExports from "../src/aws-exports";

import "@aws-amplify/ui-react/styles.css";

import { Authenticator } from "@aws-amplify/ui-react";

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
			<Authenticator
				variation="modal"
				signUpAttributes={["email", "phone_number", "name"]}>
				<DrinkContextProvider>
					<CartContextProvider>
						<OrderContextProvider>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</OrderContextProvider>
					</CartContextProvider>
				</DrinkContextProvider>
			</Authenticator>
		</AuthContextProvider>
	);
}

export default MyApp;

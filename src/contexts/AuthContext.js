import { createContext, useEffect, useState, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../models";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
	const [dbUser, setDbUser] = useState(null);

	useEffect(() => {
		addAuthUserToDataStore();
	}, []);

	const addAuthUserToDataStore = async () => {
		const user = await Auth.currentAuthenticatedUser({ bypassCache: true });

		console.log(user);

		const { attributes } = user;
		const { sub, email, phone_number, name } = attributes;

		const userExists = await DataStore.query(User, (user) =>
			user.sub("eq", sub)
		);
		if (userExists.length < 1) {
			const newUser = await DataStore.save(
				new User({
					sub,
					name,
					email,
					phone: phone_number,
				})
			);
			console.log("newUser AuthContext line 32", newUser);
			setDbUser(newUser);
		} else {
			setDbUser(userExists[0]);
			console.log("userExist AuthContext line 36", userExists[0]);
		}
	};

	return (
		<AuthContext.Provider value={{ dbUser }}>{children}</AuthContext.Provider>
	);
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);

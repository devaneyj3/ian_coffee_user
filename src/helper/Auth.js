import { Auth, DataStore } from "aws-amplify";
export const signUp = async (person) => {
	let { email, password, username, phone_number } = person;
	phone_number = `+${phone_number.replace(/-/g, "")}`;

	try {
		const { user } = await Auth.signUp({
			username,
			password,
			attributes: {
				email, // optional
				phone_number, // optional - E.164 number convention
				// other custom attributes
			},
		});
		return user;
	} catch (error) {
		console.log("error signing up, cognito.js line 19:", error);
	}
};

export const confirmSignUp = async (username, code) => {
	try {
		const message = await Auth.confirmSignUp(username, code);
		return message;
	} catch (error) {
		return error;
	}
};
export const authSignOut = async () => {
	try {
		await Auth.signOut();
		setAuthUser(null);
		router.push("/");
	} catch (error) {
		console.log(error);
	}
};

export const getCurrentAuthenticatedUser = async (setState) => {
	Auth.currentAuthenticatedUser({ bypassCache: true }).then(setState);
};

import React from "react";
import classes from "./profile.module.scss";
import { useAuthContext } from "../../src/contexts/AuthContext";

import Order from "../Order";

const Profile = () => {
	const { dbUser } = useAuthContext();

	return (
		<div className={classes.profile}>
			<div className={classes.profile_container}>
				<h1>Profile</h1>
				{dbUser && (
					<>
						<p>{dbUser.username}</p>
						<p>{dbUser.email}</p>
						<p>{dbUser.phone}</p>
					</>
				)}
			</div>
			<Order />
		</div>
	);
};

export default React.memo(Profile);

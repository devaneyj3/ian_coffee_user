import React from "react";

import { Button } from "reactstrap";
import Link from "next/link";

import classes from "./nav.module.scss";

import { useRouter } from "next/router";

import { Auth } from "aws-amplify";
import { useAuthContext } from "../../../contexts/AuthContext";

export default function Nav() {
	const router = useRouter();

	const { dbUser } = useAuthContext();

	const authSignOut = async () => {
		await Auth.signOut();
	};

	return (
		<nav className={classes.nav_container}>
			<video autoPlay muted loop className={classes.video}>
				<source src="/video/making_coffee.mp4" type="video/mp4" />
			</video>
			<ul className={classes.nav}>
				<Link href="/">Home</Link>
				<Link href="/menu">Menu</Link>
				<Link href="/profile">Profile</Link>
				<Link href="/cart">Cart</Link>
				<Button color="danger" onClick={() => authSignOut()}>
					Signout
				</Button>
			</ul>
			<section className={classes.info}>
				<h1 className={classes.greeting}>Welcome to Ian &#39;s Coffee</h1>
			</section>
		</nav>
	);
}

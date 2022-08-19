import React from "react";

import Link from "next/link";

import classes from "./nav.module.scss";

import { useRouter } from "next/router";

import { useAuthContext } from "../../../src/contexts/AuthContext";

export default function Nav() {
	const router = useRouter();

	const { authSignOut, dbUser } = useAuthContext();

	//sign customer out
	const signOut = async () => {
		await authSignOut();
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
			</ul>
			<section className={classes.info}>
				<h1 className={classes.greeting}>Welcome to Ian's Coffee</h1>
			</section>
		</nav>
	);
}

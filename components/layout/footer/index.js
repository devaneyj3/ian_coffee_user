import React from "react";

import classes from "./footer.module.scss";

import Link from "next/link";

import { useAuthContext } from "../../../src/contexts/AuthContext";

export default function Footer() {
	const { authUser } = useAuthContext();
	return (
		<div className={classes.footer}>
			<span>@2022 The Web Accelerator</span>
		</div>
	);
}

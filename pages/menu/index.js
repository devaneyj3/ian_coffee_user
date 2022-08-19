import React from "react";
import Featured from "../../src/components/featured";
import PageLayout from "../../src/components/layout/page_layout";

import classes from "./menu.module.scss";

export default function Menu() {
	return (
		<PageLayout>
			<section className={classes.menu}>
				<Featured />
			</section>
		</PageLayout>
	);
}

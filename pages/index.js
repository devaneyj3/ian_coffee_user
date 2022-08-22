import Head from "next/head";
import Image from "next/image";
import Featured from "../src/components/featured";
import PageLayout from "../src/components/layout/page_layout";
import Reviews from "../src/components/reviews";
import classes from "../styles/home.module.scss";

import Link from "next/link";
import { Button } from "reactstrap";

import { useAuthContext } from "../src/contexts/AuthContext";

export default function Home() {
	const { dbUser } = useAuthContext();
	return (
		<PageLayout>
			<section className={classes.featured}>
				<h3>Featured Products</h3>
				<section className="products">
					<Featured />
				</section>
				<Link href="/menu">
					<Button className={classes.btn} color="primary">
						View All
					</Button>
				</Link>
			</section>
			<section className={classes.reviews}>
				<h3>Reviews</h3>
				<Reviews />
			</section>
		</PageLayout>
	);
}

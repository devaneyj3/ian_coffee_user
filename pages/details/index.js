import React, { useEffect } from "react";

import { useOrderContext } from "../../src/contexts/OrderContext";

import { useRouter } from "next/router";

import CartItem from "../../components/CartItem/CartItem";

import { Button } from "reactstrap";

import classes from "./details.module.scss";

export default function Details() {
	const { fetchOrders } = useOrderContext();
	const router = useRouter();
	const { id, createdAt } = router?.query;
	const [orderDetails, setOrderDetails] = React.useState(null);

	useEffect(() => {
		fetchOrders(id).then(setOrderDetails);
	}, [id]);

	return (
		<div className={classes.detail_container}>
			<h4>Here are your order details from {createdAt}</h4>
			<hr />
			<section className={classes.order_list}>
				{orderDetails ? (
					orderDetails.cart.map((item) => {
						return <CartItem product={item.Drink} key={id} />;
					})
				) : (
					<div>Loading...</div>
				)}
			</section>
			<Button color="primary">Reorder</Button>
		</div>
	);
}

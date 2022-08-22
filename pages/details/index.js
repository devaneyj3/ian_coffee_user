import React, { useEffect } from "react";

import { useOrderContext } from "../../src/contexts/OrderContext";
import { useRouter } from "next/router";

import CartItem from "../../src/components/CartItem/CartItem";

import { useDrinkContext } from "../../src/contexts/DrinkContext";

import { Button } from "reactstrap";

import classes from "./details.module.scss";

export default function Details() {
	const { fetchOrders } = useOrderContext();
	const { getDrinkInfo } = useDrinkContext();
	const router = useRouter();
	const { id, createdAt } = router?.query;
	const [orderDetails, setOrderDetails] = React.useState(null);

	useEffect(() => {
		const getOrderDetails = async () => {
			const order = await fetchOrders(id);
			setOrderDetails(order);
		};
		getOrderDetails();
	}, []);
	console.log(orderDetails);
	return (
		<div className={classes.detail_container}>
			<h4>Here are your order details from {createdAt}</h4>
			<hr />
			<section className={classes.order_list}>
				{orderDetails ? (
					orderDetails.cart.map((item) => {
						return <CartItem product={item} key={id} />;
					})
				) : (
					<div>Loading...</div>
				)}
			</section>
			<Button color="primary">Reorder</Button>
		</div>
	);
}

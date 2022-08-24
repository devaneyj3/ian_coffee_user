import React, { useState, useEffect } from "react";

import { useOrderContext } from "../../contexts/OrderContext";

import CartItem from "../CartItem/CartItem";

import classes from "./details.module.scss";

export default function OrderDetails({ id }) {
	const { fetchOrders } = useOrderContext();

	const [orderDetails, setOrderDetails] = useState(null);

	useEffect(() => {
		const getOrderDetails = async () => {
			const order = await fetchOrders(id);
			setOrderDetails(order);
		};
		getOrderDetails();
	}, []);
	return (
		<div className={classes.detail_container}>
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
		</div>
	);
}

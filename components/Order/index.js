import React from "react";

import moment from "moment";
import { useOrderContext } from "../../src/contexts/OrderContext";

import classes from "./order.module.scss";
import { useRouter } from "next/router";

export default function Order() {
	const { orders, fetchOrders } = useOrderContext();
	const router = useRouter();

	return (
		<section className={classes.order_container}>
			<h4>Order History</h4>
			<p>{orders.length} total orders.</p>
			{orders.length > 0 &&
				orders.map((order) => {
					const createdAt = moment(order.createdAt).format("MMM Do YYYY");
					return (
						<div
							className={classes.order}
							key={order.id}
							onClick={() =>
								router.push(
									{
										pathname: "/details",
										query: { id: order.id, createdAt: createdAt },
									},
									`/details`
								)
							}>
							<p>{createdAt}</p>
							<p>&#8226;</p>
							<p>{order.status}</p>
							<p>&#8226;</p>
							<p>${order.total}</p>
						</div>
					);
				})}
		</section>
	);
}

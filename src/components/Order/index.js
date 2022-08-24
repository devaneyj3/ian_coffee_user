import React, { useEffect } from "react";

import moment from "moment";
import { useOrderContext } from "../../contexts/OrderContext";

import classes from "./order.module.scss";
import { useRouter } from "next/router";
import OrderDetails from "../OrderDetails";

export default function Order() {
	const { orders } = useOrderContext();

	return (
		<section className={classes.orders_container}>
			<h4>Order History</h4>
			<p>{orders.length} total orders.</p>
			{orders.length > 0 &&
				orders.map((order) => {
					const createdAt = moment(order.createdAt).format("MMM Do YYYY");
					return (
						<div key={order.id} className={classes.order_container}>
							<div className={classes.info}>
								<p>{createdAt}</p>
								<p>&#8226;</p>
								<p>{order.status}</p>
								<p>&#8226;</p>
								<p>${order.total.toFixed(2)}</p>
							</div>
							<section className={classes.details}>
								<OrderDetails id={order.id} />
							</section>
						</div>
					);
				})}
		</section>
	);
}

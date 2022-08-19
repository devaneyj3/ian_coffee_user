import React from "react";

import classes from "./CartItem.module.scss";

export default function CartItem({ product }) {
	const {
		Drink: { name, price },
		quantity,
	} = product;

	let quantityNum = ~~quantity;
	quantityNum = quantityNum.toFixed(2);

	return (
		<div>
			<div className={classes.product}>
				<p>{quantity}</p>
				<p>{name}</p>
				<p>${price}</p>
			</div>
		</div>
	);
}

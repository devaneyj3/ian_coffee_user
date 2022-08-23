import React, { useState, useEffect } from "react";

import classes from "./CartItem.module.scss";

import { useDrinkContext } from "../../contexts/DrinkContext";

export default function CartItem({ product }) {
	const { getDrinkInfo } = useDrinkContext();
	const [drink, setDrink] = useState("");

	useEffect(() => {
		const getDrink = async () => {
			const drink = await getDrinkInfo(product.drinkID);
			setDrink(drink);
		};
		getDrink();
	}, []);
	return (
		<div>
			{product && drink ? (
				<div className={classes.product}>
					<p>{product.quantity}</p>
					<p>{drink.name}</p>
					<p>${product.totalDrinkPrice.toFixed(2)}</p>
				</div>
			) : null}
		</div>
	);
}

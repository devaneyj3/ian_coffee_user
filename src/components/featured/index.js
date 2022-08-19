import React, { useState } from "react";
import classes from "./featured.module.scss";
import { useDrinkContext } from "../../contexts/DrinkContext";

import {
	CardImg,
	Card,
	CardBody,
	CardTitle,
	CardText,
	Button,
	Alert,
} from "reactstrap";

import Link from "next/link";

import { useAuthContext } from "../../contexts/AuthContext";

import { useCartContext } from "../../contexts/CartContext";

import Quantity from "../Quantity";

export default function Featured() {
	const [quantity, setQuantity] = useState(1);
	const [message, setMessage] = useState(null);
	const { drinks } = useDrinkContext();

	const { dbUser } = useAuthContext();

	const { addToCart, userCart } = useCartContext();

	const addItem = async (drink) => {
		setMessage(`Added ${quantity} ${drink.name} to cart`);
		addToCart(userCart.id, drink, parseInt(quantity));
	};
	return (
		<>
			<p>There are {drinks.length} drinks.</p>
			{message ? <Alert color="success">{message}</Alert> : null}
			<div className={classes.featured}>
				{drinks.map((drink) => {
					const { id, name, price, image, description } = drink;
					return (
						<Card className={classes.card} key={id}>
							<CardImg alt={name} src={image} top width="100%" />
							<CardBody>
								<section className={classes.icon}></section>
								<CardTitle tag="h5">{name}</CardTitle>
								<CardText>{description}</CardText>
								<Quantity setQuantity={setQuantity} />
								<p>${price}</p>

								<Button onClick={() => addItem(drink)}>Add to Cart</Button>
							</CardBody>
						</Card>
					);
				})}
			</div>
		</>
	);
}

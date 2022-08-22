import React, { useEffect } from "react";

import { useCartContext } from "../../src/contexts/CartContext";

import { Alert, Button } from "reactstrap";
import CartItem from "../../src/components/CartItem/CartItem";
import classes from "./cart.module.scss";
import { useOrderContext } from "../../src/contexts/OrderContext";

export default function Cart() {
	const { userCart, userCartItems, cartSubtotal } = useCartContext();
	const { addCartToOrder } = useOrderContext();
	const [message, setMessage] = React.useState(null);

	const onOrder = async () => {
		await addCartToOrder(userCart);
		setMessage(`Order placed successfully`);
	};

	return (
		<div className={classes.cartContainer}>
			<section className={classes.summary}>
				<section className={classes.total}>
					<p>${cartSubtotal}</p>
					<Button color="danger">Delete Cart</Button>
				</section>
				<section className={classes.length}>
					<p>&#8226; {userCartItems.length} Items</p>
					{message ? <Alert>{message}</Alert> : null}
				</section>
			</section>
			<hr />
			{userCartItems.length > 0 ? (
				userCartItems.map((product) => {
					return <CartItem key={product.id} product={product} />;
				})
			) : (
				<p>No items in cart</p>
			)}
			<hr />
			<Button color="primary" onClick={() => onOrder()}>
				Order
			</Button>
		</div>
	);
}

import React from "react";
import { Container, Button, Grid, Typography } from "@material-ui/core";
import useStyles from "./styles";
import CartItem from "./cartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({ cart, updateCart, removeCart, emptyCart }) => {
	const classes = useStyles();

	const Empty = () => (
		<Typography variant="subtitle1">
			Your cart is empty start add to cart.<Link to="/">Add some! </Link>
		</Typography>
	);

	const Filled = () => (
		<>
			<Grid container spacing={3}>
				{cart.line_items.map((item) => (
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<CartItem
							item={item}
							updateCart={updateCart}
							removeCart={removeCart}
						/>
					</Grid>
				))}
			</Grid>
			<div className={classes.cardDetails}>
				<Typography variant="h4">
					Subtotal : {cart.subtotal.formatted_with_symbol}{" "}
				</Typography>
				<div>
					<Button
						size="large"
						variant="contained"
						color="secondary"
						type="button"
						className={classes.emptyButton}
						onClick={() => emptyCart()}
					>
						Empty cart
					</Button>
					<Button
						component={Link}
						to="/checkout"
						size="large"
						variant="contained"
						color="primary"
						type="button"
						className={classes.checkoutButton}
					>
						Checkout
					</Button>
				</div>
			</div>
		</>
	);

	if (!cart.line_items) return "loading...";

	return (
		<Container>
			<div className={classes.toolbar} />
			<Typography className={classes.title} variant="h3" gutterBottom>
				Your shopping cart
			</Typography>
			{cart.line_items ? <Filled /> : <Empty />}
		</Container>
	);
};

export default Cart;

import React from "react";
import {
	Typography,
	Button,
	Card,
	CardMedia,
	CardActions,
	CardContent,
} from "@material-ui/core";
import useStyles from "./styles";

const CartItem = ({ item, removeCart, updateCart }) => {
	const classes = useStyles();
	return (
		<Card>
			<CardMedia
				image={item.image.url}
				alt={item.name}
				className={classes.media}
			/>
			<CardContent className={classes.cardContent}>
				<Typography variant="h4">{item.name} </Typography>
				<Typography variant="h5">
					{item.line_total.formatted_with_symbol}{" "}
				</Typography>
			</CardContent>
			<CardActions className={classes.cartActions}>
				<div className={classes.buttons}>
					<Button
						size="small"
						type="button"
						onClick={() => updateCart(item.id, item.quantity - 1)}
					>
						-
					</Button>
					<Typography>{item.quantity} </Typography>
					<Button
						size="small"
						type="button"
						onClick={() => updateCart(item.id, item.quantity + 1)}
					>
						+
					</Button>
				</div>
				<Button
					variant="contained"
					type="button"
					color="secondary"
					onClick={() => removeCart(item.id)}
				>
					Remove
				</Button>
			</CardActions>
		</Card>
	);
};

export default CartItem;

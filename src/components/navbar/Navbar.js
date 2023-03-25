import React from "react";
import {
	AppBar,
	Toolbar,
	Badge,
	Menu,
	MenuItem,
	IconButton,
	Typography,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";
import logo from "../../assets/logo.jpg";

const Navbar = ({ cart }) => {
	const location = useLocation();
	const classes = useStyles();
	return (
		<>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar>
					<Typography
						variant="h6"
						className={classes.nav}
						component={Link}
						to="/"
					>
						<img src={logo} alt="logo" height={25} className={classes.image} />
						ShoeMine
					</Typography>
					<div className={classes.grow} />
					{location.pathname === "/" && (
						<div className={classes.button}>
							<IconButton
								component={Link}
								to="/cart"
								aria-label="show cart items"
								color="inherit"
							>
								<Badge badgeContent={cart.total_items} color="secondary">
									<ShoppingCart />
								</Badge>
							</IconButton>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;

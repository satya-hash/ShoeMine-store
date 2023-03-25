import React, { useEffect } from "react";
import {
	Paper,
	Stepper,
	StepLabel,
	Step,
	Typography,
	CircularProgress,
	Divider,
	Button,
} from "@material-ui/core";
import useStyles from "./styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import Address from "../Address";
import Payment from "../Payment";
import { commerce } from "../../../lib/commerce";

const steps = ["Shipping Address", "Payment Details"];

const Checout = ({ cart, order, handleCaptureCheckout, error }) => {
	const classes = useStyles();
	let [token, setToken] = useState(null);
	let [shippingData, setShippingData] = useState({});
	let [isFinished, setIsFinished] = useState(false);
	let [activeStep, setActiveStep] = useState(0);

	useEffect(() => {
		let generateToken = async () => {
			try {
				let token = await commerce.checkout.generateToken(cart.id, {
					type: "cart",
				});
				setToken(token);
			} catch (error) {}
		};
		generateToken();
	}, [cart]);

	let nextStep = () => {
		setActiveStep((prev) => prev + 1);
	};

	let backStep = () => {
		setActiveStep((prev) => prev - 1);
	};

	let next = (data) => {
		setShippingData(data);
		nextStep();
	};

	let timeout = () => {
		setTimeout(() => {
			setIsFinished(true);
		}, 4000);
	};
	const Confirmation = () =>
		order.customer ? (
			<>
				<div>
					<Typography variant="h5">
						Thank you for your purchase, {order.customer.firstname}{" "}
						{order.customer.lastname}!
					</Typography>
					<Divider className={classes.divider} />
					<Typography variant="subtitle2">
						Order ref: {order.customer_reference}
					</Typography>
				</div>
				<br />
				<Button component={Link} variant="outlined" type="button" to="/">
					Back to home
				</Button>
			</>
		) : isFinished ? (
			<>
				<div>
					<Typography variant="h5">Thank you for your purchase</Typography>
					<Divider className={classes.divider} />
				</div>
				<br />
				<Button component={Link} variant="outlined" type="button" to="/">
					Back to home
				</Button>
			</>
		) : (
			<div className={classes.spinner}>
				<CircularProgress />
			</div>
		);

	const Form = () =>
		activeStep === 0 ? (
			<Address token={token} next={next} />
		) : (
			<Payment
				shippingData={shippingData}
				token={token}
				backStep={backStep}
				handleCaptureCheckout={handleCaptureCheckout}
				nextStep={nextStep}
				timeout={timeout}
			/>
		);

	return (
		<>
			<div className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography variant="h4" align="center">
						Checkout
					</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map((step) => (
							<Step key={step}>
								<StepLabel>{step}</StepLabel>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length ? <Confirmation /> : token && <Form />}
				</Paper>
			</main>
		</>
	);
};

export default Checout;

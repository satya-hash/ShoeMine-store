import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
	Elements,
	ElementsConsumer,
	CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";

let stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = ({
	token,
	backStep,
	shippingData,
	handleCaptureCheckout,
	nextStep,
	timeout,
}) => {
	let handleSubmit = async (event, elements, stripe) => {
		event.preventDefault();

		if (!stripe || !elements) return;

		let cardElement = elements.getElement(CardElement);

		let { err, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: cardElement,
		});

		if (err) {
			console.log(err);
		} else {
			let orderData = {
				line_items: token.line_items,
				customer: {
					firstname: shippingData.firstname,
					lastname: shippingData.lastname,
					email: shippingData.email,
				},
				shipping: {
					name: "primary",
					street: shippingData.address,
					town_city: shippingData.city,
					county_state: shippingData.subDivision,
					zip_code: shippingData.pincode,
					country: shippingData.Country,
				},
				fulfillment: {
					shipping_method: shippingData.shipOption,
				},
				payment: {
					gateway: "stripe",
					stripe: {
						payment_method_id: paymentMethod.id,
					},
				},
			};
			handleCaptureCheckout(token.id, orderData);
			timeout();
			nextStep();
		}
	};
	return (
		<>
			<Review token={token} />
			<Divider />
			<Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
				Payment Method
			</Typography>
			<Elements stripe={stripePromise}>
				<ElementsConsumer>
					{({ elements, stripe }) => (
						<form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
							<CardElement />
							<br /> <br />
							<div style={{ display: "flex", justifyContent: "space-between" }}>
								<Button variant="outlined" onClick={backStep}>
									Back
								</Button>
								<Button
									variant="contained"
									type="submit"
									disabled={!stripe}
									color="primary"
								>
									Pay {token.subtotal.formatted_with_symbol}
								</Button>
							</div>
						</form>
					)}
				</ElementsConsumer>
			</Elements>
		</>
	);
};

export default Payment;

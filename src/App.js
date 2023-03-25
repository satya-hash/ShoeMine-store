import React from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products/Products";
import Checkout from "./components/checkoutForm/chekout/Checkout";
import { useState, useEffect } from "react";
import Cart from "./components/cart/Cart";

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	let [order, setOrder] = useState({});
	let [err, setErr] = useState("");

	const fetchProducts = async () => {
		let { data } = await commerce.products.list();
		setProducts(data);
	};

	const fetchCart = async () => {
		let data = await commerce.cart.retrieve();
		setCart(data);
	};

	const addToCart = async (productId, quantity) => {
		let data = await commerce.cart.add(productId, quantity);
		setCart(data);
	};

	const updateCart = async (productId, quantity) => {
		let data = await commerce.cart.update(productId, { quantity });

		setCart(data);
	};

	const removeCart = async (productId) => {
		let data = await commerce.cart.remove(productId);
		setCart(data);
	};

	const emptyCart = async () => {
		let data = await commerce.cart.empty();
		setCart(data);
	};

	let refreshCart = async () => {
		let newCart = await commerce.cart.refresh();
		console.log("refresh");
		setCart(newCart);
	};

	let handleCaptureCheckout = async (tokenId, newOrder) => {
		try {
			let incomeOrder = await commerce.checkout.capture(tokenId, newOrder);
			setOrder(incomeOrder);
			console.log("before rf");
			refreshCart();
			console.log("after rf");
		} catch (error) {
			setErr(error.data.error.message);
		}
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);
	return (
		<Router>
			<div className="App">
				<Navbar cart={cart} />
				<Routes>
					<Route
						path="/"
						element={<Products products={products} addToCart={addToCart} />}
					/>
					<Route
						path="/cart"
						element={
							<Cart
								cart={cart}
								updateCart={updateCart}
								removeCart={removeCart}
								emptyCart={emptyCart}
							/>
						}
					/>
					<Route
						path="/checkout"
						element={
							<Checkout
								cart={cart}
								order={order}
								handleCaptureCheckout={handleCaptureCheckout}
								error={err}
							/>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;

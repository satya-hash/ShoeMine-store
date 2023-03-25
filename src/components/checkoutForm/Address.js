import React, { useEffect, useState } from "react";
import {
	Typography,
	Button,
	Select,
	Grid,
	MenuItem,
	InputLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { commerce } from "../../lib/commerce";

const Address = ({ token, next }) => {
	let [Countries, setCountries] = useState([]);
	let [Country, setCountry] = useState("");
	let [subDivisions, setsubDivisions] = useState([]);
	let [subDivision, setsubDivision] = useState("");
	let [shipOptions, setshipOptions] = useState([]);
	let [shipOption, setshipOption] = useState("");
	let methods = useForm();

	let countries = Object.entries(Countries).map(([code, name]) => ({
		id: code,
		name: name,
	}));

	let subdivisions = Object.entries(subDivisions).map(([code, name]) => ({
		id: code,
		name: name,
	}));

	let options = shipOptions.map((op) => ({
		id: op.id,
		name: `${op.description}-(${op.price.formatted_with_symbol})`,
	}));

	let fetchCountries = async (tokenId) => {
		let { countries } = await commerce.services.localeListShippingCountries(
			tokenId
		);
		setCountries(countries);
		setCountry(Object.keys(Countries)[0]);
	};

	let fetchSubDivisions = async (countryCode) => {
		let { subdivisions } = await commerce.services.localeListSubdivisions(
			countryCode
		);
		setsubDivisions(subdivisions);
		setsubDivision(Object.keys(subDivisions)[0]);
	};

	let fetchShippingOptions = async (tokenId, country, region = null) => {
		let options = await commerce.checkout.getShippingOptions(tokenId, {
			country,
			region,
		});
		setshipOptions(options);
		setshipOption(options[0].id);
	};

	useEffect(() => {
		fetchCountries(token.id);
	}, []);

	useEffect(() => {
		if (Country) fetchSubDivisions(Country);
	}, [Country]);

	useEffect(() => {
		if (subDivision) fetchShippingOptions(token.id, Country, subDivision);
	}, [subDivision]);
	return (
		<>
			<Typography variant="h6" gutterBottom>
				Shipping Address
			</Typography>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit((data) =>
						next({ ...data, Country, subDivision, shipOption })
					)}
				>
					<Grid container spacing={3}>
						<FormInput required name="firstname" label="First Name" />
						<FormInput required name="lastname" label="Last Name" />
						<FormInput required name="address" label="Address" />
						<FormInput required name="email" label="Email" />
						<FormInput required name="city" label="City" />
						<FormInput required name="pincode" label="ZIP / Pincode" />
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select
								value={Country}
								fullWidth
								onChange={(e) => setCountry(e.target.value)}
							>
								{countries.map((country) => (
									<MenuItem key={country.id} value={country.id}>
										{country.name}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Subdivision</InputLabel>
							<Select
								value={subDivision}
								fullWidth
								onChange={(e) => setsubDivision(e.target.value)}
							>
								{subdivisions.map((subdivision) => (
									<MenuItem key={subdivision.id} value={subdivision.id}>
										{subdivision.name}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select
								value={shipOption}
								fullWidth
								onChange={(e) => setshipOption(e.target.value)}
							>
								{options.map((op) => (
									<MenuItem key={op.id} value={op.id}>
										{op.name}
									</MenuItem>
								))}
							</Select>
						</Grid>
					</Grid>
					<br />
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Button variant="outlined" component={Link} to="/cart">
							Back to Cart
						</Button>
						<Button variant="contained" type="submit" color="primary">
							Next
						</Button>
					</div>
				</form>
			</FormProvider>
		</>
	);
};

export default Address;

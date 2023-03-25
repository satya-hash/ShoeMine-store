import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const Review = ({ token }) => {
	return (
		<>
			<Typography variant="h6" gutterBottom>
				Order Summary
			</Typography>
			<List disablePadding>
				{token.line_items.map((product) => (
					<ListItem key={product.name} style={{ padding: "10px 0" }}>
						<ListItemText
							style={{ fontWeight: 600 }}
							primary={product.name}
							secondary={`Quantity:${product.quantity}`}
						/>
						<Typography variant="body1">
							{" "}
							{product.line_total.formatted_with_symbol}{" "}
						</Typography>
					</ListItem>
				))}
				<ListItem style={{ padding: "10px 0" }}>
					<ListItemText style={{ fontWeight: 600 }} primary="Total" />
					<Typography variant="subtitle1" style={{ fontWeight: 700 }}>
						{token.subtotal.formatted_with_symbol}
					</Typography>
				</ListItem>
			</List>
		</>
	);
};

export default Review;

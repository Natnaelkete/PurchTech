export function updateCart(state) {
  // Calculate items price
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // Calculate shipping price (if order is over $100 free, else $10 shipping)
  const shippingPrice = itemsPrice > 100 ? 0 : 10;

  // Calculate tax price
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));

  // Calculate total price
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  // Update state with calculated values
  state.itemsPrice = itemsPrice;
  state.shippingPrice = shippingPrice;
  state.taxPrice = taxPrice;
  state.totalPrice = totalPrice;

  localStorage.setItem("carts", JSON.stringify(state));

  return state;
}

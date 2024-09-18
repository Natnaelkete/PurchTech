import axios from "axios";

export async function getProduct(pageNum, search = "") {
  const { data } = await axios.get(
    `/api/products?pageNumber=${pageNum}&search=${search}`
  );
  return data;
}

export async function getAllProduct() {
  const res = await axios.get(`/api/products`);

  return res.data;
}

export async function getTop() {
  const res = await axios.get(`/api/products/top`);

  return res.data;
}

export async function getProductById(id) {
  const res = await axios.get(`/api/products/${id}`);

  return res.data;
}

export async function createProduct() {
  const res = await axios.post(`/api/products`, {});
  return res.data;
}
export async function updateProduct(
  id,
  name,
  price,
  description,
  image,
  brand,
  category,
  countInStock
) {
  const res = await axios.put(`/api/products`, {
    id,
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  });
  return res.data;
}

export async function deleteProduct(id) {
  const res = await axios.delete(`/api/products/${id}`);
  return res.data;
}

export async function registerUser({ name, email, password }) {
  const res = await axios.post(`/api/users`, {
    name,
    email,
    password,
  });
  return res.data;
}

export async function createAuth(email, password) {
  const res = await axios.post(`/api/users/auth`, {
    email,
    password,
  });
  return res.data;
}

export async function getUsers() {
  try {
    const res = await axios.get(`/api/users/auth`);

    return res.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw Error("Failed to fetch User");
  }
}
export async function getAdminUsers(pageNum) {
  const res = await axios.get(`/api/users?pageNumber=${pageNum}`);

  return res.data;
}

export async function getAdminUserById(id) {
  const res = await axios.get(`/api/users/${id}`);

  return res.data;
}

export async function deleteUser(id) {
  const res = await axios.delete(`/api/users/${id}`);

  return res.data;
}

export async function updateAdminUser(id, name, email, isAdmin) {
  const res = await axios.put(`/api/users/`, { id, name, email, isAdmin });

  return res.data;
}

export async function getUsersById(id) {
  try {
    const res = await axios.get(`/api/users/${id}`);

    return res.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw Error("Failed to fetch users");
  }
}

export async function getOrders(id) {
  try {
    const res = await axios.get(`/api/orders/${id}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function logoutUser(email, password) {
  const res = await axios.post(`/api/users/logout`, {
    email,
    password,
  });
  res.data;
}

export async function createOrders(
  user,
  orderItems,
  shippingAddress,
  paymentMethod,
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice
) {
  const res = await axios.post(`/api/orders`, {
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  return res.data;
}

export async function updateUser(name, email, password) {
  const res = await axios.put(`/api/users/profile`, {
    name,
    email,
    password,
  });
  return res.data;
}

export async function myOrder() {
  try {
    const res = await axios.get(`/api/orders/mine`);
    return res.data;
  } catch (error) {
    throw Error("Failed to fetch order");
  }
}

export async function getAllOrders(pageNum) {
  try {
    const res = await axios.get(`/api/orders?pageNumber=${pageNum}`);

    return res.data;
  } catch (error) {
    throw Error("Failed to get orders");
  }
}

export async function updateDeliver(id) {
  const res = await axios.put(
    `/api/orders/${id}/deliver`,
    {} // Empty data object if no data is being sent
  );

  return res.data;
}

export async function updatePay(id) {
  const res = await axios.put(
    `/api/orders/${id}/pay`,
    {} // Empty data object if no data is being sent
  );

  return res.data;
}

export async function uploadImage(formDatas) {
  try {
    const res = await axios.post(`/api/upload`, formDatas, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function createReview(id, rating, comment) {
  const res = await axios.post(`/api/products/${id}/review`, {
    rating,
    comment,
  });

  return res.data;
}

export async function acceptPayment(
  amount,
  currency,
  email,
  first_name,
  last_name,
  phone_number,
  tx_ref
) {
  try {
    const response = await axios.post(`/api/acceptPayment`, {
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to pay");
  }
}

export async function verifyPayment(
  amount,
  currency,
  email,
  first_name,
  last_name,
  phone_number,
  tx_ref
) {
  try {
    const response = await axios.post(`/api/acceptPayment/webhook`, {
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to verify");
  }
}

export async function PayWithStripe(products) {
  const res = await axios.post(`/api/payments/create-checkout-session`, {
    products,
  });

  return res.data;
}

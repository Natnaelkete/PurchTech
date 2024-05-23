import axios from "axios";

const endpoint = "https://purchtech.onrender.com/api";

const cookies = document.cookie.split(";");
const userToken = cookies
  .find((cookie) => cookie.trim().startsWith("token="))
  ?.split("=")[1];

export async function getProduct(pageNum, search = "") {
  const { data } = await axios.get(
    `${endpoint}/products?pageNumber=${pageNum}&search=${search}`
  );
  return data;
}

export async function getAllProduct() {
  const res = await axios.get(`${endpoint}/products`);

  return res.data;
}

export async function getTop() {
  const res = await axios.get(`${endpoint}/products/top`);

  return res.data;
}

export async function getProductById(id) {
  const res = await axios.get(`${endpoint}/products/${id}`);

  return res.data;
}

export async function createProduct() {
  const res = await axios.post(
    `${endpoint}/products`,
    {},
    {
      headers: {
        Authorization: `Bearer ${userToken}`, // Add Authorization header with token
        "Content-Type": "application/json", // Specify content type if needed
      },
    }
  );
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
  const res = await axios.put(
    `${endpoint}/products`,
    {
      id,
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`, // Add Authorization header with token
        "Content-Type": "application/json", // Specify content type if needed
      },
    }
  );
  return res.data;
}

export async function deleteProduct(id) {
  const res = await axios.delete(`${endpoint}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`, // Add Authorization header with token
      "Content-Type": "application/json", // Specify content type if needed
    },
  });
  return res.data;
}

export async function registerUser({ name, email, password }) {
  const res = await axios.post(`${endpoint}/users`, {
    name,
    email,
    password,
  });
  return res.data;
}

export async function createAuth(email, password) {
  const res = await axios.post(`${endpoint}/users/auth`, {
    email,
    password,
  });
  return res.data;
}

export async function getUsers() {
  try {
    const res = await axios.get(`${endpoint}/users/auth`);

    return res.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw Error("Failed to fetch User");
  }
}
export async function getAdminUsers(pageNum) {
  const res = await axios.get(`${endpoint}/users?pageNumber=${pageNum}`, {
    headers: {
      Authorization: `Bearer ${userToken}`, // Add Authorization header with token
      "Content-Type": "application/json", // Specify content type if needed
    },
  });

  return res.data;
}

export async function getAdminUserById(id) {
  const res = await axios.get(`${endpoint}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`, // Add Authorization header with token
      "Content-Type": "application/json", // Specify content type if needed
    },
  });

  return res.data;
}

export async function deleteUser(id) {
  const res = await axios.delete(`${endpoint}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`, // Add Authorization header with token
      "Content-Type": "application/json", // Specify content type if needed
    },
  });

  return res.data;
}

export async function updateAdminUser(id, name, email, isAdmin) {
  const res = await axios.put(
    `${endpoint}/users/`,
    { id, name, email, isAdmin },
    {
      headers: {
        Authorization: `Bearer ${userToken}`, // Add Authorization header with token
        "Content-Type": "application/json", // Specify content type if needed
      },
    }
  );

  return res.data;
}

export async function getUsersById(id) {
  try {
    const res = await axios.get(`${endpoint}/users/${id}`);

    return res.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw Error("Failed to fetch users");
  }
}

export async function getOrders(id) {
  try {
    const res = await axios.get(`${endpoint}/orders/${id}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function logoutUser(email, password) {
  const res = await axios.post(`${endpoint}/users/logout`, {
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
  const res = await axios.post(`${endpoint}/orders`, {
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
  const res = await axios.put(
    `${endpoint}/users/profile`,
    {
      name,
      email,
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`, // Add Authorization header with token
        "Content-Type": "application/json", // Specify content type if needed
      },
    }
  );
  return res.data;
}

export async function myOrder() {
  try {
    const res = await axios.get(`${endpoint}/orders/mine`, {
      headers: {
        Authorization: `Bearer ${userToken}`, // Add Authorization header with token
        "Content-Type": "application/json", // Specify content type if needed
      },
    });
    return res.data;
  } catch (error) {
    throw Error("Failed to fetch order");
  }
}

export async function getAllOrders(pageNum) {
  try {
    const res = await axios.get(`${endpoint}/orders?pageNumber=${pageNum}`, {
      headers: {
        Authorization: `Bearer ${userToken}`, // Add Authorization header with token
        "Content-Type": "application/json", // Specify content type if needed
      },
    });

    return res.data;
  } catch (error) {
    throw Error("Failed to get orders");
  }
}

export async function updateDeliver(id) {
  const res = await axios.put(
    `${endpoint}/orders/${id}/deliver`,
    {}, // Empty data object if no data is being sent
    {
      headers: {
        Authorization: `Bearer ${userToken}`, // Add Authorization header with token
        "Content-Type": "application/json", // Specify content type if needed
      },
    }
  );

  return res.data;
}

export async function updatePay(id) {
  const res = await axios.put(
    `${endpoint}/orders/${id}/pay`,
    {}, // Empty data object if no data is being sent
    {
      headers: {
        Authorization: `Bearer ${userToken}`, // Add Authorization header with token
        "Content-Type": "application/json", // Specify content type if needed
      },
    }
  );

  return res.data;
}

export async function uploadImage(formDatas) {
  try {
    const res = await axios.post(`${endpoint}/upload`, formDatas, {
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
  const res = await axios.post(
    `${endpoint}/products/${id}/review`,
    { rating, comment },
    {
      headers: {
        Authorization: `Bearer ${userToken}`, // Add Authorization header with token
        "Content-Type": "application/json", // Specify content type if needed
      },
    }
  );

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
    const response = await axios.post(`${endpoint}/acceptPayment`, {
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
    const response = await axios.post(`${endpoint}/acceptPayment/webhook`, {
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

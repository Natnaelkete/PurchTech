import bycrypt from "bcryptjs";

const user = [
  {
    name: "Admin user",
    email: "admin@gmail.com",
    password: bycrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Nati man",
    email: "natiman@gmail.com",
    password: bycrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Beki",
    email: "beki@gmail.com",
    password: bycrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default user;

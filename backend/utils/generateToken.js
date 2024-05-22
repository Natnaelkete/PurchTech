// import jwt from "jsonwebtoken";

// const generateToken = (userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

// export default generateToken;

import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  //set token to Header
  // res.setHeader("Authorization", `Bearer ${token}`); // Set JWT as an HTTP-Only cookie
  res.cookie("jwt", token, {
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  return token;
};
export default generateToken;

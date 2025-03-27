//Name : /config/JWT.js

import jwt from "jsonwebtoken";

export const generateToken = (roleID) => {
  return jwt.sign({ roleID }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};

export const generateRefreshToken = (roleID) => {
  return jwt.sign({ roleID }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const decodeRefreshToken = (token) => {
  return jwt.decode(token);
};

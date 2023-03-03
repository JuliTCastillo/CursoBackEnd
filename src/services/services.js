import UserRepository from "./repositories/UserRepository.js";
import ProductRepository from "./repositories/ProductRepository.js";
import CartRepository from "./repositories/CartRepository.js";
import Dao from "../dao/dao.js";

const dao = new Dao();

export const userService = new UserRepository(dao);
export const productService = new ProductRepository(dao);
export const cartService = new CartRepository(dao);

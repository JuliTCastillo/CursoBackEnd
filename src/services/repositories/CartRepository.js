import Cart from "../../dao/models/modelCart.js";
import GenericRepository from "./GenericRepository.js";

export default class CartRepository extends GenericRepository{
    constructor(dao){
        super(dao, Cart.model);
    }
}
export default class CartDTO {
    static getDbDTO = (cart, count) => {
        return{
            _id: cart.id,
            name: cart.name,
            description: cart.description,
            image: cart.image,
            code: cart.code,
            price: cart.price,
            stock: cart.stock,
            count: count
        }
    }
}
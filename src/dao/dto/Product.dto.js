export default class ProductDTO {
    static getDbDTO = (product, count) => {
        return{
            _id: product.id,
            name: product.name,
            description: product.description,
            image: product.image,
            code: product.code,
            price: product.price,
            stock: product.stock,
            count: count
        }
    }
    static updateDbDTO = (product) => {
        return{
            _id: product._id,
            name: product.name,
            description: product.description,
            image: product.image,
            code: product.code,
            price: product.price,
            stock: (product.stock - product.count),
        }
    }
}
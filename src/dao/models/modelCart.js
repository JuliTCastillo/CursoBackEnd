export default class Cart {
    static get model() {
        return 'carts';
    }
    static get schema() {
        return {
            product: {
                type: Array,
                require: true
            },
            count: {
                type: Number,
                default: 0
            }
        }
    }
}
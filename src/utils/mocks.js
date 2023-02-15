import {faker} from "@faker-js/faker";

faker.locate = 'es';

export const generateProduct = () =>{
    return{
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        stock: faker.datatype.number(),
        description: faker.commerce.productDescription()
    }
}


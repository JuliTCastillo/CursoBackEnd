import nodemailer from 'nodemailer';
import config from '../config/config.js';

export const mailing = async(cart, user) => {
    try {
        console.log('---------------')
        console.log(cart, ' ', user)
        console.log('---------------')
        //Configuramos nodemailer
        const transport = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.CORREO.user,
                pass: config.CORREO.password
            }
        })

        let message = '';
        let precioTotal = 0;
        //Armando de mail HTML+CSS
        message+=`<p>Numero de compra: ${cart._id}<p>`
        cart.product.forEach(element => {
            message += 
            `
                <div>
                    <h3>${element.name}</h3>
                    <div style='display: flex;'>
                        <img src="${element.image}" alt='${element.name}' width="100">
                        <div>
                            <p>${element.description}</p>
                            <div style='display: flex;'>
                                <p>Precio: $${element.price}</p>
                                <p>Cantidad: ${element.count}</p>
                                <p>Precio Total del Producto: $${(element.price * element.count)}</p>
                            </div>
                        </div>
                    </div>   
                </div>
                <hr style="width: 300px; margin: 0px;">
            `    
            precioTotal += (element.price * element.count)
        });
        message += `<h3>Precio Total: $${precioTotal}</h3>`

        //configuracion de envio del mail
        await transport.sendMail({
            from: 'yo',
            to: `julietacastillo326@gmail.com`,
            subject: 'Libreria Juli :)',
            html: `<div>${message}</div>`
        })
        
        return 'mail enviado';
    } 
    catch (error) {
        return 'Algo salio mal';
    }

}
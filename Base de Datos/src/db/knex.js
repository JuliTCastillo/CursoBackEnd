import knex from "knex"; //importamos la base

const db = knex({
    client:'mysql',
    connection:{
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'baseknex'
    }
})

try{
    let exists = await db.schema.hasTable('users');
    if(!exists){
        await db.schema.createTable('users', table =>{
            table.primary('id');
            table.increments('id');
            //Creamos un id INT AUTO_INCREMENT, PRIMARY KEY(ID)
            //Para js podemos usar string pero en mysql es vachar
            table.string('First_name', 35).nullable(false); //Nombre de la columna y la longitud
            table.string('last_name', 20).nullable(false);
            table.string('email', 25).nullable(false);
            table.integer('age');
            table.string('gender', 10);
        })
    }
}
catch(error){
    console.log(error);
}

export default db;
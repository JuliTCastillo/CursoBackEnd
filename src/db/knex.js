import knex from 'knex';

const sqliteOptions = {
    client: 'sqlite3',
    connection: {
        filename: './sqliteDatabase.sqlite'
    },
    useNullAsDefault: true
}

const db = knex(sqliteOptions);

try{
    let exists = await db.schema.hasTable('products');
    if(!exists){
        await db.schema.createTable('products', table =>{
            table.primary('id');
            table.increments('id');
            //id INT AUTO_INCREMENT, PRIMARRY KEY (id)
            table.string('name', 45).nullable(false);
            table.string('description', 120);
            table.string('image', 200);
            table.string('code', 10).unique(true)
            table.integer('price').nullable(false);
            table.integer('stock').nullable(false);
        })
    }

}
catch (error) {
    console.log("error en la tabla de productos");
}

try{
    let exists = await db.schema.hasTable('messages');
    if(!exists){
        await db.schema.createTable('messages', table =>
        {
            table.primary('id').increments('id');
            //id INT AUTO_INCREMENT, PRIMARRY KEY (id)
            table.string('autor', 30).nullable(false);
            table.string('email');
            table.string('avatar')
            table.string('text');
        })
    }

}
catch (error) {
    console.log("error en la tabla de mensajes");
}

export default db;
var faker = require("faker");

const psql = require('./src/db');

let user_amount = 10;
let item_amount = 10;
let order_amount = 10;

let orders = [];
let users = [];
let items = [];

for(let i = 0; i < user_amount; i++) {
    let first_name = faker.name.firstName(); 
    let last_name = faker.name.lastName(); 
    let email = faker.internet.email(first_name, last_name);

    let ob = {
        first_name:     first_name,
        last_name:      last_name,
        email:          email
    }
    users.push(ob);
}
for(let i = 0; i < item_amount; i++) {
    let item = "Barang"+(i+1);
    let price = faker.datatype.number({min:1, max:99}) * 1000;
    
    let ob = {
        item:     item,
        price:    price
    }
    items.push(ob)
}

for(let i = 0; i < order_amount; i++){
    let r_item = faker.datatype.number({min:0, max:item_amount-1})
    let s_item = items[r_item]
    let r_user = faker.datatype.number({min:0, max:user_amount-1})
    let s_user = users[r_user]
    let quantity = faker.datatype.number({min:1, max:9})
    let total_price = s_item.price * quantity
    let ob = {
        first_name: s_user.first_name,
        last_name: s_user.last_name,
        email: s_user.email,
        item: s_item.item,
        quantity: quantity,
        price: s_item.price,
        total_price: total_price.toFixed(2)
    }
    orders.push(ob)
}
console.log('order',orders);

let preparedStatememnt = (data) => {
    const statement = `INSERT INTO orders(first_name, last_name, email, item, quantity, price, total_price)
    VALUES `;
     
    let values = '';
     
    let row = {};

    for (let i = 0; i < data.length; i++) {
        row = data[i];
        row.first_name = row.first_name.replace("'", "''");
        row.last_name = row.last_name.replace("'", "''");
        let value = `(\'${row.first_name}\', \'${row.last_name}\', \'${row.email}\', \'${row.item}\', ${row.quantity}, ${row.price}, ${row.total_price})`;        
    
        if(i === data.length-1){     
            values += value;
            values += ";";
        }else{
            value += ', ';
            values += value;  
        }
        
    }
    return { statement, values };
}

let ob = preparedStatememnt(orders);

console.log(ob.statement + ob.values);

psql.query(ob.statement + ob.values , function(err, res){
    console.log("success insert: "+res.rowCount);
});
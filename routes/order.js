var express = require('express');
var router = express.Router();

const psql = require('../src/db');

router.get('/', async function(req, res, next) {
    const result = await psql.query('SELECT first_name, last_name, item, email, price, quantity, total_price from orders');
    res.render('order', {data: result.rows});
});

function pivot(data,key,col,val) {
    result_data=[]
    unique_keys={}
    unique_cols=[]
    data.forEach(row => {
        col_name = row[col]
        key_name = row[key]
        val_name = row[val]
        if(unique_cols.includes(col_name) === false){
            unique_cols.push(col_name)
        }
        if (typeof unique_keys[key_name] === 'undefined') {
            let ob = {}
            ob[key]={}
            ob[key]=key_name
            result_data.push(ob)
            unique_keys[key_name]={}
            unique_keys[key_name][col_name]=val_name
        }else{
            if(typeof unique_keys[key_name][col_name] === 'undefined'){
                unique_keys[key_name][col_name]=val_name
            }else{
                unique_keys[key_name][col_name]+=val_name
            }
        }
   });
   
   for (let i = 0; i < result_data.length; i++) {
       key_name = result_data[i][key]
        unique_cols.forEach(col => {
            if(typeof unique_keys[key_name][col] === 'undefined'){
                result_data[i][col]=0
            }else{
                result_data[i][col]=unique_keys[key_name][col]
            }
        })
    };
    let header = []
    for (var key in result_data[0]) {
        header.push(key)
    };
    ob = {
        data: result_data,
        header: header
    }
   return ob;
}
router.get('/pivot', async function(req, res, next) {
    const result = await psql.query('SELECT item, email, quantity from orders');
    let resp = pivot(result.rows,'email','item','quantity')
    res.render('order_pivot', {data: resp.data, header: resp.header});
});

module.exports = router;

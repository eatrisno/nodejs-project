var express = require('express');
var faker = require("faker");
var router = express.Router();

let dummy_amount = 100;
let dummy_data = []

for (let i = 0; i < dummy_amount; i++) {
  let first_name = faker.name.firstName()
  let last_name = faker.name.lastName()

  let ob = {
      user_id:        faker.datatype.uuid(),
      first_name:     first_name,
      last_name:      last_name,
      user_name:      '@'+faker.internet.userName(first_name+' '+last_name),
      text:           faker.lorem.words(250),
      created_date:   faker.date.between('2021-01-01', '2021-12-31'),
      email:          faker.internet.email(first_name, last_name)
  }
  dummy_data.push(ob);
}

function getTwit(start=0, end=-1){
  return dummy_data.slice(start, end);
}

function parseLimitPage(limit, page) {
  let start = page * limit
  ob = {
    start: start,
    end: start + limit
  }
  return ob
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const limit = parseInt((req.query.limit ? req.query.limit : 5) < 5 ? 5 : req.query.limit)
  const page = parseInt((req.query.page ? req.query.page : 0) < 0 ? 0 : req.query.page)
  let param = await parseLimitPage(limit, page)
  let data = await getTwit(param.start, param.end)
  res.render('twitter', { title: 'Twitter feeds', data: data, page: page , limit: limit});
});

module.exports = router;

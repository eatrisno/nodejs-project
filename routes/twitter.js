var express = require('express');
var faker = require("faker");
var twitter = require("../src/twitter");
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


router.get('/feeds', async function(req, res, next) {
  const user_name = req.query.user_name ? req.query.user_name : null
  const last_id = parseInt((req.query.last_id ? req.query.last_id : null))

  var params = {
    result_type: 'recent',
    count: 6,
  }
  if(last_id) params['max_id']=last_id
  if(user_name) params['user_name']=user_name
  let result = await twitter.user_timeline(params)
  // let result = []
  // resp.forEach(dt => {
  //   let ob = {
  //     id: dt.id,
  //     text: dt.text,
  //     created_at: dt.created_at,
  //   }
  //   result.push(ob)
  // });
  // res.send(result)
  let new_last_id = result[result.length-1].id
  res.render('twitter_feed', { title: 'Twitter feeds', data: result, last_id: new_last_id});
});

module.exports = router;

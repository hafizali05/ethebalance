const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const port  = process.env.PORT || 3000;

// app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
app.get('/', (req, res)=> {
  res.render('index');
})


app.post('/', async (req, res)=> {
	const address = req.body.address;
	const blockcypher = await axios.get(`https://api.blockcypher.com/v1/eth/main/addrs/${req.body.address}/balance`)
	console.log('working',blockcypher.data);
	const bal =  blockcypher.data.balance /Math.pow(10, 18);
	console.log('bal:',bal);

	return res.render('index', { message: bal });
	// axios.get(`https://api.blockcypher.com/v1/eth/main/addrs/${req.body.address}/balance`)
	//   .then(function(response){
	//     console.log(response.data); // ex.: { user: 'Your User'}
	//     console.log(response.status); // ex.: 200
	// 	res.render('index', { message: response.data.balance });
	//   }); 
});
 
// app.post('/', wrap(async (req, res, next) => {
//   let wei = await bal(response.data.balance)
//   let ether = converter(wei){
//   	return wei / 10^8
//   }
//   stream.on('error', next).pipe(ether)
// }))


app.listen(port, () => {
  console.log('Server is up on port 3000');
});
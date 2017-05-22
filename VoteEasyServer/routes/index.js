var express = require('express');
var router = express.Router();
var models = require('../server/models/index');
var async = require('async');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/user/:user_id', (req, res, next) => {
	const uuid = req.params.user_id;
	models.Users.find({
		where: { uuid: uuid }, 
		include: [ {
			model: models.Polls, 
			include: [
				{ model: models.Options }
			]
		}]
	}).then((user) => {
		res.json(user);
	});
});

router.post('/user', (req, res, next) => { //setting up this route to create a user
	//will require a username and uuid
    const name = 'zaid', 
		  uuid = 12312;

  	models.Users.create({
  		name: name, 
  		uuid: uuid, 
  		poll_ids: []
  	}).then((user) => {
  		res.json(user);
  	});
});

router.post('/new-poll', (req, res, next) => {
	const user_id = +req.body.user_id;
	const options = [
		{ name: 'option 1', votes: 0 }, 
		{ name: 'option 2', votes: 1 }, 
		{ name: 'option 3', votes: 3 }
	];

	models.Users.findOne({
		where: {uuid: user_id}
	}).then((user) => {
		models.Polls.create({
			createdBy: user.get('name'),
			userId: user_id, 
			voter_ids: [], 
			Options: options
		}, {
			include: [{
				association: models.Polls.hasMany(models.Options)
			}]
		}).then((poll) => {
			res.json(poll);
		});
	});
});	

router.post('/add-vote', (req, res, next) => {
	const poll_id = req.body.poll_id;
});

router.get('/sync', (req, res, next) => {

	async.waterfall([
		syncUsers, 
		syncPolls, 
		syncOptions
	], (err, result) => {
		if(err) {
			throw new Error('Unexpected error');
		}else {
			console.log('done');
			res.json(result);
		}
	});

	function syncUsers(callback) {
		models.Users.sync({force: true})
    		   .then(() => {
    		 		console.log("Done clearing out users");
    		 		callback(null);
    		   });
	}

	function syncPolls(callback) {
		models.Polls.sync({force: true})
    		   .then(() => {
    		 		console.log("Done clearing out polls");
    		 		callback(null);
    		   });
	}

	function syncOptions(callback) {
		models.Options.sync({force: true})
    		   .then(() => {
    		 		console.log("Done clearing out options");
    		 		callback(null, 'done');
    		   });
	}
});

module.exports = router;

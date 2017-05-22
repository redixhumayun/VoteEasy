var express = require('express');
var router = express.Router();
var models = require('../server/models/index');
var async = require('async');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

//setting up this route to get all the users along with all their polls for initial hydration
router.get('/users', (req, res, next) => {
	models.Users.findAll({
		include: [{
			model: models.Polls, 
			include: [{
				model: models.Options
			}]
		}]
	}).then((response) => {
		res.status(200).json(response);
	});
});

//setting up this route to create a user, will require a username and uuid
router.post('/user', (req, res, next) => { 
    const name = req.body.name;
    const uuid = +req.body.uuid;

    if(!name || !uuid) {
    	res.status(400).send('Need to send name and uuid');
    }

  	models.Users.create({
  		name: name, 
  		uuid: uuid, 
  		poll_ids: []
  	}).then((user) => {
  		res.json(user);
  	});
});

//Use route to create a new poll for a specific user
router.post('/new-poll', (req, res, next) => {
	const user_id = +req.body.user_id;
	const options = req.body.options;

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
	}).catch((err) => {
		res.status(400).send('Cannot find user');
	});
});	

//Use this route to get a poll with all its options based on poll id
 router.get('/poll/:poll_id', (req, res, next) => {
 	const poll_id = req.params.poll_id;

 	models.Polls.findOne({
 		where: { id: poll_id }, 
 		include: [
 			{ model: models.Options }
 		]
 	}).then((poll) => {
 		res.json(poll);
 	});
 });

//Use this route to add a new option for a specific poll for a specific user
//Need to provide poll_id
router.post('/new-option', (req, res, next) => {
	const poll_id = +req.body.poll_id;
	const new_option = req.body.new_option;

	if(!poll_id || !new_option) {
		res.status(400).send('Required parameters not provided');
	}

	models.Options.create({
		name: new_option, 
		votes: 0, 
		PollId: poll_id
	}, {
		include: [{
			association: models.Options.belongsTo(models.Polls)
		}]
	}).then((option) => {
		res.status(200).json(option);
	});

});

//This route is to  fetch all possible Polls and Options of specific poll for specific user
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


//Use this route to increment vote for a specific option for a specific poll
//Need to provide voter_id to add to voter_ids array
router.post('/add-vote', (req, res, next) => {
	const poll_id = +req.body.poll_id;
	const option_to_update = req.body.option;

	models.Options.findAll({
		where: { 
			PollId: poll_id, 
			name: option_to_update
		}
	}).then((option) => {
		return option[0].increment('votes');
	}).then((option) => {
		return option.reload();
	}).then((option) => {
		res.json(option);
	});
});

//Use this router to sync all db and refresh the tables
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

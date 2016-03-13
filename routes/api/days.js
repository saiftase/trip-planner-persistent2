var router = require('express').Router();
var Promise = require('bluebird');

var models = require('../../db').models;
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Day = models.Day;

router.get("/", function(req, res, next){
	res.send("Hi");
})

router.get("/days/", function(req, res, next){
	Day.find().sort("number")
	.then(function(days){
		res.send(days);
	})
})

router.get("/days/:id", function(req, res, next){
	Day.findById(req.params.id)
	.then(function(day){
		res.send(day);
	})
	.catch(function(err){
		console.error(err);
		next();
	})
})

router.post("/days", function(req, res, next){
	console.log("body", req.body);
	var day = new Day();
	day.number = req.body.number;

	day.save()
	.then(function(day){
		console.log("Day Save resolved")
		res.send(day);
	})
	.catch(function(err){
		console.error(err);
		next();
	})
 })

router.put("/days/:id/:category", function(req, res, next){
	Day.findById(req.params.id)
	.then(function(day) {
		var category = req.params.category;
		if(category === 'hotel') {
			day.hotel = req.body.id;
		}
		else {
			day[category].push(req.body.id);
		}
		return day.save();
	})
	.then(function(day) {
		res.send(day);
	})
	.catch(function(err) {
		console.error(err);
		next();
	})
})

router.delete("/days/:id/:category", function(req, res, next){
	var dayId = req.params.id;
	Day.findById(dayId)
	.then(function(day){
		var category = req.params.category;
		console.log("day", day);
		if(category === "hotel"){
			day.hotel = null;
		}else{
			var index = day[category].indexOf(dayId);
			day[category].splice(index, 1);
		}
		return day.save();
	})
	.then(function(day){
		res.send(day)
	})
	.catch(function(err){
		console.error(err);
		next();
	})
})

router.delete("/days/:id", function(req, res, next){
	Day.findById(req.params.id)
	.then(function(day){
		day.remove();
	})
	.then(function(){
		res.send({});
	})
	.catch(function(err){
		console.error(err);
		next();
	})
})

module.exports = router;
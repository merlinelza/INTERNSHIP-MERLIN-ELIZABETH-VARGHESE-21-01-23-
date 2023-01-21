var express=require('express');
var router=express.Router();
const student=require('./models/studentschema')
const student_Class=require('./models/classschema')
const mongoose = require('mongoose');

router.post('/add_student', (req,res)=>{

	if(!req.body.name ||
      !req.body.roll_no||
      !req.body.mobile_no||
      !req.body.class_id){
      
      res.status(400);
      res.json({message: "All fields are mandatory"});
   } else {

   	student.find({roll_no: req.body.roll_no}, 
	   function(err, response){
	      if(response.length>0) {
	      	 res.status(400);
      		 res.json({message: "Roll no already added"});
      	  }
      	  else {
      	  		var newstudent = new student({
	        name: req.body.name,
	        roll_no: req.body.roll_no,
	        mobile_no: req.body.mobile_no,
	        class_id: req.body.class_id
	    })

	    newstudent.save(function(err, data){
	        if(err){
	            console.log(error);
	        }
	        else{
				res.status(200);
	            res.json({message:"New student added"});
	        }
	    });
      	  }
	});
	}
 });

router.delete('/delete_student/:id', (req,res)=>{

	student.findByIdAndRemove(req.params.id, function(err, response){
      if(err) res.json({message: "Error in deleting record id " + req.params.id});
      else res.json({message: "Student with id " + req.params.id + " removed."});
   });
 });

router.get('/studentsByClass/:id', (req,res)=>{

	student.find({'class_id':req.params.id},function(err, response){
		student_Class.find({'_id':req.params.id},function(err2, response2){
      		res.json(response+response2);
        });
   });
 });

router.get('/studentsByStandard/:id', (req,res)=>{

	student_Class.find({'standard':req.params.id},function(err, response){
      		var class_id = response[0]._id;
      		student.find({'class_id':class_id},function(err2, response2){
      			res.json(response2);
      		});
        });
 });

module.exports=router;
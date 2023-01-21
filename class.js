var express=require('express');
var router=express.Router();
const student_class=require('./models/classschema')

const mongoose = require('mongoose');

router.post('/add_class', (req,res)=>{

	if(!req.body.standard ||
      !req.body.division){
      
      res.status(400);
      res.json({message: "Standard and division fields are mandatory"});
   } else {

	    var newclass = new student_class({
	        standard: req.body.standard,
	        division: req.body.division
	    })

	    newclass.save(function(err, data){
	        if(err){
	            console.log(error);
	        }
	        else{
				res.status(200);
	            res.json({message:"New class inserted"});
	        }
	    });
	}
 });

router.put('/edit_class/:id', (req,res)=>{

	if(!req.body.standard ||
      !req.body.division){
      
      res.status(400);
      res.json({message: "Standard and division fields are mandatory"});
   } else {

	    student_class.findByIdAndUpdate(req.params.id, req.body, 
		   function(err, response){
		      console.log(response);
			  res.status(200);
		      res.json({message: "Class details edited successfully.",data: response});
		});
	}
 });

router.delete('/delete_class/:id', (req,res)=>{

	student_class.findByIdAndRemove(req.params.id, function(err, response){
      if(err) res.json({message: "Error in deleting record id " + req.params.id});
      else res.json({message: "Class with id " + req.params.id + " removed."});
   });
 });

module.exports=router;
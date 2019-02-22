const express = require('express');
var router = express.Router();
var dateTime = require('node-datetime');
var MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost/'
var fs = require('fs');
var jsonfile = require('jsonfile');
var path = require('path');
var cors = require('cors');
const app = express();
app.use(cors());
app.post('/api/customers',(req,res) =>{
   var elevale =[];
   elevale = req.query.element;
   nelevale = req.query.nelements;
   if(req.query.lengthe==1){
    MongoClient.connect(uri, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Zel");
        query = {elements: {$all:[elevale]}};
                    console.log(query);
                    dbo.collection("first").find(query).toArray(function(err, result) {
                      if (err) throw err;
                        var o = [];
                        for (i=0;i<result.length;i++){
                          o[i] = result[i];
                        }
                        var ou=[]
                        for (i=0;i<result.length;i++){
                          var nelements1 = o[i].nelements;
                          index =0;
                          for (kk=0;kk<nelements1.length;kk++){
                            index = index+nelements1[kk];
                          }
                          var index1 =[];
                          for (kg=0;kg<nelements1.length;kg++){
                            index1.push((nelements1[kg]/index)*100);
                          }
                          var idd = o[i].id;
                          var Format = o[i].F
                          var elements1 =o[i].elements;
                          var Energy = o[i].E0; 
                          var kiv = o[i].kvpos;
                          var funit = (kiv[0][0]/3.63)*(kiv[1][1]/3.63)*(kiv[2][2]/3.63);
                            objs={
                              "id" : idd,
                              "Formation": Format,
                              "Elements" :elements1,
                              "numbersel" : nelements1,
                              "Energy"   : Energy,
                              "forunit"  : funit,
                          }
                                 posval = parseFloat(nelevale);
                                 if(elements1.includes(elevale)){
                                    pos1 = elements1.indexOf(elevale);
                                    pos1val = index1[pos1];
                                 if( pos1val-2<= posval && posval <= pos1val+2){
                                ou.push(objs);
                                 }
                                }

                          }
                        
                          res.json({"output" : ou});
                      
           });
      });
}
else if(req.query.lengthe>1){
    MongoClient.connect(uri, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Zel");
        var regexps = elevale.map(function(elevale) {
         return new RegExp(elevale, "i");
     });
     dbo.collection("first").find({elements: {$all: regexps}}).toArray(function(err, result) {
       if (err) throw err;
         var o = [];
         var ou=[];
         for (i=0;i<result.length;i++){
           o[i] = result[i];
         }
         for (i=0;i<result.length;i++){
           var nelements1 = o[i].nelements;
           index =0;
           for (kk=0;kk<nelements1.length;kk++){
             index = index+nelements1[kk];
           }
         
         var index1 =[];
         for (kg=0;kg<nelements1.length;kg++){
           index1[kg]=((nelements1[kg]/index)*100);
         }
                         var idd = o[i].id;
                         var Format = o[i].F
                         var elements1 =o[i].elements;
                         var Energy = o[i].E0; 
                         var kiv = o[i].kvpos;
                         var funit = (kiv[0][0]/3.63)*(kiv[1][1]/3.63)*(kiv[2][2]/3.63);
                         objs={
                           "id" : idd,
                           "Formation": Format,
                           "Elements" :elements1,
                           "numbersel" : nelements1,
                           "Energy"   : Energy,
                           "forunit"  : funit, 
                       }
                       var aa=0;
                         for (jm= 0 ;jm< elevale.length ;jm++){
                          pos = elevale.indexOf(elevale[jm])
                          posval = parseFloat(nelevale[pos]);
                          if(elements1.includes(elevale[jm])){
                             pos1 = elements1.indexOf(elevale[jm]);
                             pos1val = index1[pos1];
                             if(pos1val-2<= posval && posval <= pos1val+2){
                               aa++;
                             }
                          }
                   }
                   
                   if(aa==elevale.length){
                     ou.push(objs);
                   }
                       
       }
       res.json({"output" : ou});

       });
   });
    }
});

app.post('/api/exact',(req,res) =>{
  var elevale =[];
  elevale = req.query.element;
  nelevale = req.query.nelements;
  if(req.query.lengthe==1){
    MongoClient.connect(uri, function (err, db) {
      if (err) throw err;
      var dbo = db.db("Zel");
      query = {elements: {$all:[elevale]}};
                  dbo.collection("first").find(query).toArray(function(err, result) {
                    if (err) throw err;
                      var o = [];
                      for (i=0;i<result.length;i++){
                        o[i] = result[i];
                      }
                      var ou=[]
                      for (i=0;i<result.length;i++){
                        var nelements1 = o[i].nelements;
                        index =0;
                        for (kk=0;kk<nelements1.length;kk++){
                          index = index+nelements1[kk];
                        }
                        var index1 =[];
                        for (kg=0;kg<nelements1.length;kg++){
                          index1.push((nelements1[kg]/index)*100);
                        }
                        var idd = o[i].id;
                        var Format = o[i].F
                        var elements1 =o[i].elements;
                        var Energy = o[i].E0; 
                        var kiv = o[i].kvpos;
                        var funit = (kiv[0][0]/3.63)*(kiv[1][1]/3.63)*(kiv[2][2]/3.63);
                          objs={
                            "id" : idd,
                            "Formation": Format,
                            "Elements" :elements1,
                            "numbersel" : nelements1,
                            "Energy"   : Energy,
                            "forunit"  : funit,
                        }
                          posval = parseFloat(nelevale);
                                 if(elements1.includes(elevale)){
                                    pos1 = elements1.indexOf(elevale);
                                    pos1val = index1[pos1];
                                 }
                                 if(posval==pos1val){
                                  ou.push(objs);
                                }
                        }
                      
                  res.json({"output" : ou});
                    
         });
    });
   }
  else if(req.query.lengthe>1){
      MongoClient.connect(uri, function (err, db) {
           if (err) throw err;
           var dbo = db.db("Zel");
           var regexps = elevale.map(function(elevale) {
            return new RegExp(elevale, "i");
        });
        dbo.collection("first").find({elements: {$all: regexps}}).toArray(function(err, result) {
          if (err) throw err;
            var o = [];
            var ou=[];
            for (i=0;i<result.length;i++){
              o[i] = result[i];
            }
            for (i=0;i<result.length;i++){
              var nelements1 = o[i].nelements;
              index =0;
              for (kk=0;kk<nelements1.length;kk++){
                index = index+nelements1[kk];
              }
            
            var index1 =[];
            for (kg=0;kg<nelements1.length;kg++){
              index1[kg]=((nelements1[kg]/index)*100);
            }
                            var idd = o[i].id;
                            var Format = o[i].F
                            var elements1 =o[i].elements;
                            var Energy = o[i].E0; 
                            var kiv = o[i].kvpos;
                            var funit = (kiv[0][0]/3.63)*(kiv[1][1]/3.63)*(kiv[2][2]/3.63);
                            objs={
                              "id" : idd,
                              "Formation": Format,
                              "Elements" :elements1,
                              "numbersel" : nelements1,
                              "Energy"   : Energy,
                              "forunit"  : funit, 
                          }
                          var aa=0;
                          for (jm= 0 ;jm< elevale.length ;jm++){
                                 pos = elevale.indexOf(elevale[jm])
                                 posval = parseFloat(nelevale[pos]);
                                 if(elements1.includes(elevale[jm])){
                                    pos1 = elements1.indexOf(elevale[jm]);
                                    pos1val = index1[pos1];
                                    if(posval==pos1val){
                                      aa++;
                                    }
                                    
                                 }
                          }
                          if(aa==elevale.length){
                            ou.push(objs);
                          }
          }
          res.json({"output" : ou});
  
          });
      });
    }
});

app.post('/api/apprx',(req,res) =>{
  var elevale =[];
  elevale = req.query.element;
  nelevale = req.query.nelements;
  if(req.query.lengthe==1){
    MongoClient.connect(uri, function (err, db) {
      if (err) throw err;
      var dbo = db.db("Zel");
      query = {elements: {$all:[elevale]}};
                  dbo.collection("first").find(query).toArray(function(err, result) {
                    if (err) throw err;
                      var o = [];
                      for (i=0;i<result.length;i++){
                        o[i] = result[i];
                      }
                      var ou=[]
                      for (i=0;i<result.length;i++){
                        var nelements1 = o[i].nelements;
                        index =0;
                        for (kk=0;kk<nelements1.length;kk++){
                          index = index+nelements1[kk];
                        }
                        var index1 =[];
                        for (kg=0;kg<nelements1.length;kg++){
                          index1.push((nelements1[kg]/index)*100);
                        }
                        var idd = o[i].id;
                        var Format = o[i].F
                        var elements1 =o[i].elements;
                        var Energy = o[i].E0; 
                        var kiv = o[i].kvpos;
                        var funit = (kiv[0][0]/3.63)*(kiv[1][1]/3.63)*(kiv[2][2]/3.63);
                          objs={
                            "id" : idd,
                            "Formation": Format,
                            "Elements" :elements1,
                            "numbersel" : nelements1,
                            "Energy"   : Energy,
                            "forunit"  : funit,
                        }
                      
                        ou.push(objs);
                        }
                      
                  res.json({"output" : ou});
                    
         });
    });
   }
else if(req.query.lengthe>1){
    MongoClient.connect(uri, function (err, db) {
         if (err) throw err;
         var dbo = db.db("Zel");
         var regexps = elevale.map(function(elevale) {
          return new RegExp(elevale, "i");
      });
      dbo.collection("first").find({elements: {$all: regexps}}).toArray(function(err, result) {
        if (err) throw err;
          var o = [];
          var ou=[];
          for (i=0;i<result.length;i++){
            o[i] = result[i];
          }
          for (i=0;i<result.length;i++){
            var nelements1 = o[i].nelements;
            index =0;
            for (kk=0;kk<nelements1.length;kk++){
              index = index+nelements1[kk];
            }
          
          var index1 =[];
          for (kg=0;kg<nelements1.length;kg++){
            index1[kg]=((nelements1[kg]/index)*100);
          }
                          var idd = o[i].id;
                          var Format = o[i].F
                          var elements1 =o[i].elements;
                          var Energy = o[i].E0; 
                          var kiv = o[i].kvpos;
                          var funit = (kiv[0][0]/3.63)*(kiv[1][1]/3.63)*(kiv[2][2]/3.63);
                          objs={
                            "id" : idd,
                            "Formation": Format,
                            "Elements" :elements1,
                            "numbersel" : nelements1,
                            "Energy"   : Energy,
                            "forunit"  : funit, 
                        }
                        
                          ou.push(objs);
                        
        }
        res.json({"output" : ou});

        });
    });
  }
  });

const port= 5000;
app.listen(port,()  => console.log(`server started at the port ${port}`))
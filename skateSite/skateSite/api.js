var express        = require('express');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var route          = express.Router();
var bcrypt         = require('bcrypt');
var methodOverride = require('method-override');

/////////////////////
/////////////////////
////require model////
var Videopost = require('./models/videopost.js');
var Comment   = require('./models/comment.js');
var User      = require('./models/user.js');
////require model////
/////////////////////
/////////////////////

module.exports = function(app){


  ///////////////////////////////////
  //////begin all videopost routes
  ///////////////////////////////////
  ///get all posts with comments Route
  app.get("/api/allposts", function(req, res){
    Videopost.find({})
    .populate('comments')//////we want to pull all our comments with our videoposts
    .exec(function(err, allPosts){
      res.json(allPosts);
    })
  })

  ///////post a video
  app.post('/api/video', function(req, res){
    var newVideo = new Videopost();
    newVideo.creator = req.body.creator;
    newVideo.title = req.body.title;
    newVideo.description = req.body.description;
    newVideo.ytEmbedCode = req.body.ytEmbedCode;
    newVideo.save(function(err, savedVideo){
      if(err){console.log(err)}
      res.json(savedVideo)
    })
  })

  ////get a single video post, with all comments
  app.get('/api/single/video/:postId', function(req, res){
    console.log(req.params.postId);
    Videopost.findOne({_id: req.params.postId})
    .populate('comments')//////we want to pull all our comments with our videoposts
    .exec(function(err, singlePost){
      res.json(singlePost);
    })
  })

  ///////add a single comment to it's proper videopost
  app.post('/api/addcomment/videopost/:postId', function(req, res){
    console.log(req.body);
    Videopost.findOne({"_id":req.params.postId}, function(err, videopost){
      videopost.comments.push(req.body)
      videopost.save(function(err, updatedPost){
        console.log(updatedPost);
        res.json(updatedPost);
      })
    })
  })

  ///////////////////////////////////
  //////End all videopost routes
  ///////////////////////////////////

  ///////////////////////////////////
  //////begin all comment routes
  ///////////////////////////////////
  ////get all comments
  app.get('/api/comments', function(){
    Comment.find({}, function(err, allComments){
      console.log(allComments);
      res.json(allComments);
    })
  })

  //////post a comment
  app.post('/api/new/comment', function(req, res){
    Comment.create(req.body, function(err, newComment){
      if(err){console.log(err)}
      res.json(newComment);
    })
  })

  ///////////////////////////////////
  //////end all comment routes
  ///////////////////////////////////

  ///////////////////////////////////
  //////Begin all User routes
  ///////////////////////////////////


  app.post('/api/new/user', function(req, res){
    console.log(req.body);
    User.findOne({username: req.body.username}, function(err, user){
      if(user && user != null){
        res.json('username taken');
      }
      else {
        if(req.body.adminPassword && req.body.adminPassword == "DaewonNoseblunt"){
          /////user trying to signin as an admin
          console.log('yes password');
          bcrypt.genSalt(10, function(err, salt){
            console.log(salt);
            bcrypt.hash(req.body.password, salt, function(err, hash){
              console.log(hash);
              User.create({username: req.body.username, passwordDigest: hash, admin: true}, function(err, newUser){
                console.log(newUser);
                res.json(newUser);
              })
            })
          })
        }
        else if(req.body.adminPassword && req.body.adminPassword != "DaewonNoseblunt"){
          res.json('password issue');
        }
        else {
          bcrypt.genSalt(10, function(err, salt){
            console.log(salt);
            bcrypt.hash(req.body.password, salt, function(err, hash){
              console.log(hash);
              User.create({username: req.body.username, passwordDigest: hash, admin: false}, function(err, newUser){
                console.log(newUser);
                res.json(newUser);
              })
            })
          })
        }
      }
    })
  })

  app.post('/api/admin/signin', function(req, res){
    console.log(req.body);
    User.findOne({"username":req.body.username}, function(err, user){
      if(err){console.log(err)}
      if(user == null){
        res.json('no user')
      }
      else {
        var passwordHash =  bcrypt.compareSync(req.body.password, user.passwordDigest);
        if(passwordHash == true){
          bcrypt.compare(req.body.password, user.passwordDigest, function(err, result){
            if(result == true){
              res.json(user);
            }
          });
        }
        else {
          res.json('password match issue')
        }
      }
    })
  })
  ///////////////////////////////////
  //////End all User routes
  ///////////////////////////////////
}

mongoose.connect("mongodb://jackconnor:Skateboard1@ds031751.mongolab.com:31751/skate_site");

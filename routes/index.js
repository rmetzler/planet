var express = require('express');
var router = express.Router();
var feedreader = require('../lib/feedreader.js');

/* GET home page. */
router.get('/', function(req, res) {

  if(req.query.id){
    console.log(('Here is the id of the document the user is trying to access: ' + req.query.id));
    feedreader.getArticleById(req.query.id, function(post){
      var article = [];
      article[0] = post;
      res.render(
        'singleArticle', {data: article}
      );
    });
  }
  else if(req.query.searchString){
    console.log(('Here is the users search: ' + req.query.searchString));
    feedreader.getArticlesBySearchString(req.query.searchString, function(results){
      console.log(results.hits.hits.length);
      console.log(results.hits.hits[0]._source.title);
      res.render(
        'search', {data: results}
      );
    });
  }
  else {
    feedreader.run(function(posts) {    
      res.render(
        'index', {data: posts}
      );
        
    });
  }
});




module.exports = router;
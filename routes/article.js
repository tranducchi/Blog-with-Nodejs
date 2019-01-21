var express = require('express');
var router  = express.Router();
var Article = require('../models/Article');

// add article
router.get('/add', (req, res)=>{
    res.render('add', {title: "Add Article"});
});
router.post('/add', (req, res)=>{
    let article = new Article();
    article.title = req.body.title;
    article.description = req.body.description;
    article.save((err)=>{
        if(err) 
            console.log(err);
        return res.redirect('/');
    });
    // req.flash('info', "success");
});
// Article Detail
router.get('/:id', (req, res)=>{
    Article.find({"_id" : req.params.id}, (err, result)=>{
        res.render('article_detail', {
            title:"Detail Post",
            article:result
        });
    });
   
});
// Delete Article
router.get('/delete/:id', (req, res)=>{
    Article.remove({'_id': req.params.id}, (err, data)=>{
        if(err) throw err
        res.redirect('/');
    });
});
// Edit post 
router.get('/edit/:id', (req, res)=>{
    Article.find({'_id': req.params.id}, (err, data)=>{
        if(err) throw err
        res.render('edit_article', {
            article : data,
            title: 'Update Article'
        })
    });
});
router.post('/update/:id', (req, res)=>{
    var query = {'_id':req.params.id};
    var title = Article.title = req.body.title;
    var description = Article.description = req.body.description;
    var ar = {title, description};
    Article.updateOne(query, ar, (err, data)=>{
        if(err) throw err;
        res.redirect('/');
    });
    
});
// Search Article 
router.post('/search', (req,res)=>{
    Article.find({$text:{$search:req.body.key}}, (err, article)=>{
        console.log(article);
        if(err) throw err;
        res.render('search',{article:article});
    });
});
 
module.exports = router;
const express = require('express');
var router = express.Router();
var Article = require('../models/Article');
const paginate = require('express-paginate');
/* GET home page. */
router.get('/',async (req, res, next)=> {
  try {
    const [ results, itemCount ] = await Promise.all([
      Article.find({}).limit(req.query.limit).skip(req.skip).lean().exec(),
      Article.count({})
    ]);

    const pageCount = Math.ceil(itemCount / req.query.limit);
    res.render('index', {
      title:'Homepage',
      article: results,
      pageCount,
      itemCount,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
    });
  } catch (err) {
    next(err);
  }

});


module.exports = router;

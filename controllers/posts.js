// controllers/posts.js
const Post = require('../models/post');
module.exports = function(app) {

    // INDEX
    app.get('/', (req, res) => {
        res.render('home', {});
        // Posts.find().then(reviews => {
        //     res.render('posts-index', { reviews: reviews });
        // }).catch(err => {
        //     console.log(err);
        // })
    })
    
    // NEW
    app.get('/posts/new', (req, res) => {
        res.render('posts-new', {});
    })

    // CREATE
    app.post('/posts/new', (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);
    
        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
          // REDIRECT TO THE ROOT
          return res.redirect(`/`);
        })
    });
}
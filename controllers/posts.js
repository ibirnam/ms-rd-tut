// controllers/posts.js
const Post = require('../models/post');
module.exports = function(app) {

    // INDEX
    app.get('/', (req, res) => {
        // res.render('home', {});
        Post.find().then(posts => {
            res.render('posts-index', { posts });
            // res.render('home', {});
        }).catch(err => {
            console.log(err.message);
        })
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
            if (err) {
                console.log(err);
            }
          // REDIRECT TO THE ROOT
          return res.redirect(`/`);
        })
    });

    // SHOW
    app.get("/posts/:id", function(req, res) {
        // LOOK UP THE POST
        Post.findById(req.params.id)
          .then(post => {
            res.render("posts-show", { post });
          })
          .catch(err => {
            console.log(err.message);
          });
      });

    // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
        Post.find({ subreddit: req.params.subreddit })
          .then(posts => {
            res.render("posts-index", { posts });
          })
          .catch(err => {
            console.log(err);
          });
    });
}
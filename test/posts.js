// test/posts.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

// Import the Post model from our models folder so we
// we can use it in our tests.
const Post = require('../models/post');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Posts', function () {
    let post;
    const agent = chai.request.agent(server);

    before(function () {
        post = { title: "post title", url: "https://www.google.com", summary: "post summary" };
    });

    it("should create with valid attributes at POST /posts", function (done) {

        // Post.findOneAndRemove(post, function () {
        Post.find(function (err, posts) {
            var postCount = posts.length;
            console.log("postCount", postCount);
            agent
                .post("/posts/new")
                .send(post)
                .then(res => {
                    Post.find(function (err, morePosts) {
                        console.log("postCount NEW length", postCount.length);
                        expect(postCount).to.equal(postCount + 1);
                        res.should.have.status(200);
                        return done();
                    });
                })
                .catch(err => {
                    return done(err);
                });
        });
        // });
    });

    after(function () {
        Post.findOneAndDelete(post);
        agent.close();
    });
    // const agent = chai.request.agent(server);
    // // Post that we'll use for testing purposes
    // const post = {
    //     title: 'post title',
    //     url: 'https://www.google.com',
    //     summary: 'post summary'
    // };

    // it("should create with valid attributes at POST /posts", function(done) {
    //     const originalCount =  Post.estimatedDocumentCount();
    //     console.log("originalCount ", originalCount);
    //     agent.post('/posts/new').send(post)
    //         .then(function(res)  {
    //             res.should.be.html;
    //             res.should.have.status(200);
    //             originalCount.should.equal(originalCount + 1);
    //             return done();
    //         })
    //         .catch(function(err)  {
    //             return done(err);
    //         });
    //     // res.should.be.html;
    //     // res.should.have.status(200);
    // });

    // after(function() {
    //     Post.findOneAndDelete(post);
    //     agent.close();
    // });
});
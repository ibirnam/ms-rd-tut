const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
// const server = require('../server');

chai.use(chaiHttp);

// Import the Post model from our models folder so we
// we can use it in our tests.
const Post = require("../models/post");

const samplePost = {
    "title": "post title", "url": "https://www.google.com", "summary": "post summary"
}

describe("Posts", () => {

    after(() => {
        Post.deleteMany({title: 'post title'}).exec((err, posts) => {
          console.log(posts)
          posts.remove();
        })
    });

    it("should create with valid attributes at POST /posts", (done) => {
        chai.request("localhost:3000")
        .post("/posts/new")
        .send(samplePost)
        .end((err, res) => {
            res.status.should.be.equal(200);
            res.status.should.be.html
            done();
        });
        // .then(res => {
        //   Post.find(function(err, posts) {
        //     postCount.should.be.equal(posts.length - 1);
        //     res.should.have.status(200);
        //     return done();
        //   });
        // })
        // .catch(err => {
        //   return done(err);
        // });
    });
});
const app = require("./../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const Post = require("../models/post");
const User = require('../models/user')

chai.use(chaiHttp);

const agent = chai.request.agent(app);

describe("Posts", function () {
    const newPost = {
        title: "post title",
        url: "https://www.google.com",
        summary: "post summary",
        subreddit: "test"
    };

    const user = {
        username: 'poststest',
        password: 'testposts'
    };

    before(function (done) {
        agent
            .post('/sign-up')
            .set("content-type", "application/x-www-form-urlencoded")
            .send(user)
            .then(function (res) {
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

    it('Should create with valid attributes at POST /posts/new', function (done) {
        // Checks how many posts there are now
        Post.estimatedDocumentCount()
            .then(function (initialDocCount) {
                agent
                    .post("/posts/new")
                    // This line fakes a form post,
                    // since we're not actually filling out a form
                    .set("content-type", "application/x-www-form-urlencoded")
                    // Make a request to create another
                    .send(newPost)
                    .then(function (res) {
                        Post.estimatedDocumentCount()
                            .then(function (newDocCount) {
                                console.log("made it to check status");
                                // Check that the database has one more post in it
                                expect(res).to.have.status(200);
                                // Check that the database has one more post in it
                                expect(newDocCount).to.be.equal(initialDocCount + 1)
                                done();
                            })
                            .catch(function (err) {
                                done(err);
                            });
                    })
                    .catch(function (err) {
                        done(err);
                    });
            })
            .catch(function (err) {
                done(err);
            });
    });

    after(function (done) {
        Post.findOneAndDelete(newPost)
            .then(function (res) {
                agent.close()

                User.findOneAndDelete({
                    username: user.username
                })
                    .then(function (res) {
                        done()
                    })
                    .catch(function (err) {
                        done(err);
                    });
            })
            .catch(function (err) {
                done(err);
            });
    });
});
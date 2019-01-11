// test/posts.js
const chai = require('chai');
const chaiHttp = require('chai-http');

// Import the Post model from our models folder so we
// we can use it in our tests.
const Post = require('../models/post');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Posts', () => {
    const agent = chai.request.agent(server);
    // Post that we'll use for testing purposes
    const post = {
        title: 'post title',
        url: 'https://www.google.com',
        summary: 'post summary'
    };

    it("should create with valid attributes at POST /posts", async() => {
        const originalCount = await Post.countDocuments();
        const res = await agent.post('/posts/new').send(post);
        const newCount = await Post.countDocuments();
        console.log("newCount");
        console.log(newCount);
        console.log("newCount-1");
        console.log(newCount-1);
        console.log("originalCount");
        console.log(originalCount);
        res.should.be.html;
        res.should.have.status(200);
        originalCount.should.equal(newCount-1);
        // expect(originalCount).to.equal(newCount-1);

        await Post.findOneAndDelete(post);
    });

    after(() => {
        agent.close();
    });
});
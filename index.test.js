const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require('./db/connection.js');

const userSeeds = require("./seed/users.json");
const commentSeeds = require("./seed/comments.json");
const likeSeeds = require("./seed/likes.json");
const postSeeds = require("./seed/posts.json");
const profileSeeds = require("./seed/profiles.json");

describe('Social Sequelzie Test', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the test suite is run
        await db.sync({ force: true });

        await User.bulkCreate(userSeeds);
        await Comment.bulkCreate(commentSeeds);
        await Like.bulkCreate(likeSeeds);
        await Post.bulkCreate(postSeeds);
        await Profile.bulkCreate(profileSeeds);
    })

    // Write your tests here

    //user and profile associated
    test("user and profile have one to one association", async () => {

        const user1 = await User.findByPk(1);
        const profile1 = await Profile.findByPk(1);
        await user1.setProfile(profile1);
        const test = await user1.getProfile();
        expect(test instanceof Profile).toBe(true)


        
    })
    //user and post associated
    test("user and post have one to many association", async () => {
        const user2 = await User.findByPk(2);
        const post1 = await Post.findByPk(1);
        const post2 = await Post.findByPk(2);

        await user2.setPosts([post1, post2]);

        const test = await User.findByPk(2, {include: Post });
        expect(test.Posts.length).toBe(2)

    })
    //post and comment associated
    test("post and comment have one to many association", async () => {
        const post3 = await Post.findByPk(3);
        const comment1 = await Comment.findByPk(1);
        const comment2 = await Comment.findByPk(2);

        await post3.setComments([comment1, comment2]);

        const test = await Post.findByPk(3, {include: Comment});

        expect(test.Comments.length).toBe(2)
        
    })
    //user and like assocated
    test("user and like have many to many association", async () => {
        const user3 = await User.findByPk(3);
        const like1 = await Like.findByPk(1);

        await user3.addLike(like1);
        await like1.addUser(user3);

        const test1 = await User.findByPk(3, {include: Like});
        const test2 = await Like.findByPk(1, {include: User});

        expect(test1.Likes.length).toBe(1);
        expect(test2.Users. length).toBe(1)

        
    })
    

})
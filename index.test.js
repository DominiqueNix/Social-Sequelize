const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require('./db/connection.js');

const userSeeds = require("./seed/users.json");
const commentSeeds = require("./seed/comments.json");
const likeSeeds = require("./seed/likes.json");
const postSeeds = require("./seed/posts.json");
const profileSeeds = require("./seed/profiles.json");


let maria;
let mariaProfile;
let mariaPost; 
let mariaComment;
let mariaLike;

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
        maria =  await User.create({
            username: "maria_smith",
            email: "ms@example.com"
        })
        mariaProfile = await Profile.create({  
            bio: "I'm a actress",
            profilePicture: "https://example.com/profile10.jpg",
            birthday: "1988-07-16"
        })
        mariaPost = await Post.create({
            "title": "Example title",
            "body": "example body",
            "createdAt": "2020-03-15T10:30:00.000Z"
          })
        mariaComment = await Comment.create({
                "body": "example comment",
                "createdAt": "2021-01-01T12:00:00Z"
        })
        mariaLike = await Like.create({
            "reactionType": "👍",
            "createdAt": "2021-03-20T10:00:00Z"
        })
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

    // User CRUD

    test('User can create', async () => {
       

        expect(maria).toBeInstanceOf(User)
    })

    test('User can update', async () => {
        await maria.update({email: 'msm@email.com'})
        expect(maria.email).toBe('msm@email.com')
    })
    
    test('User can delete', async () => {
        let destroyedUser = await maria.destroy();
        expect(destroyedUser).toEqual(maria)
    })

    //Profiles Crud
    test('Profile can create', async () => {
       

        expect(mariaProfile).toBeInstanceOf(Profile)
    })

    test('Profile can update', async () => {
        await mariaProfile.update({birthday: '1987-02-02'})
        expect(mariaProfile.birthday).toBe('1987-02-02')
    })
    
    test('Profile can delete', async () => {
        let destroyedUser = await mariaProfile.destroy();
        expect(destroyedUser).toEqual(mariaProfile)
    })

    //Post Crud
    test('Post can create', async () => {
        expect(mariaPost).toBeInstanceOf(Post)
    })

    test('Post can update', async () => {
        await mariaPost.update({body: 'this is a new example post'})
        expect(mariaPost.body).toBe('this is a new example post')
    })
    
    test('Post can delete', async () => {
        let destroyedUser = await mariaPost.destroy();
        expect(destroyedUser).toEqual(mariaPost)
    })
    //Like Crud
    test('Like can create', async () => {
        expect(mariaLike).toBeInstanceOf(Like)
    })

    test('Like can update', async () => {
        await mariaLike.update({reactionType: '😄'})
        expect(mariaLike.reactionType).toBe('😄')
    })
    
    test('Like can delete', async () => {
        let destroyedUser = await mariaLike.destroy();
        expect(destroyedUser).toEqual(mariaLike)
    })
    //Comment Crud
    test('Comment can create', async () => {
        expect(mariaComment).toBeInstanceOf(Comment)
    })

    test('Comment can update', async () => {
        await mariaComment.update({body: 'this is a new example Comment'})
        expect(mariaComment.body).toBe('this is a new example Comment')
    })
    
    test('Comment can delete', async () => {
        let destroyedUser = await mariaComment.destroy();
        expect(destroyedUser).toEqual(mariaComment)
    })
})
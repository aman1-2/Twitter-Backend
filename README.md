# Requirements
- User should be able to create a Post.
    - [The post/tweet cannot be more than 250 characters.]
    - [Every post/tweet will have a support for image upload.]

- Any post should be visible to all those users who follows the author.
- Anyone who follows you can comment on a post/tweet.
- Anyone who follows you can like on a post/tweet.
- We can comment on a comment.
- We can like any comment also.
- Retweeting

- User Profile
    - Name
    - Follower count
    - Bio
    - Last 10 tweet from the user

- Pagination on tweets
- User Authentication

- Every tweet might be having a hashtag.

## Desigining the Like Model In a such a way that:
- A like can be dropped on a Post as well as a like can be done on a comment.
- Such that if we need to extend our feature and like some other products like stories then we can do it easily.

### Like Schema
1. one thing which we can keep in Like Schema could be on which model we want to like - whether its a Tweet or a Comment.
2. Some people would think instead of having this onModel Property we can different properties as comment and tweet where we can store likes but it won't be feasible as in introduction to new feature we cann't every time just update the Schema.
3. Now we have another property as likable in which based on the like ,
whether we liked a tweet or comment we will store the tweet or comment Id in it. Because on object/document can be either on a tweet or a comment like.
4. The third property is of the user that is which user we Liked it.

- This type of model in Mongoose can be created with the help of refPath -> [text](https://mongoosejs.com/docs/populate.html#dynamic-refpath) 

## The toggleLike Feature inside the Like Service ->
- Inside the toggle Like we need to pass the modelId -> Which is either the tweet or comment Id which is going to be Liked. With it we pass the modelType -> which tells what is being liked. That id will be only stored and at last UserId -> Which user liked id All these need to be passed in the parameter.

## Comment Calculation could be like ->
- We can either get directly the first comment layer counts on the post from the tweets array or if we want to have the total counts of the comments then they can be calculated through the virtuals.
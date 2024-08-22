import { TweetRepository } from '../../src/repository/index.js';
import Tweet from '../../src/models/tweet.js';
import { ValidationError, AppError } from '../../src/utils/errors/index.js';

jest.mock('../../src/models/tweet.js');

describe("Tweet Creation", ()=>{
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Should create a new Tweet Repository and return it.", async()=>{
        const data = {
            content: "Mock Tweet #Testing",
            likes: [],
            comments: [],
            user: '1'
        }
    
        const mockTweet = {
            ...data,
            id: '11',
            createdAt: '2024-08-22',
            updatedAt: '2024-08-22'
        }
    
        const spy= jest.spyOn(Tweet, 'create').mockResolvedValue(mockTweet);
    
        const tweetRepository = new TweetRepository();
        const tweet = await tweetRepository.create(data);

        expect(spy).toHaveBeenCalledWith(data);
        expect(tweet).toEqual(mockTweet);
        expect(tweet.content).toBe(data.content);
        expect(tweet.createdAt).toBeDefined();
        expect(tweet.updatedAt).toBeDefined();
        expect(tweet.id).toBeDefined();
    });

    test("Should throw a Validation Error if provided Invalid input.", async() => {
        const mockInvalidData = {
            content: "", //Sending no tweet content
            likes: [],
            comments: [],
            user: '2'
        }

        const validationError = new ValidationError("Not able to validate data sent in the request.");

        const spy = jest.spyOn(Tweet, 'create').mockImplementation(()=>{
            throw validationError;
        });

        const tweetRepository = new TweetRepository();

        await expect(tweetRepository.create(mockInvalidData)).rejects.toThrow(ValidationError);
        await expect(tweetRepository.create(mockInvalidData)).rejects.toThrow("Not able to validate data sent in the request.");
        await expect(tweetRepository.create(mockInvalidData)).rejects.toThrow(validationError);

        // Check that the create method was called
        expect(Tweet.create).toHaveBeenCalledWith(mockInvalidData);
    });

    test("Should thorw an App Error if there is Internal Server or Repository layer error.", async() => {
        const mockError = {
            content: "",
            likes: [],
            comments: [],
            user: '' //Sending no user. Internal Server Error.
        };

        const appError = new AppError(
            "RepositoryError",
            "Cannot create a Tweet",
            "There was an issue creating a Tweet Please try again later.",
            500
        );

        const spy = jest.spyOn(Tweet, 'create').mockImplementation(()=>{
            throw appError;
        });

        const tweetRepository = new TweetRepository();

        await expect(tweetRepository.create(mockError)).rejects.toThrow(AppError);
        await expect(tweetRepository.create(mockError)).rejects.toThrow(appError);
        await expect(tweetRepository.create(mockError)).rejects.toThrow("Cannot create a Tweet");
        expect(Tweet.create).toHaveBeenCalledWith(mockError);
    });
});
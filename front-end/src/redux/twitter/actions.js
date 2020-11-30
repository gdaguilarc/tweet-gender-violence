const actions = {
  GET_UNCLASSIFIED_TWEET: 'GET_UNCLASSIFIED_TWEET',
  GET_UNCLASSIFIED_TWEET_SUCCESS: 'GET_UNCLASSIFIED_TWEET_SUCCESS',
  GET_UNCLASSIFIED_TWEET_ERROR: 'GET_UNCLASSIFIED_TWEET_ERROR',
  DB_CLASSIFY_TWEET: 'DB_CLASSIFY_TWEET',
  DB_CLASSIFY_TWEET_SUCCESS: 'DB_CLASSIFY_TWEET_SUCCESS',
  DB_CLASSIFY_TWEET_ERROR: 'DB_CLASSIFY_TWEET_ERROR',

  getUnclassifiedTweet: () => {
    return {
      type: actions.GET_UNCLASSIFIED_TWEET,
    };
  },
  getUnclassifiedTweetSuccess: data => {
    return {
      type: actions.GET_UNCLASSIFIED_TWEET_SUCCESS,
      data,
    };
  },
  getUnclassifiedTweetError: err => {
    return {
      type: actions.GET_UNCLASSIFIED_TWEET_ERROR,
      err,
    };
  },
  dbClassifyTweet: () => {
    return {
      type: actions.DB_CLASSIFY_TWEET,
    };
  },
  dbClassifyTweetSuccess: () => {
    return {
      type: actions.DB_CLASSIFY_TWEET_SUCCESS,
    };
  },
  dbClassifyTweetError: () => {
    return {
      type: actions.DB_CLASSIFY_TWEET_ERROR,
    };
  },
};

export default actions;

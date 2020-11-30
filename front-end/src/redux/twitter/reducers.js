import actions from './actions';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const {
  GET_UNCLASSIFIED_TWEET,
  GET_UNCLASSIFIED_TWEET_SUCCESS,
  GET_UNCLASSIFIED_TWEET_ERROR,
  DB_CLASSIFY_TWEET,
  DB_CLASSIFY_TWEET_SUCCESS,
  DB_CLASSIFY_TWEET_ERROR,
} = actions;

const tweetsReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  console.log(type);

  switch (type) {
    case GET_UNCLASSIFIED_TWEET:
      return {
        ...initialState,
        loading: true,
      };
    case GET_UNCLASSIFIED_TWEET_SUCCESS:
      console.log('PERREO', data);
      return {
        ...initialState,
        data,
        loading: false,
      };
    case GET_UNCLASSIFIED_TWEET_ERROR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    case DB_CLASSIFY_TWEET:
      return {
        ...initialState,
        loading: true,
      };
    case DB_CLASSIFY_TWEET_SUCCESS:
      return {
        ...initialState,
        loading: false,
      };
    case DB_CLASSIFY_TWEET_ERROR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default tweetsReducer;

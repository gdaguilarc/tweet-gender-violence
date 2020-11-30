import actions from './actions';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const {
  getUnclassifiedTweet,
  getUnclassifiedTweetSuccess,
  getUnclassifiedTweetError,
  dbClassifyTweet,
  dbClassifyTweetSuccess,
  dbClassifyTweetError,
} = actions;

const unclassifiedTweet = () => {
  return async dispatch => {
    try {
      dispatch(getUnclassifiedTweet());
      const response = await axios.get(API_ENDPOINT + '/tweets/getTweet');
      const data = response.data.data[0];
      data['WORD'] = response.data['WORD'];
      dispatch(getUnclassifiedTweetSuccess(response.data.data[0]));
    } catch (err) {
      dispatch(getUnclassifiedTweetError(err));
    }
  };
};

const classifyTweet = newTweet => {
  return async (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();

    try {
      dispatch(dbClassifyTweet());

      await db
        .collection('classified')
        .doc(uuidv4())
        .set({
          ...newTweet,
        });

      dispatch(dbClassifyTweetSuccess());
    } catch (err) {
      dispatch(dbClassifyTweetError(err));
    }
  };
};

export { unclassifiedTweet, classifyTweet };

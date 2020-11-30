import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import { headerSearchReducer } from './headerSearch/reducers';
import chartContentReducer from './chartContent/reducers';
import tweetsReducer from './twitter/reducers';

import { fsCrudReducer, fsSingleCrudReducer } from './firebase/firestore/reducers';
import firebaseAuth from './firebase/auth/reducers';

const rootReducers = combineReducers({
  fb: firebaseReducer,
  fs: firestoreReducer,
  headerSearchData: headerSearchReducer,
  auth: authReducer,
  ChangeLayoutMode,
  crud: fsCrudReducer,
  singleCrud: fsSingleCrudReducer,
  chartContent: chartContentReducer,
  tweet: tweetsReducer,
  firebaseAuth,
});

export default rootReducers;

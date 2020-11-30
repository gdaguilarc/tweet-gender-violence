import React, { useState } from 'react';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, NavAuth, UserDropDwon } from './auth-info-style';
import Message from './message';
import Notification from './notification';
import Settings from './settings';
import Support from './support';
import { Popover } from '../../popup/popup';
import { Dropdown } from '../../dropdown/dropdown';
import { logOut } from '../../../redux/authentication/actionCreator';
import { fbAuthLogout } from '../../../redux/firebase/auth/actionCreator';
import Heading from '../../heading/heading';

const AuthInfo = () => {
  const dispatch = useDispatch();
  const { isLogout } = useSelector(state => {
    return {
      isLogout: state.fb.auth.uid,
    };
  });

  const [state, setState] = useState({
    flag: 'english',
  });
  const { flag } = state;

  const SignOut = e => {
    e.preventDefault();
    dispatch(fbAuthLogout());
  };

  if (!isLogout) dispatch(logOut());

  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <Link onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Sign Out
        </Link>
      </div>
    </UserDropDwon>
  );

  return (
    <InfoWraper>
      <Support />
      <div className="nav-author">
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="head-example">
            <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
          </Link>
        </Popover>
      </div>
    </InfoWraper>
  );
};

export default AuthInfo;

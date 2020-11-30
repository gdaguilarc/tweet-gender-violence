import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import versions from '../demoData/changelog.json';

const { SubMenu } = Menu;

const MenuItems = ({ darkMode, toggleCollapsed, topMenu, events }) => {
  const { path } = useRouteMatch();

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const { onRtlChange, onLtrChange, modeChangeDark, modeChangeLight, modeChangeTopNav, modeChangeSideNav } = events;
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );
  const onOpenChange = keys => {
    setOpenKeys([keys.length && keys[keys.length - 1]]);
  };
  const onClick = item => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };
  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      <Menu.Item icon={!topMenu && <FeatherIcon icon="home" />} key="home">
        <NavLink onClick={toggleCollapsed} to={`${path}`}>
          Dashboard
        </NavLink>
      </Menu.Item>

      <Menu.Item icon={!topMenu && <FeatherIcon icon="tag" />} key="classify">
        <NavLink onClick={toggleCollapsed} to={`${path}/classify`}>
          Classify
        </NavLink>
      </Menu.Item>

      <Menu.Item icon={!topMenu && <FeatherIcon icon="share-2" />} key="predict">
        <NavLink onClick={toggleCollapsed} to={`${path}/predict`}>
          Predict
        </NavLink>
      </Menu.Item>

      <Menu.Item icon={!topMenu && <FeatherIcon icon="paperclip" />} key="documents">
        <NavLink onClick={toggleCollapsed} to={`${path}/documentation`}>
          Documents
          <span className="badge badge-success menuItem">New</span>
        </NavLink>
      </Menu.Item>

      <Menu.Item icon={!topMenu && <FeatherIcon icon="activity" />} key="changelog">
        <NavLink onClick={toggleCollapsed} to={`${path}/changelog`}>
          Changelog
          <span className="badge badge-primary menuItem">{versions[0].version}</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item icon={!topMenu && <FeatherIcon icon="clock" />} key="comingSoon">
        <NavLink onClick={toggleCollapsed} to={`${path}/comingSoon`}>
          Coming Soon
        </NavLink>
      </Menu.Item>
    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
  events: propTypes.object,
};

export default MenuItems;

/**
 * Date of Creation: Feb, 2020
 * Description : This file defines hamburger menu with toggle option.
 *  Its function is to toggle a menu or navigation bar between being
 *  collapsed behind the button or displayed on the screen. A combination
 *  of Icon and Name has been used with nested properties. Once a user clicks
 *  on Hamburger panel, a drawer will open with details and link to the page referred.
 *
 * @flow
 */
import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import { imagesPath } from '../../utils/imagePath';
import styles from './styles.scss';

interface Props {
  menuListOptions: Object;
  openHamburger: boolean;
  closeHamburger: ()=>{};
  getMenuList: ()=>{};
}

const keyGenerator = () => Math.floor(Math.random() * Math.floor(10000));

const Hamburger = (props: Props) => {
  const {
    openHamburger, menuListOptions, getMenuList, closeHamburger
  } = props;
  const [state, setState] = useState({ left: false });
  const [open, setOpen] = useState(openHamburger);

  useEffect(() => {
    getMenuList();
  }, []);

  useEffect(() => {
    setState({ ...state, left: openHamburger });
  }, [openHamburger]);

  const history = useHistory();

  const toggleDrawer = (side, isOpen) => (event) => {
    event.preventDefault();
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    closeHamburger();
    setState({ ...state, [side]: isOpen });
  };

  const changeRoute = (link) => {
    setState({ ...state, left: false });
    history.push(link);
  };

  const sideList = () => {
    const handleClick = (event) => {
      event.preventDefault();
      setOpen(!open);
    };

    const listItems = (key, menuList, listNested) => {
      const listName = menuList[key].name;
      const listPath = menuList[key].path;
      let listIndividualItems;

      if (listNested) {
        listIndividualItems = (
          <Fragment key={`${keyGenerator()}`}>
            <ListItem
              button
              key={`${keyGenerator()}`}
              onClick={handleClick}
              className={styles.hambergerExpandedMenuItems}
              selected={menuList[key].active}
              classes={{
                selected: styles.hambergerExpandedMenuItemsSelected
              }}
            >
              <ListItemIcon
                key={`${keyGenerator()}`}
                classes={{
                  root: styles.hambergerExpandedMenuIcon
                }}
              >
                <img src={listPath.src} alt={listPath.alt} />
              </ListItemIcon>
              <ListItemText
                key={`${keyGenerator()}`}
                primary={listName}
                classes={{
                  root: styles.hambergerExpandedMenuItemText,
                  primary: styles.menuItemTextPrimary
                }}
              />
              {open
                ? <ExpandLess key={`${keyGenerator()}`} />
                : <ExpandMore key={`${keyGenerator()}`} />}
            </ListItem>
            {Object.keys(listNested).map((childitem, childkey) => (
              <Collapse key={`${keyGenerator()}`} in={open} timeout="auto">
                <List key={`${keyGenerator()}`} component="div" disablePadding>
                  {listItems(childkey, listNested)}
                </List>
              </Collapse>
            ))}
          </Fragment>
        );
      } else {
        listIndividualItems = (
          <ListItem
            button
            key={`${keyGenerator()}`}
            className={styles.hambergerExpandedMenuItems}
            onClick={(e) => {
              e.preventDefault();
              changeRoute(menuList[key].link);
            }}
            selected={menuList[key].active}
            classes={{
              selected: styles.hambergerExpandedMenuItemsSelected
            }}
          >
            <ListItemIcon
              key={`${keyGenerator()}`}
              classes={{
                root: styles.hambergerExpandedMenuIcon
              }}
            >
              <img src={listPath.src} alt={listPath.alt} />
            </ListItemIcon>
            <ListItemText
              key={`${keyGenerator()}`}
              primary={listName}
              classes={{
                root: styles.hambergerExpandedMenuItemText,
                primary: styles.menuItemTextPrimary
              }}
            />
          </ListItem>
        );
      }
      return listIndividualItems;
    };
    return (
      <div
        className={styles.hambergerExpandedContainer}
        role="presentation"
      >
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={(
            <ListSubheader
              classes={{ root: styles.listSubheader }}
              component="div"
              id="nested-list-subheader"
            >
              <Avatar
                classes={{ root: styles.listSubheaderAvatar }}
                src={imagesPath.nikeLogoWhite.src}
                alt={imagesPath.nikeLogoWhite.alt}
              />
            </ListSubheader>
                  )}
          classes={{ root: styles.hambergerExpendedMenu }}
        >
          <Divider className={styles.verticalDivider} />
          {Object
            .keys(menuListOptions)
            .map((item, key) => listItems(key, menuListOptions, menuListOptions[key].nested))}
        </List>
      </div>
    );
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className={`${styles.hambergerCollaspedContainer} border-right`}
        onClick={toggleDrawer('left', true)}
        onKeyPress={() => false}
      >
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          classes={{
            root: styles.hambergerCollapsedMenu
          }}
        >
          {Object.keys(menuListOptions).map((item, key) => (
            <ListItem
              button
              key={`${keyGenerator()}`}
              className={styles.hambergerCollapsedMenuItems}
              selected={menuListOptions[key].active}
              classes={{
                selected: styles.hambergerCollapsedMenuItemsSelected
              }}
            >
              <ListItemIcon
                key={`${keyGenerator()}`}
                classes={{
                  root: styles.hambergerCollapsedMenuIcon
                }}
              >
                <img src={menuListOptions[key].path.src} alt={menuListOptions[key].path.alt} />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </div>
      <Divider orientation="vertical" flexItem className={styles.verticalDivider} />
      <Drawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        className={`ncss-row ${styles.drawerContainer}`}
        PaperProps={{
          className: `ncss-col-sm-2 ${styles.drawerPaperClass}`
        }}
      >
        {sideList()}
      </Drawer>
    </>
  );
};

Hamburger.propTypes = {
  menuListOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  openHamburger: PropTypes.bool.isRequired,
  closeHamburger: PropTypes.func.isRequired,
  getMenuList: PropTypes.func.isRequired
};

export default Hamburger;

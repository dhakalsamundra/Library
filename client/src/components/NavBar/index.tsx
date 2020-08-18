import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GoogleLogout } from 'react-google-login'

import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Badge from '@material-ui/core/Badge'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { searchBook, userSignOut } from '../../redux/actions/'
import UserHome from '../UserHome'
import Cart from '../BookCart'
import useStyles from './style'
import { AppState } from '../../types'

export default function NavBar() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const cartItems = useSelector((state: AppState) => state.book.inCart)

  const [toggleMenu, setToggleMenu] = useState(false)

  const [cartCount, setCartCount] = useState(0)
  useEffect(() => {
    setCartCount(cartItems.length)
  }, [cartItems])

  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const handleNewSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch(searchBook)
  }
  const changePageToUserBooks = () => {
    history.push('/userBooks')
  }

  // I will dispatch action to seachCountries from here using useDispatch

  const responseLogout = () => {
    try {
      dispatch(userSignOut())
      localStorage.removeItem('signIn-token')
        history.push('/')
    } catch (error) {
      alert('Logout failed')
    }
  }
  
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Library 
          </Typography>
          <div className={classes.search}>
            <IconButton className={classes.searchIcon} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              autoComplete="off"
              placeholder="Search…"
              onChange={handleNewSearchChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <IconButton
            aria-label="Account Circle"
            className={classes.grow}
            onClick={changePageToUserBooks}
          >
            <Badge badgeContent={cartCount} color="primary">
              <AccountCircleIcon />
            </Badge>
          </IconButton>
          {toggleMenu ? (
            <div className="cart-list" aria-label="selected items">
              <Cart />
            </div>
          ) : (
            <div></div>
          )}
          <Typography style={{ marginLeft: 'auto' }}>
            <GoogleLogout
              clientId="803700323785-2sld48q8at5i7v2rhj4s57d9gc294j42.apps.googleusercontent.com"
              buttonText="LogOut"
              // on googlelogout onsuccess is not the correct one, it will showa the runtime error.onLogoutSuccess is the right one.
              onLogoutSuccess={responseLogout}
              onFailure={responseLogout}
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <UserHome />
      </main>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

import { searchBook } from '../../redux/actions/'
import Cart from '../BookCart'
import useStyles from './style'
import { AppState } from '../../types'

export default function NavBar() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const cartItems = useSelector((state: AppState) => state.book.inCart)

  const [toggleMenu, setToggleMenu] = useState(false)
  const menuToggle = () => {
    setToggleMenu((prevTog) => !prevTog)
  }

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

  // I will dispatch action to seachCountries from here using useDispatch

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
            aria-label="shopping Cart"
            className={classes.grow}
            onClick={menuToggle}
          >
            <Badge badgeContent={cartCount} color="primary">
              <AddShoppingCartIcon />
            </Badge>
          </IconButton>
          {toggleMenu ? (
            <div className="cart-list" aria-label="selected items">
              <Cart />
            </div>
          ) : (
            <div></div>
          )}
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
    </div>
  )
}

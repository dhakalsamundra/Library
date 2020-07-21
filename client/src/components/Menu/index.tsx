import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { GoogleLogout } from 'react-google-login'

import AddBook from '../AddBook'
import AddAuthor from '../AddAuthor'
import BookTable from '../BookTable'
import AuthorTable from '../AuthorTable'
import { userSignOut } from '../../redux/actions/user'
import { searchBook } from '../../redux/actions/book'
import useStyles from './style'
import { AppState } from '../../types'
import { Button } from '@material-ui/core'

export default function PersistentDrawerLeft() {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const searchedBook = useSelector((state: AppState) => state.book.items)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const dispatch = useDispatch()
  const history = useHistory()

  const responseLogout = () => {
    try {
      dispatch(userSignOut())
      localStorage.removeItem('signInToken')
      history.push('/')
    } catch (error) {
      alert('Logout failed')
    }
  }

  const handleNewSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch(searchBook)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
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
          <Typography variant="h6" noWrap>
            Library
          </Typography>
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
          <h3>Admin</h3>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <div></div>}
          </IconButton>
        </div>
        <Divider />
        <List>
          <AddBook />
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <BookTable />
      </main>
    </div>
  )
}

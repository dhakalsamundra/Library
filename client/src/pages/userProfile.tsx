import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom'

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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { Button } from '@material-ui/core'

import {UserProfilePayload, StorageToken} from '../types'
import UpdateProfile from '../components/UpdateProfile'
import useStyles from './style'


export default function Userprofile() {
    const classes = useStyles()
    const history = useHistory()
    const theme = useTheme()

    const initialState: UserProfilePayload = {
        firstName: '',
        lastName: '',
        email: '',
        picture: '',
        userName: '',
        role: '',
        id: ''
        }
    const [user, setUser] = useState(initialState)
    const [open, setOpen] = React.useState(false)
        useEffect(() => {
            if (localStorage.signInToken) {
              const token = localStorage.signInToken
              const decodedToken = jwt_decode<StorageToken>(token)
              setUser(decodedToken)
            }
          }, [])
          const handleDrawerOpen = () => {
            setOpen(true)
          }
          const handleDrawerClose = () => {
            setOpen(false)
          }
          const changePageToHome = () => {
            history.push('/home')
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
            <Typography style={{ marginLeft: 'auto' }}>
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
        <Button
            variant="contained"
            color="secondary"
            onClick={changePageToHome}
        >
                Home
        </Button>
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div className={classes.user}>
            <div>
                <p>FirstName:</p>
                {user.firstName}
            </div>
            <div>
                <p>LastName:</p>
                {user.lastName}
            </div>
            <div>
                <p>Email:</p>
                {user.email}
            </div>
            <div>
                <p>UserName:</p>
                {user.userName}
            </div>
            <div>
                <img src={user.picture} alt="user profile" />
            </div>
            <div>
                <p>Role:</p>
                {user.role}
            </div>
        </div>
        <UpdateProfile />
        </main>
        </div>
    )
}
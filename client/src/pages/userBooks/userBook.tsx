import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

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
import { Button, TableCell, TableRow, TableBody, TableHead, Table } from '@material-ui/core'


import { unBorrowBookThunk} from '../../redux/actions'
import {fetchBorrowedBookThunk } from '../../redux/actions'
import { AppState } from '../../types'
import useStyles from './style'

export default function PersistentDrawerLeft() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const items = useSelector((state: AppState) => state.book.inCart)

 useEffect(() => {
   dispatch(fetchBorrowedBookThunk())
 }, [dispatch])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }


  const changePageToHome = () => {
    history.push('/dashboard')
  }

  const handleUnBorrowChange = (id: string) => {
    const item = items.find((book) => book._id === id)
    if (item) {
        dispatch(unBorrowBookThunk(item))
      } 
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
            List of Borrowed Books
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

        <Table>
      <TableHead className="book">
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>ISBN</TableCell>
          <TableCell>Publisher</TableCell>
          <TableCell>Genres</TableCell>
        </TableRow>
      </TableHead>
      {items.map((book) => (
        <TableBody key={book._id}>
          <TableRow>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.ISBN}</TableCell>
            <TableCell>{book.publisher}</TableCell>
            <TableCell>{book.genres}</TableCell>
            <TableCell>
        <Button size="small" variant="contained" color="primary" onClick={() => handleUnBorrowChange(book._id)}>
          UnBorrow
        </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
    </Table>      </main>
    </div>
  )
}

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { auth } from './config';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
    const [isAuth,setIsAuth] = React.useState(false)
    const [user,setUser] = React.useState(null)
    function registerwithgoogle(){
        const provide = new GoogleAuthProvider()
        signInWithPopup(auth,provide).then(res=>{
            console.log(res.user);
            setIsAuth(true)
            setUser(res.user)
        }).catch(err=>{
            console.log(err);
        })
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
       
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to={'/'}>
            News
            </Link>
          </Typography>
        

          {!isAuth ?         <Button color="error" variant='outlined' onClick={registerwithgoogle}>Login</Button> :
          <>
          <Avatar src={user.photoURL}  alt={'user'}/>
          &nbsp;
          <Link to={'/add'}>
            <Button variant='contained' color='success'>Add Video</Button>
          </Link>
          </>
          }
  
        </Toolbar>
      </AppBar>
    </Box>
  );
}
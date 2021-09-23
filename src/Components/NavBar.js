import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory, Link ,withRouter} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function  NavBar() {
  const classes = useStyles();
  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClearStorage = () => {
    if (sessionStorage.token) {
      sessionStorage.removeItem("token");
      history.push("/signin")
    }
  };
  const loginlogout=()=>{
    return sessionStorage.token ? (
        <>

        <Button onClick={handleClearStorage} color="inherit">Logout</Button>

        </>
      ) : (
        <Button onClick="/signin" color="inherit">Login</Button>

      );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
            {loginlogout()}
        </Toolbar>
      </AppBar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
        <Link style={{textDecoration:'none',color:'#000'}} to="/addstall">
          Add Stall
        </Link>
        </MenuItem>
        <MenuItem>
        <Link style={{textDecoration:'none',color:'#000'}} to="/additems">
          Add Items
        </Link>
        </MenuItem>
        <MenuItem>
        <Link style={{textDecoration:'none',color:'#000'}} to="/check">
          Check Inventory
        </Link>
        </MenuItem>
        <MenuItem>
        <Link style={{textDecoration:'none',color:'#000'}} to="/returns">
          Add Returns
        </Link>
        </MenuItem>
        <MenuItem>
        <Link style={{textDecoration:'none',color:'#000'}} to="/loss">
          Check Loss
        </Link>
        </MenuItem>
        <MenuItem>
        <Link style={{textDecoration:'none',color:'#000'}} to="/requests">
          Requests
        </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}

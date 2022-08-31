import { AppBar, Grid, IconButton, Toolbar, Typography, Drawer, ListItem, ListItemIcon, ListItemText, Link } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { LogoutOutlined, StorefrontOutlined, GroupOutlined, WarehouseOutlined } from '@mui/icons-material';
import { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { startLogout } from '../../store/auth/thunk';

const data = [
  {
    name: "Warehouse",
    icon: <WarehouseOutlined />,
    route: '/warehouse',
  },
  { name: "Stores", 
    icon: <StorefrontOutlined />,
    route: '/store'
  },
  { name: "Workers", 
    icon: <GroupOutlined />,
    route: '/worker'
  },
];


export const Navbar = ({drawerWith = 240}) => {

  const { displayName } = useSelector( state => state.auth );

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
    {data.map((item, index) => (
        <ListItem button key={index}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <Link component={RouterLink} color='inherit' to={item.route}>
          <ListItemText>{item.name}</ListItemText>
        </Link>
        </ListItem>
    ))}
    </div>
);

const onHandleLogout = (e) => {
  e.preventDefault();
  dispatch( startLogout() );
}


  return (
    <AppBar
      position='fixed'
      sx={{
        ml: { sm: `${drawerWith}px`}
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          edge='start'
          sx={{ mr: 2}}
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
            {getList()}
        </Drawer>
        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='h5'noWrap component='div'>CRM { displayName }</Typography>
          <IconButton
            onClick={onHandleLogout} 
            color='error'
          >
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

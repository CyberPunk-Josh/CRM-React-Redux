import { Box, Toolbar } from '@mui/material'
import React from 'react' 
import { Navbar } from '../components/Navbar'

const drawerWith = 240;

export const AdminLayout = ({children}) => {
  return (
    <Box sx={{ display: 'flex' }} >
        <Navbar drawerWith={drawerWith} />
        <Box component='main' sx={{flexGrow:1, p:3}}>
            <Toolbar />
            {children}
        </Box>
    </Box>
  )
}

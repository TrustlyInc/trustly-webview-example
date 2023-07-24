import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function HeaderBar() {
    return (
        <AppBar position='static' style={{backgroundColor: '#003140'}}>
        <Toolbar>
          <Typography variant='h5'>
            Trustly Demo App
          </Typography>
        </Toolbar>
      </AppBar>
    )
}
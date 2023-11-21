import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href={'/'}  className='text-[#fff] cursor-pointer' >
            <Typography variant="h5">My Album</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
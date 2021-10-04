import React from 'react';
import { Stack } from '@mui/material';

import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import { BannerData } from '../components/BannerData';
import Category from '../components/Category';
import RecipeHome from '../components/RecipeHome';


function Home () {
  return (
    <div style={{ backgroundColor: '#F9FAF9' }}>
      <Navbar />
      <Stack
        pt={20}
        spacing={5}
      >
        <Banner bannerdata={BannerData} style={{ backgroundColor:'red' }}/>
        <Category />
        <RecipeHome />
      </Stack>
    </div>
  )
}

export default Home;
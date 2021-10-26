import React, { useState } from "react";
import { Stack } from "@mui/material";

import Navbar from "../components/Navbar";
import MyProfilePicture from "../components/MyProfile/MyProfilePicture";
import DashboardOption from "../components/MyProfile/DashboardOption";
import OrderDashboard from "../components/MyProfile/OrderDashboard";
import RecipeDashboard from "../components/MyProfile/RecipeDashboard";

function MyProfile() {
  const [option, setOption] = useState('ORDERS');

  const handleOption = (event, newOption) => {
    setOption(newOption);
  }

  return (
    <div>
      <Navbar />
      <Stack
        p={10}
        spacing={5}
        sx={{ backgroundColor:'#F9FAF9' }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <Stack
            alignItems="center"
            sx={{ width:'25%' }}
            pt={15}
            spacing={5}
          >
            <MyProfilePicture />
            <DashboardOption value={option} callback={handleOption}/>
          </Stack>
          <Stack
            alignItems="center"
            sx={{ width:'75%' }}
            pt={15}
          >
            {option === 'ORDERS' && <OrderDashboard />}
            {option === 'RECIPES' && <RecipeDashboard />}
            {option === 'PRODUCTS' && <RecipeDashboard />}
          </Stack>
        </Stack>
      </Stack>
    </div>
  )
}

export default MyProfile;
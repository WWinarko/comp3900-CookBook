import React, { useState } from "react";
import { Stack } from "@mui/material";

import Navbar from "../components/Navbar";
import MyProfilePicture from "../components/MyProfile/MyProfilePicture";
import DashboardOption from "../components/MyProfile/DashboardOption";
import OrderDashboard from "../components/MyProfile/OrderDashboard";
import RecipeDashboard from "../components/MyProfile/RecipeDashboard";

function MyProfile() {
  const [option, setOption] = useState('ORDERS');
  const [admin, setAdmin] = useState(false);

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/admin/check', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      },
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setAdmin(res.admin);
        })
      }
    })
  }, [])

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
            <DashboardOption value={option} callback={handleOption} admin={admin}/>
          </Stack>
          <Stack
            alignItems="center"
            sx={{ width:'75%' }}
            pt={15}
          >
            {option === 'ORDERS' && <OrderDashboard admin={admin}/>}
            {option === 'RECIPES' && <RecipeDashboard />}
            {option === 'PRODUCTS' && <RecipeDashboard />}
          </Stack>
        </Stack>
      </Stack>
    </div>
  )
}

export default MyProfile;
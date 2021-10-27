import React from "react";

import { Stack } from "@mui/material";
import Navbar from "../components/Navbar";
import UserInfo from "../components/User/UserInfo";
import MostPopular from "../components/User/MostPopular";
import UserRecipe from "../components/User/UserRecipe";

function User() {
  return (
    <div>
      <Navbar />
      <Stack
        p={10}
        sx={{ backgroundColor:'#F9FAF9' }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing = {5}
          sx={{ width: '100%' }}
        >
          <UserInfo />
          <MostPopular />
          <UserRecipe />
        </Stack>
      </Stack>
    </div>
  )
}

export default User;
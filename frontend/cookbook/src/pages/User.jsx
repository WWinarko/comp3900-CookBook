import React, { useState } from "react";
import { useLocation } from 'react-router-dom';

import { CircularProgress, Stack } from "@mui/material";
import Navbar from "../components/Navbar";
import UserInfo from "../components/User/UserInfo";
import MostPopular from "../components/User/MostPopular";
import UserRecipe from "../components/User/UserRecipe";

function User() {
  const [loadingState, setLoadingState] = useState(true);
  const location = useLocation();
  const id = (location.pathname.split('/')).pop();
  const [user, setUser] = useState({});
  const [recipes, setRecipes] = useState([]);

  React.useEffect(() => {
    if (id === undefined) {
      return;
    }
    fetch('http://127.0.0.1:5000/profile/view?user_id=' + id, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setUser(res);
          setRecipes(res.user_recipes_string);
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  }, [])

  return (
    <div>
      <Navbar />
      {loadingState
        ? <div style={{ height: '100vh', backgroundColor: '#F9FAF9', paddingTop: '150px', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        : <Stack
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
              <UserInfo user={user} />
              <MostPopular user={user} />
              <UserRecipe allRecipes={recipes} />
            </Stack>
          </Stack>
      }
    </div>
  )
}

export default User;
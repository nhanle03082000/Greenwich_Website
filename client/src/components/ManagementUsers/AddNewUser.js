import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";

import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Grid,
  Box,
  Input,
  InputLabel,
  FormHelperText,
  Divider,
  Tooltip,
  alertTitleClasses,
} from "@mui/material";

const AddNewUser = () => {
  // const [role, setRole] = React.useState("");
  // const [AccoutForm, setAccountForm] = React.useState({
  //   username: makeUserName(10)
  // })

  // const handleChange = (event) => {
  //   setRole(event.target.value);
  // };
  // function makeUserName(length) {
  //   var result = 'GREENWICH_';
  //   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   var charactersLength = characters.length;
  //   for (var i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() *
  //       charactersLength));
  //   }
  //   return result;
  // }

  // const { username } = AccoutForm
  const { addNewUser } = useContext(AuthContext);

  const [userForm, setuserForm] = useState({
    course: "",
    username: makeUserName(10),
    password: "",
    macAddress: "",
    uniqueId: "",
  });
  const navigate = useNavigate();
  const { course, username, password, macAddress, uniqueId, status, image } =
    userForm;
  const onChangeUserForm = (event) =>
    setuserForm({ ...userForm, [event.target.name]: event.target.value });
  function makeUserName(length) {
    var result = "USER_";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const newUserData = await addNewUser(userForm);
      console.log("new-data", newUserData);
      if ((newUserData.message = "Registration successfull")) {
        return navigate("/home");
      } else {
        alert("ADD không thành công");
      }
    } catch (error) {
      alert("Mac address or Unique Id already exists");
    }
  };
  return (
    <>
      <Box>
        <Typography>Add New Users</Typography>
      </Box>
      <Box component={Paper} elevation={12} padding={2}>
        <form onSubmit={onSubmit}>
          <Box display={"block"}>
            <Box display={"flex"} sx={{ width: "100%" }} alignItems="center">
              <Box mr={2} sx={{ width: "20%" }}>
                <Typography>Username:</Typography>
              </Box>
              <Box sx={{ width: "80%" }}>
                <TextField
                  value={username}
                  onChange={onChangeUserForm}
                  name="username"
                  fullWidth
                  disabled
                  // placeholder="name category"
                />
              </Box>
            </Box>
          </Box>

          <Box display={"block"}>
            <Box display={"flex"} sx={{ width: "100%" }} alignItems="center">
              <Box mr={2} sx={{ width: "20%" }}>
                <Typography>Course:</Typography>
              </Box>
              <Box sx={{ width: "80%" }}>
                <TextField
                  value={course}
                  onChange={onChangeUserForm}
                  name="course"
                  fullWidth
                  // placeholder="name category"
                />
              </Box>
            </Box>
          </Box>
          <Box display={"block"}>
            <Box display={"flex"} sx={{ width: "100%" }} alignItems="center">
              <Box mr={2} sx={{ width: "20%" }}>
                <Typography>Password:</Typography>
              </Box>
              <Box sx={{ width: "80%" }}>
                <TextField
                  value={password}
                  onChange={onChangeUserForm}
                  name="password"
                  fullWidth
                  edge="end"
                  type="password"

                  // placeholder="course"
                />
              </Box>
            </Box>
          </Box>
          <Box display={"block"}>
            <Box display={"flex"} sx={{ width: "100%" }} alignItems="center">
              <Box mr={2} sx={{ width: "20%" }}>
                <Typography>Mac Address:</Typography>
              </Box>
              <Box sx={{ width: "80%" }}>
                <TextField
                  value={macAddress}
                  onChange={onChangeUserForm}
                  name="macAddress"
                  fullWidth
                  // placeholder="course"
                />
              </Box>
            </Box>
          </Box>
          <Box display={"block"}>
            <Box display={"flex"} sx={{ width: "100%" }} alignItems="center">
              <Box mr={2} sx={{ width: "20%" }}>
                <Typography>Unique Id:</Typography>
              </Box>
              <Box sx={{ width: "80%" }}>
                <TextField
                  value={uniqueId}
                  onChange={onChangeUserForm}
                  name="uniqueId"
                  fullWidth
                  // placeholder="course"
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ textAlign: "-webkit-center" }} mt={1}>
            <Box
              display={"flex"}
              alignItems="center"
              width={"50%"}
              justifyContent="space-between"
            >
              <Box>
                <Button
                  sx={{ background: "green" }}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
              <Box>
                <Button
                  sx={{ background: "red" }}
                  variant="contained"
                  onClick={() => navigate("/home")}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddNewUser;

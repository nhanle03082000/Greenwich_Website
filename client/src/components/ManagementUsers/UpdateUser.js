import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";

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
import { AuthContext } from "../../contexts/AuthContext";

const UpdateUser = () => {
  const {
    authState: { Users, user },
    updatePass,
    getUserId,
    updateUser,
  } = useContext(AuthContext);
  const params = useParams();

  React.useEffect(() => getUserId(params._id), []);
  console.log("params: ", params);
  console.log("user: ", user);

  const [userForm, setuserForm] = React.useState({
    course: user.course,
    username: user.username,
    macAddress: user.macAddress,
    uniqueId: user.uniqueId,
  });
  const { course, username, macAddress, uniqueId } = userForm;
  const onChangeUserForm = (event) =>
    setuserForm({ ...userForm, [event.target.name]: event.target.value });

  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const dataUpdate = await updateUser(params._id, userForm);
      console.log("new-data", dataUpdate.data.status);
      if (dataUpdate.data.status === true) {
        return navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
                  onClick={() => navigate("/home/management-attendance")}
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

export default UpdateUser;

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
  NativeSelect,
} from "@mui/material";
import * as React from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Paper from "@mui/material/Paper";

const UpdatePass = () => {
  const {
    authState: { Users, user },
    updatePass,
    getUserId,
  } = useContext(AuthContext);
  const params = useParams();

  React.useEffect(() => getUserId(params._id), []);
  console.log("params: ", params);

  const [userForm, setuserForm] = React.useState({
    new_password: "",
    confirm_password: "",
  });
  const { new_password, confirm_password } = userForm;
  const onChangeUserForm = (event) =>
    setuserForm({ ...userForm, [event.target.name]: event.target.value });
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(params._id);
      const newUserData = await updatePass(params._id, userForm);
      console.log("new-data", newUserData);
      if (newUserData) {
        return navigate("/home");
      } else {
        alert("ADD không thành công");
      }
    } catch (error) {
      console.log(error.message);
      alert("Confirm password does not matched");
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <Box>
        <Typography>Change Password</Typography>
      </Box>
      <Box component={Paper} elevation={12} padding={2}>
        <form onSubmit={onSubmit}>
          <Box display={"block"}>
            <Box display={"flex"} sx={{ width: "100%" }} alignItems="center">
              <Box mr={2} sx={{ width: "20%" }}>
                <Typography>New Password:</Typography>
              </Box>
              <Box sx={{ width: "80%" }}>
                <TextField
                  value={new_password}
                  onChange={onChangeUserForm}
                  name="new_password"
                  fullWidth
                  type="password"
                  // placeholder="name category"
                />
              </Box>
            </Box>
          </Box>
          <Box display={"block"}>
            <Box display={"flex"} sx={{ width: "100%" }} alignItems="center">
              <Box mr={2} sx={{ width: "20%" }}>
                <Typography>Confirm Password:</Typography>
              </Box>
              <Box sx={{ width: "80%" }}>
                <TextField
                  type="password"
                  value={confirm_password}
                  onChange={onChangeUserForm}
                  name="confirm_password"
                  fullWidth
                  // placeholder="name category"
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

export default UpdatePass;

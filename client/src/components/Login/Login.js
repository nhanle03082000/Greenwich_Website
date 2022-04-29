import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Avatar,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Button,
  Box,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { InputLabel } from "@mui/material";

import { AuthContext } from "../../contexts/AuthContext";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const {
    authState: { user },
  } = useContext(AuthContext);
  // React.useEffect(() => loadUser(), [])
  console.log("user", user);

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();
    try {
      const LoginData = await loginUser(loginForm);
      console.log("data login:", LoginData.data.status);
      if (LoginData.data.status === "admin") {
        return navigate("/home");
      } else {
        return alert("username or password incorrect!");
      }
    } catch (error) {
      return alert("Username or Password incorrect!");
    }
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <>
      <form onSubmit={login}>
        <Grid>
          <Paper elevation={10} style={stylePaper}>
            <Grid align="center">
              <Avatar>
                <FaceIcon />
              </Avatar>
              <h1>Log In</h1>
              <h4>Enter your username and password to Log-in</h4>
            </Grid>
            <Divider orientation="horizontal" />
            <Grid style={{ marginTop: "20px" }}>
              <TextField
                required
                label="User Name"
                name="username"
                fullWidth
                placeholder="Your username..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon style={{ color: "black" }} />
                    </InputAdornment>
                  ),
                }}
                value={username}
                onChange={onChangeLoginForm}
              />
            </Grid>
            <FormControl
              required
              sx={{ mt: 2, width: "100%" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                type={values.showPassword ? "text" : "password"}
                name="password"
                onChange={onChangeLoginForm}
                placeholder="Your password"
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon style={{ color: "black" }} />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                value={password}
              />
            </FormControl>
            <Grid display={"flex"} sx={{ mt: 5, mb: 5, alignItems: "center" }}>
              <Box style={{ width: "50%", textAlign: "center" }}>
                <Link
                  style={{ textDecoration: "none", color: "blue" }}
                  to={"/"}
                >
                  Forgot Password
                </Link>
              </Box>
              <Box style={{ width: "50%", textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  style={{ height: "50px", width: "100%" }}
                >
                  Login
                </Button>
              </Box>
            </Grid>
          </Paper>
        </Grid>
      </form>
    </>
  );
}
export default Login;
const stylePaper = {
  padding: 20,
  width: 480,
  margin: "50px auto",
};

import {
  Box,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
    const navigate = useNavigate()
  return (
    <Grid
      sx={{
        width: "80%",
        height: 600,
        margin: "50px auto",
        borderRadius: 15,
        textAlign: "center",
      }}
    >
      <h1> Update Profile</h1>
      <Box
        display={"flex"}
        sx={{
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "15%", marginLeft: 10, textAlign: "left" }}>
          <h3>Username:</h3>
        </Box>
        <Box sx={{ width: "60%" }}>
          <TextField sx={{ background: "white" }} fullWidth size="small" />
        </Box>
      </Box>
      <Box
        display={"flex"}
        sx={{
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "15%", marginLeft: 10, textAlign: "left" }}>
          <h3>Email:</h3>
        </Box>
        <Box sx={{ width: "20%", textAlign: "left" }}>
          <Typography sx={{ background: "white" }} fullWidth size="small" />{" "}
          testemail@gmail.com
        </Box>
      </Box>
      <Box
        display={"flex"}
        sx={{
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "15%", marginLeft: 10, textAlign: "left" }}>
          <h3>Password:</h3>
        </Box>
        <Box sx={{ width: "60%" }}>
          <TextField
            sx={{ background: "white" }}
            fullWidth
            size="small"
            type={"password"}
          />
        </Box>
      </Box>
      <Grid sx={{ textAlign: "center" }}>
        <Box
          display={"flex"}
          sx={{
            mt: 5,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Button
              variant="contained"
              color="success"
              sx={{
                ml: 9,
                height: 50,
                width: 120,
              }}
            >
              Update
            </Button>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Button
              variant="contained"
              color="error"
              sx={{
                height: 50,
                width: 120,
              }}
              onClick={() => navigate('/home/settingprofiles')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UpdateProfile;

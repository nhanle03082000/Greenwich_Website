import React from "react";
//import Typography from '@mui/material/Typography';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Box, Divider } from "@mui/material";
import Link from "@mui/material/Link";

const MyBreadcrumbs = (props) => {
  return (
    <div role="presentation">
      <Box marginTop={-1} marginBottom={0}>
        <Breadcrumbs aria-label="breadcrumb">
          {/* <Link underline="hover" color="inherit" href='/home' sx={{ fontSize: 20, fontWeight: 600 }}>
                        HOME
                    </Link> */}
        </Breadcrumbs>
      </Box>
      <Divider />
    </div>
  );
};

export default MyBreadcrumbs;

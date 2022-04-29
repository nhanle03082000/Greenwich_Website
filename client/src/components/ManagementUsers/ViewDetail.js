import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Avatar, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LockResetIcon from "@mui/icons-material/LockReset";
//context
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
let check = 1;
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const ViewDetail = () => {
  const {
    authState: { Users, datatime, title, timeloading },
    getAllUser,
    deleteUser,
    getTime,
    getUserId,
  } = useContext(AuthContext);
  const params = useParams();
  console.log("lsHisTitles: ", title);
  console.log("datatime: ", datatime);

  useEffect(() => getAllUser(), []);
  useEffect(() => getTime(params._id), []);
  //   console.log("params: ", params);

  const [timeChekin, settimeChekin] = useState();
  const [timeChekout, settimeChekout] = useState();
  //   console.log("time check in:", time);
  //   console.log("lsHisTitles check in:", lsHisTitles);

  useEffect(() => {
    async function getTimeUser() {
      if (!timeloading && check == 1) {
        for (let i = 0; i < title.length; i++) {
          const dataTime = datatime[title[i]];
          console.log("Array " + i, dataTime);

          settimeChekin(dataTime[0].time);
          settimeChekout(dataTime[1].time);
          console.log("1f", dataTime[0].time);
          console.log("2f", dataTime[1].time);
          const datavao = dataTime[0];
          console.log("datavao", datavao.time);

          const datara = dataTime[1];
          console.log("datara", datara.time);

          // console.log("time- check in", dataTime[0].time);
          // settimeChekout(dataTime[1].time);
          // console.log("time- check out", dataTime[1].time);
        }
        check = 0;
      } else {
        return null;
        // const dataTime = time[lsHisTitles[0]];
        // const dataTime1 = time[lsHisTitles[1]];
        // console.log("Array0", dataTime);
        // console.log("Array1", dataTime1);
        // const datavao = await dataTime[1];
        // settimeChekin(datavao.time);
        // console.log("time", timeChekin);
        // const datara = await dataTime[1];
        // settimeChekout(datara.time);
        // console.log("datavao", datavao.time);
        // console.log("datara", datara.time);
      }
    }
    getTimeUser();
  });
  // console.log("his title:", history.titles);
  // console.log("his data:", history.data[history.titles]);

  // const dataTime = time[lsHisTitles];
  // console.log("Array0", dataTime);
  // const datavao = dataTime[0];
  // const datara = dataTime[1];
  // console.log("datavao", datavao.time);
  // console.log("datara", datara.time);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const [result, setResult] = useState([]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - title.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const removeUser = async (_id, userName) => {
    if (removeUser) {
      alert("You delete " + userName);
      const message = await deleteUser(_id);
      getAllUser();
    }
    console.log("remove");
  };
  const navigate = useNavigate();
  // useEffect(() => {
  //   async function loginExample() {
  //     try {
  //       const requestUrl = "http://localhost:4000/information/getAlltime";
  //       const response = await axios.get(requestUrl);
  //       if (response) {
  //         const result = response.data.data;
  //         console.log("data chưa map ", result);
  //         const lsHisTitle = [];
  //         Object.keys(result).forEach((key) => {
  //           lsHisTitle.push(key);
  //         });
  //         console.log("titles:", lsHisTitle, "data:", result);

  //         setHistory({ data: result, titles: lsHisTitle });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   loginExample();
  // }, []);

  return (
    <Box>
      <Box>
        <Box>
          <Typography variant="h4">Users Management</Typography>
        </Box>
        <Box display={"flex"} alignItems="center">
          <IconButton onClick={() => navigate("/home/register-user")}>
            <Tooltip title="Add new user">
              <AddCircleIcon fontSize="large" />
            </Tooltip>
          </IconButton>
          <Typography>Add User</Typography>
        </Box>
      </Box>

      <TableContainer component={Paper} elevation={12}>
        <Table sx={{}} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="left">User Name</TableCell>
              <TableCell align="left">Course</TableCell>
              <TableCell align="center">Macc Address</TableCell>
              <TableCell align="center"> Unique ID</TableCell>
              <TableCell align="center"> Day</TableCell>
              <TableCell align="center"> Check In</TableCell>
              <TableCell align="center"> Check Out</TableCell>

              {/* <TableCell align="center">Status</TableCell> */}
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? title.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : title
            ).map((item) => (
              <TableRow key={item.time}>
                {/* <TableCell align="left">{data.username}</TableCell>
                <TableCell align="left">{data.course}</TableCell>
                <TableCell align="center">{data.uniqueId}</TableCell>

                <TableCell align="center">{data.macAddress}</TableCell> */}

                <TableCell align="center">{item}</TableCell>
                <TableCell align="center">{timeChekin}</TableCell>

                {/* <TableCell align="center">{history.titles}</TableCell>

                <TableCell align="center">{history.titles}</TableCell>
                {datavao ? (
                  <TableCell align="center">{datavao}</TableCell>
                ) : null} */}
                {/* {history.data.map((data) =>
                  !history.data.titles ? null : (
                    <TableCell align="center">{data.time}</TableCell>
                  )
                )} */}
                {/* <TableCell align="center">
                  {data.status === "0" ? (
                    <Typography sx={{ color: "green" }}>Check In</Typography>
                  ) : (
                    <Typography color={{ color: "red" }}>Check Out</Typography>
                  )}
                </TableCell> */}
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={Users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default ViewDetail;

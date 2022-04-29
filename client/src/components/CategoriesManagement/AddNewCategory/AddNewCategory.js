import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
  FormControl,
  NativeSelect,
} from "@mui/material";
import { DepartmentContext } from "../../../contexts/DepartmentContext";
import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import { CategoryContext } from "../../../contexts/CategoryContext";

const AddNewCategory = () => {
  const {
    departSate: { departments },
    getAllDepartments,
  } = useContext(DepartmentContext);
  const { addNewCate } = useContext(CategoryContext);
  React.useEffect(() => getAllDepartments(), []);
  const [CateForm, setCateForm] = useState({
    name_category: "",
    name_depart: "",
    start_day: "",
    end_day: "",
  });

  const [date, changeDate] = useState(new Date());

  const navigate = useNavigate();

  //React.useEffect(() => addNewDepartment(), [])

  const { name_category, name_depart, start_day, end_day } = CateForm;

  const onChangeCateForm = (event) =>
    setCateForm({ ...CateForm, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const NewCateData = await addNewCate(CateForm);
      console.log("new-data", NewCateData);
      if (NewCateData) {
        return navigate("/home/categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box>
        <Typography>Add new department</Typography>
      </Box>
      <Box component={Paper} elevation={12} padding={2}>
        <form onSubmit={onSubmit}>
          <Box display={"block"}>
            <Box display={"flex"} sx={{ width: "100%" }} alignItems="center">
              <Box mr={2} sx={{ width: "20%" }}>
                <Typography>Name:</Typography>
              </Box>
              <Box sx={{ width: "80%" }}>
                <TextField
                  value={name_category}
                  onChange={onChangeCateForm}
                  name="name_category"
                  fullWidth
                  placeholder="name category"
                />
              </Box>
            </Box>
            <Box display={"flex"} sx={{ width: "100%" }} alignItems="center">
              <Box mr={2} sx={{ width: "20%" }}>
                <Typography>Department:</Typography>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <NativeSelect
                    onChange={onChangeCateForm}
                    value={name_depart}
                    name="name_depart"
                  >
                    <option>None</option>
                    {departments.map((data) => (
                      <option key={data._id}>{data.name_department}</option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Box>
            </Box>
            <Box display={"flex"} sx={{ width: "100%" }} alignItems="center">
              <Box mr={2} sx={{ width: "20%" }}>
                <Typography>Start Day:</Typography>
              </Box>
              <Box sx={{ width: "80%" }} mt={1}>
                <TextareaAutosize
                  value={start_day}
                  onChange={onChangeCateForm}
                  name="start_day"
                  placeholder="start_day"
                  style={{ width: "100%", fontSize: 17 }}
                  minRows={3}
                />
              </Box>
            </Box>
            <Box display={"flex"} sx={{ width: "100%" }} alignItems="center">
              <Box mr={2} sx={{ width: "20%" }}>
                <Typography>End Day:</Typography>
              </Box>
              <Box sx={{ width: "80%" }} mt={1}>
                <TextareaAutosize
                  value={end_day}
                  onChange={onChangeCateForm}
                  name="end_day"
                  placeholder="end_day"
                  style={{ width: "100%", fontSize: 17 }}
                  minRows={3}
                />
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
                  <Button sx={{ background: "red" }} variant="contained">
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddNewCategory;

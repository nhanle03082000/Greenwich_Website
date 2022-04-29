import React, { useContext, useState } from 'react'
import { Box, Button, TextareaAutosize, TextField, Typography, FormControl, NativeSelect, InputLabel } from '@mui/material'
import { AuthContext } from '../../../contexts/AuthContext';
import { DepartmentContext } from '../../../contexts/DepartmentContext';
import { useNavigate, useParams } from 'react-router-dom';

import Paper from '@mui/material/Paper';


const UpdateDepart = () => {
    const { authState: { Users }, getAllUser } = useContext(AuthContext)
    const { departSate: { one_department, departmentsLoading }, update_Department, getDepartmentById } = useContext(DepartmentContext)
    React.useEffect(() => { console.log("select", one_department) }, [])
    React.useEffect(() => getDepartmentById(params._id), [])

    React.useEffect(() => getAllUser(), [])
    const [departForm, setDepartmentForm] = useState({
        name_department: one_department.name_department,
        description: '',
        email: '',
    })
    const params = useParams()
    const navigate = useNavigate()
    const { name_department, description, email } = departForm

    const onChangeDepartmentForm = (event) =>
        setDepartmentForm({ ...departForm, [event.target.name]: event.target.value })

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!email) {
                return alert("Owner ko dc rong")
            }
            const NewDepartmentData = await update_Department(params._id, departForm);
            console.log("new-data", NewDepartmentData)
            if (NewDepartmentData) {
                return navigate('/home/departments')
            }
            // // } else if (NewDepartmentData.name_department.message) {
            // //     return alert("Error Name department")
            // // } else if (NewDepartmentData.description.message) {
            // //     return alert("Description Required")
            // // } else if (NewDepartmentData.owner.message) {
            // //     return alert("Owner Required")
            // // }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <Box>
                <Typography>Update department</Typography>
            </Box>
            <Box component={Paper} elevation={12} padding={2}>

                <form onSubmit={onSubmit} >
                    <Box display={'block'}>
                        <Box display={'flex'} sx={{ width: '100%' }} alignItems='center'>
                            <Box mr={2} sx={{ width: '20%' }} >
                                <Typography>Name:</Typography>
                            </Box>
                            <Box sx={{ width: '80%' }} >
                                <TextField

                                    // defaultValue={name_department}
                                    value={name_department}
                                    onChange={onChangeDepartmentForm}
                                    name='name_department'
                                    fullWidth
                                    placeholder='name department' />
                            </Box>
                        </Box>
                        <Box display={'flex'} sx={{ width: '100%' }} alignItems='center'>
                            <Box mr={2} sx={{ width: '20%' }}  >
                                <Typography>Description:</Typography>
                            </Box>
                            <Box sx={{ width: '80%' }} mt={1}>
                                <TextareaAutosize
                                    value={description}
                                    onChange={onChangeDepartmentForm}
                                    name='description'
                                    placeholder='description'
                                    style={{ width: '100%', fontSize: 17 }}
                                    minRows={3} />
                            </Box>
                        </Box>
                        <Box display={'flex'} sx={{ width: '100%' }} alignItems='center'>
                            <Box mr={2} sx={{ width: '20%' }}  >
                                <Typography>Owner:</Typography>
                            </Box>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <NativeSelect
                                        // defaultValue={one_department.email}
                                        onChange={onChangeDepartmentForm}
                                        value={email}
                                        name='email'
                                    >
                                        {Users.map((data) => (
                                            <option key={data._id}>{data.email}</option>

                                        ))}

                                    </NativeSelect>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{ textAlign: '-webkit-center' }} mt={1}>
                            <Box display={'flex'} alignItems='center' width={'50%'} justifyContent='space-between'>
                                <Box>
                                    <Button sx={{ background: 'green' }} variant='contained' type="submit">Save</Button>
                                </Box>
                                <Box>
                                    <Button sx={{ background: 'red' }} variant='contained' onClick={() => navigate('/home/departments')} >Cancel</Button>
                                </Box>
                            </Box>
                        </Box>

                    </Box>
                </form>

            </Box>

        </>
    )
}

export default UpdateDepart
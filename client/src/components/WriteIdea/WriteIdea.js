import { Button, FormControl, Select, MenuItem, Typography, Grid, Box, Input, InputLabel, FormHelperText, Divider, Tooltip } from '@mui/material'
import React, { useState, useContext } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import { DepartmentContext } from '../../contexts/DepartmentContext';
import { CategoryContext } from '../../contexts/CategoryContext';
import { BlogContext } from '../../contexts/BlogContext';
import { AuthContext } from '../../contexts/AuthContext';


const WriteIdea = () => {
    const { departSate: { departments }, getAllDepartments } = useContext(DepartmentContext)
    React.useEffect(() => getAllDepartments(), [])

    const { cateSate: { categories }, getAllCategories } = useContext(CategoryContext)
    React.useEffect(() => getAllCategories(), [])

    const { BlogState: { blogs }, addNewBlog } = useContext(BlogContext)







    const [ideaForm, setIdeaForm] = useState({
        department: '',
        category: '',
        content: '',
        image: ''

    })






    const [anonymous, setAnonymous] = useState(false)
    const [termAgree, setTermAgree] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState(false)

    const changeStateAnonymous = () => {
        setAnonymous(!anonymous)
    }
    const changeStateTerm = () => {
        setTermAgree(!termAgree)
        if (!termAgree) {
            alert("You agreed term")
            setDisabled(!disabled)
        } else {
            setDisabled(true)
        }

    }
    const onChangeIdeaForm = (event) => {
        setIdeaForm({ ...ideaForm, [event.target.name]: event.target.value })
    }
    const onChangeImageForm = (event) => {
        setIdeaForm({ ...ideaForm, image: event.target.files[0] })
    }



    const DataSubmit = () => {
        const formData = new FormData();
        formData.append('department', ideaForm.department);
        formData.append('category', ideaForm.category);
        formData.append('content', ideaForm.content);
        formData.append('image', ideaForm.image);


        console.log("data submit", ideaForm)

        const DataIdea = addNewBlog(formData)
        console.log("after submit", DataIdea)
        navigate('/home/view-ideas')
        // if (!ideaForm.category) {
        //     alert("You need to select name of your category")

        // }
        // if (!ideaForm.department) {
        //     alert("You need to select name of your department")

        // } if (ideaForm.file.substring(ideaForm.file.length - 3, ideaForm.file.length) === 'exe') {
        //     alert("files is not accept")

        // }
    }


    const navigate = useNavigate()
    return (
        <>

            <Box sx={{ textAlign: '-webkit-center' }} >
                <Box component={Paper} elevation={12} width="60%" border={2} sx={{ mt: 5, borderRadius: 4, p: 2 }} display={"block"} >
                    <Grid display={'flex'} sx={{ alignItems: 'center', mb: 5, paddingLeft: 3, justifyContent: 'space-between' }}>
                        <Box display={'flex'} >
                            <Typography variant='h6' fontWeight={800}>Department:</Typography>
                        </Box>
                        <FormControl sx={{ width: '30%' }}>
                            <Select
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                onChange={onChangeIdeaForm}
                                value={ideaForm.department}
                                name="department">
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {departments.map((data) => (
                                    <MenuItem key={data._id} value={data._id}>{data.name_department}</MenuItem>
                                ))}
                            </Select>
                            {!ideaForm.department ? <FormHelperText fontSize={10}> Please select category</FormHelperText> : null}
                        </FormControl>
                        <Box display={'flex'} >
                            <Typography variant='h6' fontWeight={800}>Category:</Typography>
                        </Box>
                        <FormControl sx={{ width: '30%' }}>
                            <Select
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                onChange={onChangeIdeaForm}
                                value={ideaForm.category}
                                name="category">

                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {categories.map((data) => (
                                    <MenuItem key={data._id} value={data._id}>{data.name_category}</MenuItem>
                                ))}
                            </Select>
                            {!ideaForm.category ? <FormHelperText fontSize={10}> Please select category</FormHelperText> : null}
                        </FormControl>
                    </Grid>
                    <Grid display={'flex'} sx={{ mb: 5, alignItems: 'center', paddingLeft: 3, justifyContent: 'space-between' }}>
                        <Box display={'flex'} >
                            <Typography variant='h6' fontWeight={800}>Content:</Typography>
                        </Box>
                        <FormControl sx={{ width: '80%' }}>
                            <TextareaAutosize
                                placeholder='Content'
                                style={{ fontSize: 18 }}
                                onChange={onChangeIdeaForm}
                                value={ideaForm.content}
                                name="content"
                                minRows={3}
                            />
                        </FormControl>
                    </Grid>
                    <Grid display={'flex'} sx={{ mb: 2, alignItems: 'center', paddingLeft: 3 }}>
                        <Box display={'flex'} >
                            <Typography variant='h6' mr={4} fontWeight={800}>Upload file:</Typography>
                        </Box>
                        <Input onChange={onChangeImageForm} type="file" />

                        {/* {ideaForm.image.substring(ideaForm.image.length - 3, ideaForm.image.length) === 'exe' ? <FormHelperText>Not accept files .exe</FormHelperText> : null} */}
                    </Grid>
                    <Grid display={'flex'} sx={{ alignItems: 'center', paddingLeft: 3, justifyContent: 'space-between' }}>
                        <Box>
                            <Checkbox checked={termAgree} onClick={() => changeStateTerm()} /> <Link to={'/'}> Terms Agree</Link>
                        </Box>
                        <Box display={"flex"} alignItems="center">

                            <Checkbox checked={anonymous} onClick={() => changeStateAnonymous()} /> <Typography>Anonymous</Typography>
                        </Box>

                    </Grid>
                    <Divider />

                    <Grid display={'flex'} sx={{ mt: 2, alignItems: 'center', paddingLeft: 3, justifyContent: 'space-between' }}>

                        <Button disabled={disabled} onClick={() => DataSubmit()} sx={{ background: 'green' }} variant='contained' size='large'>
                            Submit
                        </Button>

                        <Button sx={{ background: 'red' }} variant='contained' size='large'>
                            Cancel
                        </Button>
                    </Grid>
                </Box>
            </Box>


        </>
    )
}

export default WriteIdea
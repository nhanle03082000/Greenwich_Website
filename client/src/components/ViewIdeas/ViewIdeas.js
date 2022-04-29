import { Paper, Grid, Avatar, Divider, Box, TextareaAutosize, IconButton, Button, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'

import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Link } from 'react-router-dom';

import { BlogContext } from '../../contexts/BlogContext';
import { CommentContext } from '../../contexts/CommentContext';

const ViewIdeas = () => {

    const [valueThum_Up, setValueThumpUp] = useState(0)
    const [valueThum_Down, setValueThumpDown] = useState(0)
    const [stateThumUp, setStateThumUp] = useState(false)
    const [stateThumDown, setStateThumDown] = useState(false)
    const [openInput, setOpenInput] = useState('none')

    const [comment, setComment] = useState('')

    const onChangeComment = (event) => {
        setComment(event.target.value)
    }

    //view all ideas
    const { BlogState: { blogs }, getAllBlogs } = useContext(BlogContext)
    React.useEffect(() => getAllBlogs(), [])

    const { CommentState: { comments }, addNewComment } = useContext(CommentContext)



    const changeValueThumpUp = () => {
        if (changeValueThumpUp) {
            setValueThumpUp(valueThum_Up + 1)
            setStateThumUp(!stateThumUp)
            setStateThumDown(false)
            setValueThumpDown(valueThum_Down - 1)
            if (valueThum_Down <= 0) {
                setValueThumpDown(0)
            }
            if (stateThumUp && changeValueThumpUp) { setValueThumpUp(valueThum_Up - 1) }
        }

    }
    const changeValueThumpDown = () => {
        if (changeValueThumpDown) {
            setValueThumpDown(valueThum_Down + 1)
            setStateThumDown(!stateThumDown)
            //console.log('value thumpup', valueThum_Up)
            setStateThumUp(false)
            setValueThumpUp(valueThum_Up - 1)
            if (valueThum_Up <= 0) {
                setValueThumpUp(0)
            }
            if (stateThumDown && changeValueThumpDown) { setValueThumpDown(valueThum_Down - 1) }

        }
    }

    const showInputComment = () => {
        setOpenInput("initial")
    }
    const loseInputComment = () => {
        setOpenInput('none')
    }
    console.log("state up", stateThumUp, "state down", stateThumDown, "value up ", valueThum_Up, 'value down', valueThum_Down)

    const SubmitComment = (id) => {
        const response = addNewComment(comment, id)
        console.log('comment response', response)

    }

    return (
        <>
            {blogs.map((data) => (
                <Box key={data._id}>
                    <Paper elevation={8} sx={{ width: '95%', margin: "0px auto", height: 'auto', padding: 2, marginTop: 1 }}   >
                        <Grid display={'flex'}  >
                            <Avatar />
                            <Grid display={'block'}  >
                                <Typography variant='h6'>{data.creator.email}</Typography>
                            </Grid>
                            <Grid marginLeft={'auto'} display={'flex'}>
                                <Typography variant='h6' marginRight={5} >
                                    Dep:
                                    {data.department_details.name_department}
                                </Typography>
                                <Typography variant='h6' >
                                    Cate:
                                    {data.category_details.name_category}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{ mb: 1 }} />
                        <Box >
                            <TextareaAutosize
                                maxRows={2}
                                minRows={2}
                                defaultValue={data.content}
                                disabled
                                style={{ width: "100%", fontSize: 20, border: 0, background: 'white', color: 'black', p: 1 }} />
                        </Box>
                        <br />
                        <Box textAlign='center'>
                            <img style={{ width: '500px', height: '500px' }} src={data.image_url} />
                        </Box>
                        <Divider />
                        <Box textAlign='-webkit-center'  >
                            <Grid display={"flex"} justifyContent='space-between' marginTop={1} mb={-1}>
                                <Box display={"flex"} width={'40%'} justifyContent='space-between' >
                                    <Box alignItems={'center'} display={"flex"}>
                                        <IconButton onClick={() => changeValueThumpUp()}>
                                            {!stateThumUp ? <ThumbUpIcon fontSize='large' /> : <ThumbUpIcon fontSize='large' sx={{ color: 'blue' }} />}
                                        </IconButton>
                                        {valueThum_Up < 0 ? <Typography>0</Typography> : <Typography>{valueThum_Up}</Typography>}
                                    </Box>
                                    <Box alignItems={'center'} display={"flex"}>
                                        <IconButton onClick={() => changeValueThumpDown()}>
                                            {!stateThumDown ? <ThumbDownIcon fontSize='large' /> : <ThumbDownIcon sx={{ color: 'blue' }} fontSize='large' />}
                                        </IconButton>
                                        {valueThum_Down < 0 ? <Typography>0</Typography> : <Typography>{valueThum_Down}</Typography>}
                                    </Box>
                                    <Box alignItems={'center'} display={"flex"}>
                                        <CommentIcon fontSize='large' onClick={() => showInputComment()} />
                                        <Typography>{data.comments_count}</Typography>
                                    </Box>
                                </Box>
                                <FileDownloadIcon fontSize='large' />
                            </Grid>

                        </Box>

                        <Box display={openInput}>
                            <Divider />
                            <Box mt={1} mb={1} display='flex'>
                                <Avatar />
                                <Typography ml={1} variant='h5'>Username</Typography>
                            </Box>
                            <Typography variant='h6'> Content component</Typography>
                        </Box>
                        <Box display={openInput} mt={1}>
                            <Divider sx={{ mb: 1 }} />
                            <Typography variant='h5'>Your comment</Typography>
                            <TextField
                                style={{ width: '100%', fontSize: 18 }}
                                // minRows={3}
                                onChange={onChangeComment}
                                value={comment}
                            />

                            <Box display={"flex"} sx={{ mt: 1 }}>
                                <Box>
                                    <Button sx={{ mr: 5 }} onClick={() => SubmitComment(data._id)} variant='contained'>Submit</Button>
                                    <Button onClick={() => loseInputComment()} variant='contained'>Cancel</Button>
                                </Box>
                            </Box>
                        </Box>

                    </Paper>

                </Box >
            ))}
        </>
    )
}
export default ViewIdeas
import * as React from 'react'
import { Button, Grid, Input } from '@mui/material';
import Axios from 'axios'
import { DataGrid, selectedGridRowsCountSelector } from '@mui/x-data-grid';
import uuid from 'react-uuid'
import {Link, useParams} from 'react-router-dom'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { PirChart } from './PieChart';

export default function ViewIndividualAttendance() {

    const [student, setStudent] = React.useState()
    const [attendance, setAttendance] = React.useState()
    const [count, setCount] = React.useState()
    const [dialogTitleText, setDialogTitleText] = React.useState()
    const [open, setOpen] = React.useState(false)
    const [openDelete, setOpenDelete] = React.useState(false)
    const [selectedData, setSelectedData] = React.useState()
    const [tempTime, setTempTime] = React.useState('')


    const {id} = useParams()

    const editClicked = (data) => {
        setSelectedData(data)
        setDialogTitleText('Edit '+data.date+' for student '+student.name)
        setTempTime(data.time)
        setOpen(true)
    }
    const deleteClicked = (data) => {
        setSelectedData(data)
        setDialogTitleText('Delete '+data.date+' for student '+student.name)
        setTempTime(data.time)
        setOpenDelete(true)
    }

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'date', headerName: 'Date' },
        { field: 'time', headerName: 'Time' },
        { field: 'present', headerName: 'Attended',
            renderCell: (cellValues) => {
                return(cellValues.row.present === 'Present' ? <span style={{color: 'green'}}>Present</span> : <span style={{color: 'red'}}>Absent</span>)
            }
        },
        {
          field: 'action',
          headerName: 'Action',
          width: 200,
          renderCell: (cellValues) => {
            console.log(cellValues);
            return(
                <div>
                    <Button onClick={() => editClicked(cellValues.row)} ><EditIcon style={{fontSize: '18px'}}/></Button>
                    <Button onClick={() => deleteClicked(cellValues.row)}><DeleteIcon style={{color: 'red', fontSize: '18px'}}/></Button>
                </div>
            )
          }
        },
      ];

    const handleClose = () => {
        setOpen(false)
        setOpenDelete(false)
    }

    const getStudents = () => {
        Axios.get('http://localhost:4000/user/get-student/'+id)
            .then(res => {
                console.log(res)
                if(res.data.success){
                    console.log(res)
                    let data = res.data.data

                    setStudent(data.student)
                    setAttendance(data.attendance)
                    setCount(data.count)
                }
            })
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        getStudents()
    }, [])

    const updateTime = (data, time) => {
        Axios.post('http://localhost:4000/user/update-time', {data: data, time: time, studentId: student.studentId})
            .then(res => {
                if (res.data.success) {
                    getStudents()
                    setSelectedData({})
                    setTempTime('')
                    setOpen(false)
                } else {
                    console.log('error')
                }
            })
            .catch(err => console.log(err))
    }

    const deleteAttendance = (data, id) => {
        Axios.post('http://localhost:4000/user/delete-attendance', {data, id})
            .then(res => {
                if (res.data.success) {
                    getStudents()
                    setSelectedData({})
                    setOpen(false)
                    setTempTime('')
                    setOpenDelete(false)
                } else {
                    console.log('error')
                }
            })
    }
    
    const EditDialogComponent = <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{dialogTitleText}</DialogTitle>
        <div style={{padding: '16px 24px'}}>
        Time: <Input type='text' name='time' value={tempTime} onChange={(e) => setTempTime(e.target.value)} />
        <Button onClick={() => updateTime(selectedData, tempTime)} >Update</Button>
        </div>
    </Dialog>

    const DeleteDialogComponent = <Dialog onClose={handleClose} open={openDelete}>
        <DialogTitle>{dialogTitleText}</DialogTitle>
        <div style={{padding: '16px 24px'}}>
        Type 'Confirm' to delete: <Input type='text' name='time' value={tempTime} onChange={(e) => setTempTime(e.target.value)} />
        <Button disabled={tempTime !== 'Confirm' ? true : false} onClick={() => deleteAttendance(selectedData, student.studentId)} >Delete</Button>
        </div>
    </Dialog>

    console.log(count)
    const studentDetails = 
            <Grid container spacing={0} style={{marginBottom: '30px'}}>
                <Grid item xs={12} style={{height: '30px'}}>
                    <h4>Name: {student?.name}</h4>
                </Grid>
                <Grid item xs={12} style={{height: '30px'}}>
                    <h4>Email: <Link to={'mailto:'+student?.email}>{student?.email}</Link></h4>
                </Grid>
                <Grid item xs={12} style={{height: '30px'}}>
                    <h4>Course: {student?.course}</h4>
                </Grid>
                <Grid item xs={12} style={{height: '30px'}}>
                    <h4>ID: {student?.studentId}</h4>
                </Grid>
            </Grid>
    
    return(
        <div style={{height: '1000px', width: '80%', margin: 'auto'}}>
            {EditDialogComponent}
            {DeleteDialogComponent}

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h3>Results of {student?.name}</h3>
                </Grid>
            </Grid>
            {student ? 
                <div>
                    {studentDetails}
                </div>
            :
            null}
            <Grid container>
                <Grid item xs={6}>
                    {attendance && <DataGrid
                        rows={attendance}
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        style={{width: '550px'}}
                    />}
                </Grid>
                <Grid item xs={6}>
                    {count && <PirChart absent={count[1]} present={count[0]} />}
                </Grid>
            </Grid>
        </div>
    )
}
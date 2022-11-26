import * as React from 'react'
import { Button } from '@mui/material';
import Axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import uuid from 'react-uuid'
import {useParams} from 'react-router-dom'

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'date', headerName: 'Date' },
    { field: 'time', headerName: 'Time' },
    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   renderCell: (cellValues) => {
    //     console.log(cellValues);
    //     return(
    //         <Button>view</Button>
    //     )
    //   }
    // },
  ];


export default function ViewIndividualAttendance() {

    const [student, setStudent] = React.useState()
    const [attendance, setAttendance] = React.useState()
    const {id} = useParams()
    console.log(id);
    React.useEffect(() => {
        Axios.get('http://localhost:4000/user/get-student/'+id)
            .then(res => {
                console.log(res)
                if(res.data.success){
                    console.log(res)
                    let data = res.data.data

                    setStudent(data.student)
                    setAttendance(data.attendance)
                }
            })
            .catch(err => console.log(err))
    }, [])
    console.log(attendance);
    return(
        <div style={{height: '1000px', width: '80%', margin: 'auto'}}>
            {student ? 
            <div>
                <div>
                    Name: {student.name}
                </div>
                <div>
                    Email: {student.email}
                </div>
                <div>
                    Course: {student.course}
                </div>
                <div>
                    Student ID: {student.studentId}
                </div>
            </div>
            :
            null}
            {attendance && <DataGrid
                rows={attendance}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20]}
            />}
        </div>
    )
}
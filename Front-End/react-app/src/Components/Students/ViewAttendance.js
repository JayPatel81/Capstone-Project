import * as React from 'react'
import { Button } from '@mui/material';
import Axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import uuid from 'react-uuid'
import { Link } from 'react-router-dom';

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'studentId', headerName: 'Student ID' },
    { field: 'name', headerName: 'Student Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'course', headerName: 'Course' },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (cellValues) => {
        console.log(cellValues.row.studentId);
        return(
            <Link to={'/view-student/' + cellValues.row.studentId}>
                <Button>view</Button>
            </Link>
        )
      }
    },
  ];


export default function ViewAttendance() {

    const [students, setStudents] = React.useState()

    React.useEffect(() => {
        Axios.get('http://localhost:4000/user/get-students')
            .then(res => {
                console.log(res)
                if(res.data.success){
                    console.log(res)
                    let stu = res.data.students

                    for (let i = 0; i < stu.length; i++) {
                        stu[i]['id'] = i.toString()
                    }
                    console.log(stu);
                    setStudents(stu)
                }
            })
            .catch(err => console.log(err))
    }, [])
    console.log(students)
    return(
        <div style={{height: '1000px', width: '80%', margin: 'auto'}}>
            {students && <DataGrid
                rows={students}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20]}
                checkboxSelection
            />}
        </div>
    )
}
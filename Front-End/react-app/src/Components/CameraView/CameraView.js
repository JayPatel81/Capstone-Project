import { Button, Grid } from '@mui/material'
import Axios from 'axios'
import * as React from 'react'
import { Link } from 'react-router-dom'
import Webcam from 'react-webcam'

export default function CameraView() {

    React.useEffect(() => {
        Axios.get('http://localhost:4000/user/add-attendance')
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    return(
        <div>
            <Grid container>
                <Grid xs='3' ></Grid>
                <Grid xs='6' >
                    {/* <Webcam style={{width: '100%', height: '100%'}} /> */}
                </Grid>
                <Grid xs='3' ></Grid>
            </Grid>
            <Grid container style={{marginTop: '30px'}}>
                <Grid xs='3' ></Grid>
                <Grid xs='6'>
                    <Grid container>
                        <Grid xs="12">
                            <Link to='/student-registration' style={{textDecoration: 'none'}}>
                                <Button variant='outlined' style={{width: '100%', height: '70px', margin: '20px 0'}}>Student Registration</Button>
                            </Link>
                        </Grid>
                        <Grid xs="12">
                            <Link to='/view-attendance' style={{textDecoration: 'none'}}>
                                <Button variant='outlined' style={{width: '100%', height: '70px', margin: '20px 0'}}>View Attendance</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs='3' ></Grid>
            </Grid>
        </div>
    )
}
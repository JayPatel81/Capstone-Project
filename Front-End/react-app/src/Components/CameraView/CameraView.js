import { Button, Grid } from '@mui/material'
import * as React from 'react'
import { Link } from 'react-router-dom'
import Webcam from 'react-webcam'

export default function CameraView() {

    return(
        <div>
            <Grid container>
                <Grid xs='3' ></Grid>
                <Grid xs='6' >
                    <Webcam style={{width: '100%', height: '100%'}} />
                </Grid>
                <Grid xs='3' ></Grid>
            </Grid>
            <Grid container style={{marginTop: '30px'}}>
                <Grid xs='3' ></Grid>
                <Grid xs='6'>
                    <Grid container>
                        <Grid xs="6">
                            <Link to='/student-registration'>
                                <Button variant='outlined' style={{width: '90%', float: 'left'}}>Student Registration</Button>
                            </Link>
                        </Grid>
                        <Grid xs="6">
                            <Link to='/view-attendance'>
                                <Button variant='outlined' style={{width: '90%', float: 'right'}}>View Attendance</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs='3' ></Grid>
            </Grid>
        </div>
    )
}
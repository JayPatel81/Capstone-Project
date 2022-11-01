import * as React from 'react'
import PageTitle from '../SubComponents/PageTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function EnrollStudent() {

    const [previewImage, setPreviewImage] = React.useState()

    const selectFile = (event) => {
        setPreviewImage(URL.createObjectURL(event.target.files[0]))
    }

    const enrollStudent = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        const payload = {
        studentId: data.get('studentid'),
        name: data.get('name'),
        course: data.get('course'),
        email: data.get('emailaddress'),
        photo: data.get('photo')
        }

        console.log(payload);
    }

    return(
        <div>
            <PageTitle title="Enroll Student" />

            <Box component="form" noValidate onSubmit={enrollStudent} sx={{ mt: 3 }} style={{width: '80%', margin: '50px auto 0 auto'}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="Student's Full Name"
                  type="text"
                  id="name"
                  autoComplete="Name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="studentid"
                  label="Student Id"
                  name="studentid"
                  autoComplete="studentid"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="emailaddress"
                  label="Email Address"
                  type="email"
                  id="emailaddress"
                  autoComplete="Email Address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="course"
                  label="Course Name"
                  type="text"
                  id="course"
                  autoComplete="Course Name"
                />
              </Grid>
              <Typography style={{paddingLeft: '16px', paddingTop: '8px'}}>Upload a Photo</Typography>
              <Grid item xs={12} style={{paddingTop: '8px'}}>
                <TextField
                  required
                  name="photo"
                //   label="Course Name"
                  type="file"
                  id="photo"
                  onChange={selectFile}
                //   autoComplete="Course Name"
                />
              </Grid>
              {previewImage && (
                <div>
                    <img className="preview my20" src={previewImage} alt="" style={{width: '550px', height: '100%'}}/>
                </div>
                )}

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enroll
            </Button>
          </Box>
        </div>
    )

}
import { Typography } from '@mui/material'
import * as React from 'react'

export default function PageTitle({title}) {

    const style = {
        fontSize: '28px',
        textAlign: 'center',
        marginTop: '30px',
        fontFamily: 'none',
        letterSpacing: '1px'
    }
    return(
        <Typography variant='h2' style={style}>
            {title}
        </Typography>
    )
}
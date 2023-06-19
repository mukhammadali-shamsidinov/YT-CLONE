import { Typography } from '@mui/material';
import React from 'react'
import { Player } from 'video-react';
const Details = ({detailsItem}) => {
  return (
    <div className='details mt-5'>
        <Player
      playsInline
      poster={detailsItem.poster}
      src={detailsItem.url_video}
    />
    <br />
    <Typography variant='h3'>
        {detailsItem.title}
       
    </Typography>
    <Typography variant='body1' color={'Background'} bgcolor={'green'} sx={{padding:'10px'}}>
    {detailsItem.descr}
    </Typography>
    </div>
  )
}

export default Details
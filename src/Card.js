import { collection, onSnapshot } from '@firebase/firestore'
import { Card, CardMedia, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { db } from './config'

const Cards = ({detailsPage}) => {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        onSnapshot(collection(db,"videos"),(snapshot)=>{
            setPosts(snapshot.docs.map(doc=>({id:doc.id,...doc.data()})))
        })
    },[])
  return (
    <Grid container spacing={2} className='p-3'>
        {posts.length == 0 ? "videos not found" :
        posts.map(item=>(
            <Grid item xs={12} sm={12} md={3} onClick={()=>detailsPage(item)}> 
            <Card>
                <CardMedia  component="img"
        alt="green iguana"
        height="300"
        image={item.poster} />
            </Card>
        </Grid>
        ))
        }
       
     

    </Grid>
  )
}

export default Cards
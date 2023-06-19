
import { addDoc, collection } from '@firebase/firestore'
import { Grid, TextField,Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { db, storage } from './config'
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
import { v4 } from 'uuid'

const Add = () => {
    const {register,handleSubmit,reset} = useForm()
    const [percent,setPercent] = useState(0)
    function addVideo(data){
        console.log(data.video[0].name);

        const storageRef = ref(storage,`videos/${data.video[0].name + v4()}`)

        console.log(storageRef);

        const uploadTask = uploadBytesResumable(storageRef, data.video[0]);

        uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setPercent(progress)
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      addItemFirestore(downloadURL,data)
    });
  }
);
        
    }

    function addItemFirestore(url,data){
        addDoc(collection(db,"videos"),{
            url_video:url,
            title:data.title,
            poster:data.poster,
            descr:data.message
        }).then(()=>{
            console.log('added firestore');
        }).catch(err=>{
            console.log('error');
        })
    }

  return (
    <Grid container>
        <form className='add-form' onSubmit={handleSubmit(addVideo)}>
            <TextField type='file' {...register('video')} />
            <TextField type='text' placeholder='title' {...register("title")} />
            <TextField type='text' placeholder='poster' {...register("poster")} />
            <textarea cols={'30'} rows={'20'} {...register("message")}></textarea>
            <Button variant={'contained'} color="primary" type='submit'>Add new Video</Button>
        </form>
        {percent === 100 ? "success":        <CircularProgress variant="determinate" value={percent} />}

    </Grid>
  )
}

export default Add
import React, { useState } from 'react'
import "./App.css"
import ButtonAppBar from './Navbar'
import { Route, Routes, useNavigate } from 'react-router'
import Add from './Add'
import Search from './Search'
import Cards from './Card'
import Details from './Details'
import "video-react/dist/video-react.css";
const App = () => {
const [detailsItem,setDetailsItem] = useState(null)
const navigate = useNavigate()
  function detailsPage(item){
    console.log(item);
    setDetailsItem(item)
    navigate(`/details/${item.id}`)
  }
  return (
    <div>
      <Routes>
        <Route path='/' element={<>
          <ButtonAppBar />
          <Search />
          <Cards detailsPage={detailsPage} />
        </>  } />
        <Route path='/add' element={<>
        <ButtonAppBar />
        <Add />
        </>}
        />
        <Route path='/details/*' element={
          <>
          <ButtonAppBar />
          <Details detailsItem={detailsItem} />
          </>
        } />
      </Routes>
    
    </div>
  )
}

export default App
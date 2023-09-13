import React from 'react'
import ClipLoader from "react-spinners/ClipLoader"; 

import './Loader.scss'

const Loader = ({allSize, sizeOf}) => {
  return (
    <div className={allSize === true ? "loader all-size" : "loader"} >
      <ClipLoader 
        color="#3C4073" 
        size={sizeOf === undefined ? 84 : sizeOf} 
      />
    </div>
  )
}

export default Loader
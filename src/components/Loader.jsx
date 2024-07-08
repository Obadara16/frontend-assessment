import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = ({loading}) => {
  return (
    <div className={`fixed z-50 inset-0 block overflow-y-auto`}>
      <div className="flex items-center justify-center h-screen  mx-auto">
        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>
        <ClipLoader color="#0e7490" loading={loading} size={50} />
      </div>
    </div>
  )
}

export default Loader
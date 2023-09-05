import React from 'react'
import loading from './loadingSpinner.gif'
const Spinner = () => {

    return (
        <div className='text-center'>
            <img className="my-3" src={loading} alt="loading" style={{height:'36px'}}/>
        </div>
    )

}
export default Spinner

import React, { useState } from 'react'
import './WithLoading.css'

const WithLoading = (WrapperComponent) => {
    const WithLoadingComponent = props => {

        const [isLoading, setIsLoading] = useState(false)

        const handleShowLoading = isLoading => {
            setIsLoading(isLoading)
        }
        return (
            <div className='loading-container'>
                {
                    isLoading &&
                    <div className='loading-content'>
                        <div className='loading-main'>
                            <h4>Loading...</h4>
                            <img src="images/loading.gif" />
                        </div>
                    </div>
                }
                <WrapperComponent {...props} showLoading={handleShowLoading} />
            </div>
        )
    }
    return WithLoadingComponent
}
export default WithLoading;
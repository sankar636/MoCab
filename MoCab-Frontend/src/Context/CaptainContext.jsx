import React, { createContext, useState } from 'react'

export const CaptainDataContext = createContext()

const CaptainContext = ({ children }) => {
    const [driver, setDriver] = useState({
        email: '',
        fullname: {
            firstname: '',
            lastname: ''
        },
        vehicle: {
            color: '',
            plate: '',
            vehicleType: '',
            capacity: ''
        }
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const value = {
        driver,
        setDriver,
        isLoading,
        setIsLoading,
        error,
        setError
    }

    return (
        <div>
            <CaptainDataContext.Provider value={value}>
                {children}
            </CaptainDataContext.Provider>
        </div>
    )
}

export default CaptainContext
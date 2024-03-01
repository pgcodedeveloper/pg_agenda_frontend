import React from 'react'

const MainContent = ({children, props}) => {
    return (
        <main className={`flex min-h-screen flex-col items-center ${props}`}>{children}</main>
    )
}

export default MainContent

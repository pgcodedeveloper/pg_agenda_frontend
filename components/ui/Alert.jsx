import React from 'react'

const Alert = ({alertas}) => {
    return (
        <div className={`mt-3 rounded-md py-2 px-3 text-center ${alertas.tipo === "success" ? 'bg-green-500/90' : 'bg-red-500/90'} text-white text-sm`}>{alertas.mensaje}</div>
    )
}

export default Alert

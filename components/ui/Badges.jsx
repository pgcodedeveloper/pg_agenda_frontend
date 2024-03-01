import React from 'react'

const Badges = ({title,bg_color,text_color}) => {
    return (
        <span 
            className={`text-sm font-bold px-2.5 py-0.5 rounded uppercase ${bg_color} ${text_color}`}
        >{title}</span>
    )
}

export default Badges

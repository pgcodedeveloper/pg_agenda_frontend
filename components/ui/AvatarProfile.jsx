"use client"
import React from 'react'
import Image from 'next/image'
const AvatarProfile = ({props, width, height, logout}) => {
  return (
    <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-md btn-circle avatar">
            <div className="w-8 rounded-full">
                <Image alt={props.alt} src={props.url} width={width} height={height}/>
            </div>
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
                <button
                    onClick={() => logout()}
                >Logout</button>
            </li>
        </ul>
    </div>
  )
}

export default AvatarProfile

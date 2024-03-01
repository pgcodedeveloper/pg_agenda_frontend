"use client"
import React from 'react';
import Link from 'next/link';

const Collapse = ({title,description, links, children, props = ""}) => {
    return (
        <div tabIndex={0} className={`collapse border border-[#0284C7] bg-base-200 ${props}`}>
            <div className="collapse-title text-xl font-bold">
                {title}
            </div>
            <div className="collapse-content"> 
                <p className='mb-4'>{description}</p>
                
                {children}
                <ul className="flex flex-col gap-y-4">
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link legacyBehavior href={link.url}>
                                <a className="text-gray-300 hover:text-gray-400 btn btn-sm btn-primary">
                                    {link.title}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Collapse

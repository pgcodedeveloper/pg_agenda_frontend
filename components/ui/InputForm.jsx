import React from 'react'

const InputForm = ({label,placeholder,icon,id,name, type, onChange, value,classes}) => {
    return (
        <>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    {icon}
                </div>
                <input 
                    name={name} 
                    type={type} 
                    id={id}
                    onChange={onChange}
                    value={value}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${classes || ""}`} 
                    placeholder={placeholder}
                />
            </div>
        </>
    )
}

export default InputForm

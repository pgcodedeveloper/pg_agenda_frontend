import React from 'react'

const SelectForm = ({label,icon,id,name, onChange, value,classes,options}) => {
    return (
        <>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <div className="relative mb-6">
                <select 
                    id={id} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name={name}
                    value={value}
                    onChange={onChange}
                >
                    <option value={""}>Seleccione una opción</option>
                    {options.map(op => (
                        <option key={op.value} value={op.value}>
                            {op.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default SelectForm

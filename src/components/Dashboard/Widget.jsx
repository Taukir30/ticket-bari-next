import React from 'react';

const Widget = ({ title, data, color }) => {
    return (
        <div className={`py-3 px-6 
                ${color === 'blue' && 'bg-blue-100 border-blue-300'} 
                ${color === 'red' && 'bg-red-100 border-red-300'} 
                ${color === 'green' && 'bg-green-100 border-green-300'} 
                ${color === 'violet' && 'bg-violet-100 border-violet-300'} 
                ${color === 'orange' && 'bg-orange-100 border-orange-300'} 
                ${color === 'purple' && 'bg-purple-100 border-purple-300'} 
                ${color === 'yellow' && 'bg-yellow-100 border-yellow-300'} 
                border rounded-md flex flex-col gap-3`}>

            <h2 className={`text-base 
                ${color === 'blue' && 'text-blue-600 '} 
                ${color === 'red' && 'text-red-600 '} 
                ${color === 'green' && 'text-green-600 '} 
                ${color === 'violet' && 'text-violet-600 '} 
                ${color === 'orange' && 'text-orange-600 '} 
                ${color === 'purple' && 'text-purple-600 '} 
                ${color === 'yellow' && 'text-yellow-600 '} 
                font-bold`}>{title}</h2>

            <span className={`text-2xl 
                ${color === 'blue' && ' text-red-700'} 
                ${color === 'red' && ' text-blue-700'} 
                ${color === 'green' && ' text-violet-700'} 
                ${color === 'violet' && 'text-green-700 '} 
                ${color === 'orange' && ' text-purple-700'} 
                ${color === 'purple' && ' text-yellow-700'} 
                ${color === 'yellow' && 'text-orange-700 '}     
            font-bold`}>{data}</span>
        </div>
    );
};

export default Widget;
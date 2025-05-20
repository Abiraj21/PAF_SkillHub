import React from 'react';

function IconInputEmail({ children, placeholder, text, value, onChange }) {
  return (
    <div className='flex justify-left items-center w-full h-10 shadow mt-4'>
      <div className='icon_wrapper flex absolute w-14 justify-center items-center'>
        <span className='text-gray-500 opacity-80 text-xl'>{children}</span>
      </div>
      <input
        type={text}
        placeholder={placeholder}
        className='w-full h-full pl-14'
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default IconInputEmail;

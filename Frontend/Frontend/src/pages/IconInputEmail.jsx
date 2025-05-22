import React from 'react';

function IconInputEmail() {
  return (<div className='flex justify-left items-center w-full h-10 shadow mt-4'>
      <div className='icon_wrapper flex absolute w-14 justify-center items-center'>
        <span className='text-gray-500 opacity-80 text-xl'></span>
      </div>
      <input
        className='w-full h-full pl-14'
      />
    </div>
  );
}

export default IconInputEmail;
import React from 'react'

const Button = (props) => {
  return (
    <button className='bg-indigo-600 text-white font-[Outfit] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-200'>{props.children}</button>
  )
}

export default Button
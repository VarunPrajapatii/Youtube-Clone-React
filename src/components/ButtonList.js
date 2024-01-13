import React from 'react'
import Button from './Button'

const ButtonList = () => {
  return (
    <div className='flex'>
      {/* You can make a list and make map out of it so that need not to repeat this code */}
      <Button name="All"/>
      <Button name="Songs"/>
      <Button name="Gaming"/>
      <Button name="Live"/>
      <Button name="Computer Science"/>
      <Button name="Bodybuilding"/>
      <Button name="News"/>
      <Button name="New to you"/>
    </div>
  )
}

export default ButtonList

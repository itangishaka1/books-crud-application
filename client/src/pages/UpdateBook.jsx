import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateBook = () => {
  const [book, setBook] = useState({
    title: '',
    description: '',
    price: null,
    cover: '',
  })

  const navigate = useNavigate()

  const location = useLocation()
  const bookId = location.pathname.split('/')[2]

  const handleChange = (event) => {
    setBook(prev => ({...prev, [event.target.name] : event.target.value}))
    // console.log(book)
  }

  const handleClick = async (event) => {
    console.log('I am sending: ', book)
    event.preventDefault()
    try {
      await axios.put(`https://react-node-express-mysql-app.herokuapp.com/books/${bookId}`, book)
      navigate('/')
    } catch (error) {
      console.log(error.response)
    }

  }

  return (
    <section className='edit-book'>
      <h1 className="edit-book__title">Update The Book</h1>
      <input type='text' placeholder='title' name='title'   onChange={handleChange}  />
      <input type='text' placeholder='description'  name='description'    onChange={handleChange} />
      <input type='number' placeholder='price' name='price'  onChange={handleChange}  />
      <input type='text' placeholder='cover' name='cover'   onChange={handleChange} />
      <button className="edit-book__btn" onClick={handleClick} >Update</button>
    </section>
  )
}

export default UpdateBook
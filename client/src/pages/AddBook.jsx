import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddBook = () => {
  const [book, setBook] = useState({
    title: '',
    description: '',
    price: null,
    cover: '',
  })

  const navigate = useNavigate()

  const handleChange = (event) => {
    setBook(prev => ({...prev, [event.target.name] : event.target.value}))
    // console.log(book)
  }

  const handleClick = async (event) => {
    console.log('I am sending: ', book)
    event.preventDefault()
    try {
      await axios.post('https://react-node-express-mysql-app.herokuapp.com/books', book)
      navigate('/')
    } catch (error) {
      console.log(error.response)
    }

  }

  return (
    <section className='add-book'>
      <h1 className="add-book__title">Add New Book</h1>
      <input type='text' placeholder='title' name='title'   onChange={handleChange}  />
      <input type='text' placeholder='description'  name='description'    onChange={handleChange} />
      <input type='number' placeholder='price' name='price'  onChange={handleChange}  />
      <input type='text' placeholder='cover' name='cover'   onChange={handleChange} />
      <button className="add-book__btn" onClick={handleClick} >Add</button>
    </section>
  )
}

export default AddBook
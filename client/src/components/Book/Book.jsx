import axios from 'axios'
import { Link } from 'react-router-dom'
import './Book.scss'

const Book = ({ book }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://react-node-express-mysql-app.herokuapp.com/books/${id}`)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <article className='book'>
      {book.cover && (
        <img src={book.cover} alt={book.title} className='book__cover' />
      )}
      <h2 className='book__title'>{book.title}</h2>
      <p className='book__desc'>{book.description}</p>
      <span className='book__price'>{book.price}</span>
      <button
        className='book__btn book__btn--delete'
        onClick={() => handleDelete(book.id)}
      >
        Delete
      </button>
      <button className=' book__btn book__btn--update'>
        <Link to={`/update/${book.id}`}>Update</Link>
      </button>
    </article>
  )
}

export default Book

import { useState, useEffect } from "react"
import axios from 'axios'
import Book from "../components/Book/Book"
import { Link } from "react-router-dom"

const Books = () => {
    const [books, setBooks] = useState([])

    // // 1st method
    // useEffect(()=> {
    //     axios.get('http://localhost:8800/books')
    //          .then(res => {
    //             setBooks(res.data)
    //          })
    //          .catch(err => {
    //             console.log(err)
    //          })
    // }, [])

    /// 2nd method
    useEffect(() => {
        const fetchAllBooks = async () => {
            try{
                const res = await axios.get('http://localhost:8800/books')
                setBooks(res.data)
            }catch(err) {
                console.log(err)
            }
        }
        fetchAllBooks()
    },[])

    if(!books) return <p>Loading....</p>
  return (
    <main> 
        <h1 className="booksList__heading">Abdullah Book Shop</h1>
    <div className="booksList">
        {books.map(book => (
            <Book key={book.id} book={book} />
        ))}
    </div>
    <button className="booksList__btn">
        <Link to='/add'>Add new book</Link>
    </button>
    </main>
  )
}

export default Books
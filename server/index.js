import * as dotenv from 'dotenv'
// dotenv.config({path: '../.env'})
dotenv.config()
/* 
with //! dotenv.config() only, the get this error
node:events:491
      throw er; // Unhandled 'error' event
      ^
Error: Access denied for user ''@'localhost' (using password: YES)
*/
import express from 'express'
import mysql2 from 'mysql2'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8800

let db

if (process.env.JAWSDB_URL) {
  db = mysql2.createConnection(process.env.JAWSDB_URL)
} else {
  // CONNECT OUR BACKEND TO MYSQL DB
  db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '',
  })
}

//! To be able to receive data from the client, use this middleware
app.use(express.json())

/*
! To remove the error: 
Access to XMLHttpRequest at 'http://localhost:8800/books' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
*/
app.use(cors())

app.get('/', (req, res) => {
  res.json('Hello this is the backend')
})

// GET ALL THE BOOKS WE HAVE IN OUR DB
app.get('/books', (req, res) => {
  const q = 'SELECT * FROM books'
  db.query(q, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

//  CREATE A BOOK IN OUR DB
app.post('/books', (req, res) => {
  console.log(req.body)
  const q =
    'INSERT INTO books (`title`, `description`, `cover`, `price`)  VALUES (?)'
  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ]

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json('Book has been created successfully')
  })
})

// UPDATE A BOOK
app.put('/books/:id', (req, res) => {
  const bookId = req.params.id
  const q =
    'UPDATE books SET `title` = ?, `description` = ?, `cover` = ?, `price` = ? WHERE id = ?'

  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ]

  db.query(q, [...values, bookId], (err, data) => {
    if (err) res.json(err)
    return res.json('Book has been updated successfully')
  })
})

// DELETE A BOOK
app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id
  const q = 'DELETE FROM books WHERE id = ?'

  db.query(q, [bookId], (err, data) => {
    if (err) res.json(err)
    return res.json('Book has been deleted successfully')
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

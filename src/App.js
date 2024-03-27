import './App.css';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function App() {
  const [book, setBook] = useState({
    author: '',
    isbn: '',
    price:'',
    title:'',
    year: '',
  
  });
  const [books, setBooks] = useState([]);
  const [bookFormActive, setBookFormActive] = useState(false);
  
  //get data from the data base on the first render/mount.
  useEffect(() => {
    fetch('https://bookstore-34cc0-default-rtdb.europe-west1.firebasedatabase.app/books/.json')
    .then(response => {
      if (response.status !== 200){
        throw new Error('Failed to fetch data from Firebase');
      } else {
        return response.json();
      }
    })
    .then(resData => {
      const id = Object.keys(resData);
      const data = Object.values(resData).map(
        (book, index)=> Object.defineProperty(book, 'id', {value: id[index]})
      )
      setBooks(data|| {});
    })
    .catch(err => console.error('Error fetching data:', err));
  }, []);
  
  const columnDefs = [
    {field: 'author', headerName: 'Author', sortable: true, filter: true},
    {field: 'isbn', headerName: 'Isbn', sortable: true, filter: true},
    {field: 'price', headerName: 'Price', sortable: true, filter: true},
    {field: 'title', headerName: 'Tile', sortable: true, filter: true},
    {field: 'year', headerName: 'Year', sortable: true, filter: true},
    {
      field: 'id',
      headerName: '',
      cellRenderer: (params) => (
        <IconButton
          size="small" 
          color="error"
          onClick={() => deleteBook(params.value)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  
  const bookForm = ()=> {
    setBookFormActive(!bookFormActive);
  }
  const inputHandler = (event) => {
    setBook({...book, [event.target.name]: event.target.value});
  }
  
  const saveBook = () => {
    // sending the data to the database
    fetch('https://bookstore-34cc0-default-rtdb.europe-west1.firebasedatabase.app/books/.json',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
    .then(response => {
      if (response.status !== 200){
        throw new Error('Failed to fetch data from Firebase');
      } else {
        return response.json();
      }
    })
    .then(setBooks([...books, {...book}]))
    .catch(err => console.error('Error saving data:', err));
    
    setBook({
      author: '',
      isbn: '',
      price:'',
      title:'',
      year: '',
    });
  };
  
  const deleteBook = (id) => {
    fetch(`https://bookstore-34cc0-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,{
      method: 'DELETE',
    })
    .then(response => {
      if (response.status !== 200){
        throw new Error('Failed to fetch data from Firebase');
      }
    })
    .then(() => {
      const updatedBooks = books.filter(book => book.id !== id);
      setBooks(updatedBooks);
    })
    .catch(err => console.error('Error deleting data:', err));
  
    console.log('sent');
  }
  
  return (
  <div className="App">
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Bookstore
        </Typography>
       </Toolbar>
     </AppBar>
     
     {bookFormActive?
     <form onSubmit={(event)=>event.preventDefault()}>
     <TextField 
      style={{marginRight: 10}}
      variant="standard" 
      label="Author" 
      name="author" 
      value={book.author} 
      onChange={inputHandler} 
     />
     <TextField 
      variant="standard"
      style={{marginRight: 10}} 
      label="Isbn" 
      name="isbn" 
      value={book.isbn} 
      onChange={inputHandler}
     />
     <TextField 
      style={{marginRight: 10}}
      variant="standard" 
      label="Price" 
      name="price" 
      value={book.price} 
      onChange={inputHandler} 
     />
     <TextField 
      style={{marginRight: 10}}
      variant="standard" 
      label="Title" 
      name="title" 
      value={book.title} 
      onChange={inputHandler} 
     />
     <TextField 
      style={{marginRight: 10}}
      variant="standard" 
      label="Year" 
      name="year" 
      value={book.year} 
      onChange={inputHandler} 
     />
     <br />
     <Button 
       style= {{margin: 10}} 
       startIcon={<SaveIcon />}
       color="primary" 
       variant="outlined" 
       onClick={saveBook}
       type='submit'>
       Save
     </Button>
     <Button 
       style= {{margin: 10}} 
       //startIcon={<SaveIcon />}
       color="primary" 
       variant="outlined" 
       onClick={bookForm}
       type='submit'>
       Close
     </Button>
     </form>
     : 
     <Button 
       style= {{margin: 10}} 
       color="primary" 
       variant="outlined" 
       onClick={bookForm}>
       Add Book
     </Button>
     }
     
     <div className="ag-theme-material" style={{height: 400, width: 1200}}>
           <AgGridReact
              rowData={books}
              columnDefs={columnDefs}
           />
        </div>
  </div>
  );
  }

export default App;


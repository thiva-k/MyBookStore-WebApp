import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Add = () => {

  const [book, setBook]= useState({
    title:'',
    description:'',
    cover:''
  });

  const navigate = useNavigate();
  const [error,setError] = useState(false)

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  console.log(book)

  return (
  <div>
    <div className='form'>
      <h1> Add New Book</h1>
      <input type='text' placeholder='title' name='title' onChange={handleChange}/>
      <input type='text' placeholder='description' name='description' onChange={handleChange} />
      <input type= 'text' placeholder='cover' name='cover' onChange={handleChange}/>
    </div>
    
    <button onClick={handleClick} className='button'>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    
  </div>
  )
}

export default Add
import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState('');

  const submitReview = () => {

    Axios.post(
      'http://localhost:8080/api/insert', 
      {
        movieName: movieName, 
        movieReview: review 
      }
    );
  
    setMovieList([
      ...movieList, 
      {movie_name: movieName, movie_reviews: review}
    ]);
  
  }

  const deleteReview = (movie) => {
    console.log('movieNName: ', movie);
    Axios.delete(`http://localhost:8080/api/delete/${movie}`);
  }

  const updateReview = (movie) => {
    Axios.put('http://localhost:8080/api/update', {
      movieName: movie,
      movieReview: newReview
    });
    setNewReview('');
  }

  useEffect(() => {
    Axios.get('http://localhost:8080/api').then((response) => {
      setMovieList(response.data);
      console.log(movieList);
    })
  }, []);

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <div className="form">
        <label>Movie Name: </label>
        <input type="text" name='movieName' onChange={(e) => { setMovieName(e.target.value) }} />
        <label>Review: </label>
        <input type="text" name='review' onChange={(e) => { setReview(e.target.value) }} />
        <button onClick={submitReview}>Submit</button>
        {movieList.map((val) => {
          return (
            <div className='card'>
              <h1>{val.movie_name}</h1> 
              <p>{val.movie_reviews}</p>
              <button onClick={() => {deleteReview(val.movie_name)}}>Delete</button>
              <input type="text" id='updateInput' onChange={(e) => {
                setNewReview(e.target.value)
              }}/>
              <button onClick={()=>{updateReview(val.movie_name)}}>Update</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;

import React from 'react'
import { useNavigate } from 'react-router-dom';

const ListHeader = ({listName}) => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div className='list-header'>
      <h1>{listName}</h1>
      <div className='button-container'>
        <button className='create'>ADD NEW</button>
        <button className='signout' onClick={signOut}>SIGN OUT</button>
      </div>
    </div>
  )
}

export default ListHeader
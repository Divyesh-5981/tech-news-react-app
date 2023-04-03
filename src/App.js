
import React from 'react'
import Pagination from './Pagination'
import Search from './Search'
import Stories from './Stories'
import { useGlobalContext } from './context'
import './App.css';

const App = () => {

  const name = useGlobalContext();

  return (<>
    <Search />
    <Pagination />
    <Stories />
  </>
  )
}

export default App
import React from 'react'
import { useGlobalContext } from './context'

const Pagination = () => {

    const { page, nbPages, getPreviousPage, getNextPage } = useGlobalContext();

    return (
        <>
            <div className='pagination-btn'>
                <button onClick={() => getPreviousPage()}>PREV</button>
                <p>{page + 1} of {nbPages}</p>
                <button onClick={() => getNextPage()}>NEXT</button>
            </div>
        </>
    )
}

export default Pagination
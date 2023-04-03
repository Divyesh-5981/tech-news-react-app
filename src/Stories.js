import React from 'react'
import { useGlobalContext } from './context'
import SyncLoader from "react-spinners/SyncLoader";


const Stories = () => {

    const { hits, isLoading, removePost } = useGlobalContext();

    const override = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '50px auto',
    };

    if (isLoading) {
        return (<><SyncLoader
            loading={isLoading}
            cssOverride={override}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        </>);
    }

    return (<>
        <div className="stories-div">
            {hits.map((currStory) => {
                const { title, author, objectID, url, num_comments } = currStory;
                return (
                    <div className='card' key={objectID}>
                        <h2>{title}</h2>
                        <p>By <span>{author}</span> | <span>{num_comments}</span> comments</p>
                        <div className='card-button'>
                            <a href={url} target="_blank">Read More</a>
                            <a href="#" onClick={() => removePost(objectID)}>Remove</a>
                        </div>
                    </div>
                )
            })}
        </div>
    </>
    )
}

export default Stories
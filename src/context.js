import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";

let API = "http://hn.algolia.com/api/v1/search?";

// initialState of useReducer
const initialState = {
    isLoading: true,
    query: "CSS",
    nbPages: 0,
    page: 0,
    hits: [],
}

// creation of context
const AppContext = React.createContext();

// need to provider
const AppProvider = ({ children }) => {

    // useReducer Hook
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchApiData = async (url) => {

        dispatch({ type: "SET_LOADING" })

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            dispatch({ type: "GET_STORIES", payload: { hits: data.hits, nbPages: data.nbPages, } });
        }
        catch (error) {
            console.log(error);
        }
    }

    // to remove the post
    const removePost = (post_ID) => {
        dispatch({ type: "REMOVE_POST", payload: post_ID });
    }

    // search post
    const searchPost = (searchQuery) => {
        dispatch({ type: "SEARCH_POST", payload: searchQuery });
    }

    // pagination
    const getPreviousPage = () => {
        dispatch({ type: "PREV_PAGE" });
    }

    const getNextPage = () => {
        dispatch({ type: "NEXT_PAGE" });
    }

    useEffect(() => {
        fetchApiData(`${API}query=${state.query}&page=${state.page}`);
    }, [state.query, state.page]);

    return (<AppContext.Provider value={{ ...state, removePost, searchPost, getPreviousPage, getNextPage }}>{children}</AppContext.Provider>);
}


// custom hook creation
const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext }
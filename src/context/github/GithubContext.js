import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

 const GithubContext = createContext( );

 const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

 const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

 export const GithubProvider = ( { children } ) => {
   const initialState = {
      users: [ ],
      user: { },
      repos: [ ],
      loading: false,
   }

   const [ state, dispatch ] = useReducer( githubReducer, initialState );

   // Get users via search
   const searchUsers = async ( text ) => {
      setLoading( );

      const params = new URLSearchParams( {
         q: text
      } );

      // Capture search results
     const response = await fetch( `${GITHUB_URL }/search/users?${ params }`, {
       headers: {
         Authorization: `token: ${GITHUB_TOKEN }`,
       },
     } );

     const { items } = await response.json( );

     dispatch( {
        type: 'GET_USERS',
        payload: items,
     } );
   }

   // Get a single user
   const getUser = async ( login ) => {
      setLoading( );

      // Capture search results
     const response = await fetch( `${GITHUB_URL }/users/${ login }`, {
       headers: {
         Authorization: `token: ${GITHUB_TOKEN }`,
       },
     } );

     if ( response.status === 404 ) {
        window.location = '/notfound';
     } else {
        const data = await response.json( );

       dispatch({
          type: 'GET_USER',
          payload: data,
       });
     }
   }

   // Get user repos
   const getUserRepos = async ( login ) => {
      setLoading( );

      // Sort repos by created and only display 10 repos
      const params = new URLSearchParams( {
         sort: 'created',
         per_page: 10,
      } );

      // Capture search results
     const response = await fetch( `${GITHUB_URL }/users/${ login }/repos?${ params }`, {
       headers: {
         Authorization: `token: ${GITHUB_TOKEN }`,
       },
     } );

     const data = await response.json( );

     dispatch( {
        type: 'GET_REPOS',
        payload: data,
     } );
   }

   // Clear users when clear button is clicked
   const clearUsers = ( ) => dispatch( { type: 'CLEAR_USERS' } );

   // Set loading
   const setLoading = ( ) => dispatch( { type: 'SET_LOADING' } );

   return (
      <GithubContext.Provider value={{
            users: state.users,
            user: state.user,
            loading: state.loading,
            repos: state.repos,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos,
         }}
      >
         { children }
      </GithubContext.Provider>
   )
 }

 export default GithubContext;

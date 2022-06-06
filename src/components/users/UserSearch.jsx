import { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import { searchUsers } from '../../context/github/GithubActions'
import AlertContext from '../../context/alert/AlertContext'

function UserSearch() {
  const [text, setText] = useState('')

  // use context from GithubContext and AlertContext
  const { users, dispatch } = useContext(GithubContext)
  const { setAlert } = useContext(AlertContext)

  const handleChange = (e) => setText(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (text === '' || text === ' ') {
      setAlert('Please enter something', 'error')
    } else {
      dispatch({ type: 'SET_LOADING' })
      const users = await searchUsers(text)
      dispatch({ type: 'GET_USERS', payload: users })
      setText('')
    }
  }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control caret-primary rounded-input'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-40 bg-base-200 input input-lg text-neutral focus:outline-none'
                placeholder='Search'
                value={text}
                onChange={handleChange}
              />
              <button
                type='submit'
                className='bg-neutral absolute top-0 right-0 w-36 btn btn-lg hover:btn-primary'
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div className='flex justify-end lg:block'>
          <button
            onClick={() => dispatch({ type: 'CLEAR_USERS' })}
            className='btn btn-ghost btn-lg'
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch

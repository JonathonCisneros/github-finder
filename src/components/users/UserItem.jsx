import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserAndRepos } from '../../context/github/GithubActions'
import PropTypes from 'prop-types'

function UserItem({ user }) {
  const { login, avatar_url } = user

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')

  // Get user's name and location
  const getUserData = async () => {
    const userData = await getUserAndRepos(login)

    setName(userData.user.name)
    setLocation(userData.user.location)
  }

  getUserData()

  return (
    <div className='card shadow-xl card-compact card-side bg-base-100'>
      <div className='flex-row items-center space-x-4 card-body'>
        <div>
          <div className='avatar'>
            <div className='rounded-full shadow w-14 h-14'>
              <img src={avatar_url} alt='Profile' />
            </div>
          </div>
        </div>

        {/* Display location and name or login */}
        <div>
          <h2 className='card-title'>{name || login}</h2>
          <p className='text-primary mb-2'>
            {location || 'Classified Location'}
          </p>
          <Link
            className='text-secondary-content text-opacity-40'
            to={`/user/${login}`}
          >
            Visit Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserItem

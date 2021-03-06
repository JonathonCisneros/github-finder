import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Navbar({ title }) {
  return (
    <nav className='navbar shadow-lg bg-neutral text-neutral-content mb-6'>
      <div className='container mx-auto'>
        <div className='flex-non px-2 mx-2 hover:text-primary'>
          <FaGithub className='inline pr-2 text-3xl' />
          <Link to='/' className='text-lg font-bold align-middle'>
            {title}
          </Link>
        </div>
        <div className='flex-1 px-2 mx-2'>
          <div className='flex justify-end'>
            <Link
              to='/'
              className='btn btn-ghost btn-sm rounded-btn hover:text-primary'
            >
              Home
            </Link>
            <Link
              to='/about'
              className='btn btn-ghost btn-sm rounded-btn hover:text-primary'
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'GitHub Finder',
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar

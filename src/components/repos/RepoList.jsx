import PropTypes from 'prop-types'
import RepoItem from './RepoItem'
import { GoRepo } from 'react-icons/go'

function RepoList({ user, repos }) {
  return (
    <div className='rounded-lg shadow-lg card bg-neutral-400'>
      <div className='card-body p-2 md:p-6'>
        <h2 className='text-3xl font-bold card-title my-4 flex'>
          <GoRepo className='mt-1' /> Repositories
        </h2>
        <div>
          <div className='grid grid-cols-1 lg:grid-cols-2'>
            {repos.map((repo) => (
              <RepoItem key={repo.id} user={user} repo={repo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
}

export default RepoList

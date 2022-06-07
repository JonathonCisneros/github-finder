import PropTypes from 'prop-types'
import RepoItem from './RepoItem'

function RepoList({ repos }) {
  return (
    <div className='rounded-lg shadow-lg card bg-neutral-400'>
      <div className='card-body'>
        <h2 className='text-3xl font-bold card-title my-4'>
          Latest Repositories
        </h2>
        <div>
          <div className='grid grid-cols-1 lg:grid-cols-2'>
            {repos.map((repo) => (
              <RepoItem key={repo.id} repo={repo} />
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

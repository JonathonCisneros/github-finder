import { FaEye, FaInfo, FaLink, FaStar, FaUtensils } from 'react-icons/fa'
import PropTypes from 'prop-types'

function RepoItem({ repo }) {
  const {
    name,
    description,
    html_url,
    forks,
    open_issues,
    watchers_count,
    stargazers_count,
  } = repo

  return (
    <a href={html_url} target='_blank' rel='noreferrer' className='m-2'>
      <div className='h-full rounded-md card bg-base-200 hover:bg-primary hover:text-base-100 hover:cursor-pointer transition ease-in-out'>
        <div className='card-body p-4 md:p'>
          <h3 className='mb-2 text-xl font-semibold'>
            <FaLink className='inline mr-1' /> {name}
          </h3>
          <p className='mb-3'>{description}</p>
          <div>
            <div className='mr-2 badge badge-secondary badge-sm md:badge-lg'>
              <FaEye className='mr-2' /> {watchers_count}
            </div>
            <div className='mr-2 badge badge-success badge-sm md:badge-lg'>
              <FaStar className='mr-2' /> {stargazers_count}
            </div>
            <div className='mr-2 badge badge-error badge-sm md:badge-lg'>
              <FaInfo className='mr-2' /> {open_issues}
            </div>
            <div className='mr-2 badge badge-warning badge-sm md:badge-lg'>
              <FaUtensils className='mr-2' /> {forks}
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
}

export default RepoItem

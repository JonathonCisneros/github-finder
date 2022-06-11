import { useEffect, useState } from 'react'
import { FaEye, FaInfo, FaLink, FaStar, FaUtensils } from 'react-icons/fa'
import { GiTreeBranch } from 'react-icons/gi'
import { GoGitCommit } from 'react-icons/go'
import { getBranchesAndCommits } from '../../context/github/GithubActions'
import PropTypes from 'prop-types'

function RepoItem({ user, repo }) {
  const [branches, setBranches] = useState([])
  const [commits, setCommits] = useState([])
  const [latestCommitAuthor, setLatestCommitAuthor] = useState('')
  const [latestCommitMessage, setLatestCommitMessage] = useState('')
  const [latestCommitDate, setLatestCommitDate] = useState('')

  const {
    name,
    description,
    html_url,
    forks,
    open_issues,
    watchers_count,
    stargazers_count,
    size,
  } = repo

  /** Get repo branches and commits **/
  useEffect(() => {
    const getCommits = async () => {
      // Check repo data, without this it will crash the app when there is an empty repo
      if (size > 0) {
        const repoData = await getBranchesAndCommits(user.login, name)
        // Only set state if there are any commits
        if (repoData.commits.length > 0) {
          setBranches(repoData.branches)
          setCommits(repoData.commits)
          setLatestCommitDate(repoData.commits[0].commit.author.date)
          setLatestCommitMessage(repoData.commits[0].commit.message)
          // Check if author object is null
          if (repoData.commits[0].author !== null) {
            setLatestCommitAuthor(repoData.commits[0].author.login)
          } else {
            setLatestCommitAuthor(repoData.commits[0].commit.author.name)
          }
        } else {
          setBranches(0)
          setCommits(0)
          setLatestCommitAuthor('')
          setLatestCommitMessage('')
          setLatestCommitDate('')
        }
      }
    }

    getCommits()
  }, [user.login, name])

  const todaysDate = new Date()
  const newCommitDate = new Date(latestCommitDate) // Format latest commit date from string to date object
  // const newCommitDate = new Date('2022-05-09T08:46:00-07:00') // Test display of 'seconds', 'minutes', etc
  const formattedCommitDate = newCommitDate.toLocaleDateString('en-us', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const timeDifference = todaysDate.getTime() - newCommitDate.getTime() // Format both times to ms and subtract
  const secondsSinceLastCommit = Math.ceil(timeDifference / 1000) // Format time to seconds
  const minutesSinceLastCommit = Math.floor(timeDifference / (1000 * 60)) // Format time to minutes
  const hoursSinceLastCommit = Math.floor(timeDifference / (1000 * 60 * 60)) // Format time to hours
  const daysSinceLastCommit = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) // Format time to days

  return (
    <a href={html_url} target='_blank' rel='noreferrer' className='m-2'>
      <div className='h-full rounded-md card bg-base-200 hover:bg-primary hover:text-base-100 hover:cursor-pointer transition ease-in-out group'>
        <div className='card-body p-4'>
          <h3 className='mb-2 text-xl font-semibold'>
            <FaLink className='inline mr-1' /> {name}
          </h3>
          <div className='grid grid-cols-2'>
            <div className='grid grid-cols-2'>
              <GiTreeBranch className='text-xl text-primary group-hover:text-base-100' />
              <div className='text-md ml-[-3rem] md:ml-[-3.5rem] xl:ml-[-5rem]'>
                {branches.length}{' '}
                {branches.length === 1 ? ' branch' : ' branches'}
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <GoGitCommit className='text-xl text-primary group-hover:text-base-100' />
              <div className='text-md ml-[-3rem] md:ml-[-3.5rem] xl:ml-[-5rem]'>
                {commits.length} {commits.length === 1 ? ' commit' : ' commits'}
              </div>
            </div>
          </div>

          <hr className='border-gray-400 group-hover:border-base-100' />

          {/* Display latest commit */}
          {commits.length > 0 ? (
            <p className='text-sm text-gray-500 group-hover:text-base-100'>
              <span className='font-bold'>
                {latestCommitAuthor !== '' ? latestCommitAuthor : 'Anonymous'}
              </span>{' '}
              {latestCommitMessage}{' '}
              {/* Display time depending on how long since last commit */}
              <span className='text-gray-400 group-hover:text-base-100'>
                {secondsSinceLastCommit <= 60
                  ? secondsSinceLastCommit +
                    (secondsSinceLastCommit === 1 ? ' second' : ' seconds')
                  : minutesSinceLastCommit <= 60
                  ? minutesSinceLastCommit +
                    (minutesSinceLastCommit === 1
                      ? ' minute ago'
                      : ' minutes ago')
                  : hoursSinceLastCommit <= 24
                  ? hoursSinceLastCommit +
                    (hoursSinceLastCommit === 1 ? ' hour ago' : ' hours ago')
                  : daysSinceLastCommit <= 28 && daysSinceLastCommit === 1
                  ? 'yesterday'
                  : daysSinceLastCommit <= 28 && daysSinceLastCommit > 1
                  ? daysSinceLastCommit + ' days ago'
                  : formattedCommitDate}
              </span>
            </p>
          ) : (
            <p className='text-gray-500'>No commits</p>
          )}

          <div className='text-md font-bold'>Description</div>
          <p className='mb-3'>
            {description !== null ? description : 'No description'}
          </p>
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
  user: PropTypes.object.isRequired,
}

export default RepoItem

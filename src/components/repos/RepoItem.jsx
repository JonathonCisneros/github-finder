import { useEffect, useState } from 'react'
import { FaEye, FaInfo, FaLink, FaStar, FaUtensils } from 'react-icons/fa'
import { GiTreeBranch } from 'react-icons/gi'
import { GoGitCommit, GoFileDirectory } from 'react-icons/go'
import { getBranchesAndCommits } from '../../context/github/GithubActions'
import PropTypes from 'prop-types'

function RepoItem({ user, repo }) {
  const [branches, setBranches] = useState([])
  const [commits, setCommits] = useState([])
  const [latestCommitAuthor, setLatestCommitAuthor] = useState('')
  const [latestCommitMessage, setLatestCommitMessage] = useState('')
  const [latestCommitDate, setLatestCommitDate] = useState('')

  const {
    id,
    name,
    description,
    default_branch,
    html_url,
    forks,
    open_issues,
    watchers_count,
    stargazers_count,
    size,
  } = repo

  const { login } = user

  /** Get repo branches and commits **/
  useEffect(() => {
    const getCommits = async () => {
      // Check repo data, without this it will crash the app when there is an empty repo
      if (size > 0) {
        const repoData = await getBranchesAndCommits(login, name)
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
  }, [login, name, size])

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
    <div className='m-2'>
      <div className='h-full rounded-md card bg-base-200 transition ease-in-out group'>
        <div className='card-body p-4'>
          <h3 className='mb-2 text-xl font-semibold break-all'>
            <GoFileDirectory className='inline mr-1 mb-1' /> {name}
          </h3>
          <div className='grid grid-cols-2'>
            <div className='grid grid-cols-2'>
              <GiTreeBranch className='text-xl text-primary animate-wiggle' />
              <div className='text-md ml-[-3rem] md:ml-[-3.5rem] xl:ml-[-5rem]'>
                {branches.length}{' '}
                {branches.length === 1 ? ' branch' : ' branches'}
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <GoGitCommit className='text-xl text-primary mt-[2px]' />
              <div className='text-md ml-[-3rem] md:ml-[-3.5rem] xl:ml-[-5rem]'>
                {commits.length}
                {commits.length === 1
                  ? ' commit'
                  : commits.length === 30
                  ? '+ commits'
                  : ' commits'}
              </div>
            </div>
          </div>

          <hr className='border-gray-400' />

          {/* Display latest commit */}
          {commits.length > 0 ? (
            <p className='text-sm text-gray-500'>
              <span className='font-bold'>
                {latestCommitAuthor !== '' ? latestCommitAuthor : 'Anonymous'}
              </span>{' '}
              <span className='break-all'>{latestCommitMessage} </span>
              {/* Display time depending on how long since last commit */}
              <span className='text-gray-400'>
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

          {/*  Display description if any */}
          {description !== null ? (
            <>
              <h3 className='text-lg font-bold'>Description</h3>
              <p className='text-md mb-2'>{description}</p>
            </>
          ) : (
            <h3 className='text-lg mb-2'>No Description</h3>
          )}

          {/* Open Repo Modal button */}
          <label
            htmlFor={id}
            className='btn btn-primary text-base-100 modal-button'
          >
            More Repo Info
          </label>
        </div>
      </div>

      {/* Repo Modal */}
      <input type='checkbox' id={id} className='modal-toggle' />
      <label htmlFor={id} className='modal transition-all'>
        <label
          htmlFor=''
          className='modal-box relative max-w-3xl max-h-[60vh] md:max-h-[90vh]'
        >
          <label
            htmlFor={id}
            className='btn btn-sm btn-circle absolute right-3 top-3'
          >
            ✕
          </label>

          <h1 className='text-primary text-3xl lg:text-5xl font-bold card-title my-4 break-all'>
            <a href={html_url} target='_blank' rel='noreferrer'>
              <FaLink className='inline mr-1 ' /> {name}
            </a>
          </h1>

          {/* Badges */}
          <div className='mb-3 flex w-full'>
            <div className='mr-2 badge badge-secondary badge-sm md:badge-lg'>
              <FaEye className='mr-2' />{' '}
              {watchers_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
            <div className='mr-2 badge badge-success badge-sm md:badge-lg'>
              <FaStar className='mr-2' />{' '}
              {stargazers_count
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
            <div className='mr-2 badge badge-error badge-sm md:badge-lg'>
              <FaInfo className='mr-2' />{' '}
              {open_issues.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
            <div className='mr-2 badge badge-warning badge-sm md:badge-lg'>
              <FaUtensils className='mr-2' />{' '}
              {forks.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
          </div>

          {/* Display branches */}
          {branches.length > 0 ? (
            <div className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-3'>
              <input type='checkbox' className='transition-all' />
              <h3 className='text-xl font-bold collapse-title'>
                {branches.length}
                {branches.length === 1 ? ' Branch' : ' Branches'}
              </h3>
              <div className='collapse-content transition-all'>
                {branches.map((branch) => (
                  <p
                    key={branch.commit.sha}
                    className='text-md my-2 border-l-1'
                  >
                    <GiTreeBranch className='inline mr-1 mb-1 text-primary animate-wiggle' />
                    <span className='font-bold'>{branch.name}</span>
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <h3 className='text-xl text-gray-500 mb-2'>No Branches</h3>
          )}

          {/* Display each commit (30 max) */}
          {commits.length > 0 ? (
            <div className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box'>
              <input type='checkbox' />
              <h3 className='text-xl font-bold collapse-title'>
                {commits.length}
                {commits.length === 1
                  ? ' Commit '
                  : commits.length === 30
                  ? '+ Commits '
                  : ' Commits '}
                on <span className='text-primary'>{default_branch}</span> branch
              </h3>
              <div className='collapse-content transition-all'>
                {commits.map((commit) => (
                  <p key={commit.sha} className='text-md my-2 border-l-1'>
                    <GoGitCommit className='inline mr-1 mb-1 text-primary rotate-90' />
                    <span className='font-bold'>
                      {commit.author !== null
                        ? commit.author.login
                        : commit.commit.author.name}
                    </span>{' '}
                    {commit.commit.message}{' '}
                    <span className='text-gray-400'>
                      {new Date(commit.commit.author.date).toLocaleDateString(
                        'en-us',
                        {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        }
                      )}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <h3 className='text-xl text-gray-500 mb-2'>No Commits</h3>
          )}
        </label>
      </label>
    </div>
  )
}

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default RepoItem

import { useEffect, useState } from 'react'
import {
  DiCss3,
  DiHtml5,
  DiGo,
  DiJava,
  DiJsBadge,
  DiPhp,
  DiPython,
  DiRuby,
} from 'react-icons/di'
import {
  SiCoffeescript,
  SiCplusplus,
  SiCsharp,
  SiKotlin,
  SiSwift,
  SiTypescript,
} from 'react-icons/si'
import {
  FaEye,
  FaInfo,
  FaLink,
  FaStar,
  FaUtensils,
  FaGithubAlt,
} from 'react-icons/fa'
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
    homepage,
    html_url,
    forks,
    language,
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
            className='btn btn-primary btn-outline text-base-100 modal-button '
          >
            More Info
          </label>
        </div>
      </div>

      {/* Repo Modal */}
      <input type='checkbox' id={id} className='modal-toggle' />
      <label htmlFor={id} className='modal'>
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

          <div className='w-full flex'>
            <h1 className='text-neutral text-3xl lg:text-5xl font-bold card-title my-4 break-all '>
              <GoFileDirectory className='inline mb-1' /> {name}
            </h1>
          </div>

          {/* Description */}
          {description !== null && (
            <>
              <h2 className='text-2xl font-bold'>Description</h2>
              <p className='text-md mb-2'>{description}</p>
            </>
          )}

          {/* Top language used */}
          {language !== null && (
            <>
              <h2 className='text-2xl font-bold'>Language</h2>
              <h3 className='text-md md:text-lg mb-3'>
                {user.name || login} heavily favored{' '}
                {language === 'CSS' ? (
                  <>
                    <DiCss3 className='inline mb-1 text-xl  text-[#563d7c]' />{' '}
                    <span className='font-bold'> CSS</span>
                  </>
                ) : language === 'HTML' ? (
                  <>
                    <DiHtml5 className='inline mb-1 text-xl  text-[#e34c26]' />
                    <span className='font-bold'> HTML</span>
                  </>
                ) : language === 'TypeScript' ? (
                  <>
                    <SiTypescript className='inline mb-1 text-xl  text-[#3178c6]' />
                    <span className='font-bold'> TypeScript </span>
                  </>
                ) : language === 'JavaScript' ? (
                  <>
                    <DiJsBadge className='inline mb-1 text-xl  text-[#f1e05a]' />
                    <span className='font-bold'> Javascript </span>
                  </>
                ) : language === 'Java' ? (
                  <>
                    <DiJava className='inline mb-1 text-xl text-[#b07219]' />
                    <span className='font-bold'>
                      {' '}
                      Java (hey there, old timer){' '}
                    </span>
                  </>
                ) : language === 'Python' ? (
                  <>
                    <DiPython className='inline mb-1 text-2xl  text-[#3572A5]' />
                    <span className='font-bold'> Python </span>
                  </>
                ) : language === 'Swift' ? (
                  <>
                    <SiSwift className='inline mb-1 text-xl  text-[#F05138]' />
                    <span className='font-bold'> Swift </span>
                  </>
                ) : language === 'PHP' ? (
                  <>
                    <DiPhp className='inline mb-1 text-3xl md:text-4xl  text-[#4F5D95]' />
                    <span className='font-bold'>(eww, messy) </span>
                  </>
                ) : language === 'Ruby' ? (
                  <>
                    <DiRuby className='inline mb-1 text-xl  text-[#701516]' />
                    <span className='font-bold'> Ruby </span>
                  </>
                ) : language === 'Go' ? (
                  <>
                    <DiGo className='inline mb-1 text-3xl text-[#00ADD8]' />
                    <span className='font-bold'> Go </span>
                  </>
                ) : language === 'Kotlin' ? (
                  <>
                    <SiKotlin className='inline mb-1 text-lg text-[#A97BFF]' />
                    <span className='font-bold'> Kotlin </span>
                  </>
                ) : language === 'CoffeeScript' ? (
                  <>
                    <SiCoffeescript className='inline mb-1 text-xl text-[#244776]' />
                    <span className='font-bold'> CoffeeScript </span>
                  </>
                ) : language === 'C++' ? (
                  <>
                    <SiCplusplus className='inline mb-1 text-xl text-[#f34b7d]' />
                    <span className='font-bold'> C++ </span>
                  </>
                ) : language === 'C#' ? (
                  <>
                    <SiCsharp className='inline mb-1 text-xl text-[#178600]' />
                    <span className='font-bold'> C# </span>
                  </>
                ) : (
                  <span className='font-bold'>{language}</span>
                )}{' '}
                in this project.
              </h3>
            </>
          )}

          {/* Links */}
          <div className=' w-full mb-4'>
            <div className='m-auto'>
              <a
                href={html_url}
                className='btn btn-primary btn-outline  mb-3 w-full'
                target='_blank'
                rel='noreferrer'
              >
                <FaGithubAlt className='inline mr-1' />
                View on GitHub
              </a>
              {homepage && (
                <a
                  href={homepage}
                  className='btn btn-outline btn-primary w-full'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FaLink className='inline mr-1 ' />
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Badges */}
          <div className='flex w-full mb-3'>
            <div className='m-auto'>
              <div className='badge badge-secondary badge-sm md:badge-lg mr-2 lg:mr-3'>
                <FaEye className='mr-2' />{' '}
                {watchers_count
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
              <div className='badge badge-success badge-sm md:badge-lg mr-2 lg:mr-3'>
                <FaStar className='mr-2' />{' '}
                {stargazers_count
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
              <div className='badge badge-error badge-sm md:badge-lg mr-2 lg:mr-3'>
                <FaInfo className='mr-2' />{' '}
                {open_issues.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
              <div className='badge badge-warning badge-sm md:badge-lg mr-2 lg:mr-3'>
                <FaUtensils className='mr-2' />{' '}
                {forks.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </div>
          </div>

          {/* Display branches */}
          {branches.length > 0 ? (
            <div className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-3 transition-all'>
              <input type='checkbox' />
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
            <div className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box transition-all'>
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
                    <GoGitCommit className='inline mr-1 mb-1 text-primary rotate-90 animate-pulse' />
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

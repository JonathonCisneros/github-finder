import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa'
import { useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../components/layout/Spinner'
import RepoList from '../components/repos/RepoList'
import GithubContext from '../context/github/GithubContext'
import { getUserAndRepos } from '../context/github/GithubActions'

function User() {
  // Get user, repos, loading and dispatch from Github context
  const { user, loading, repos, dispatch } = useContext(GithubContext)

  const params = useParams()

  //** Get user and repo data **//
  useEffect(() => {
    dispatch({ type: 'SET_LOADING' })
    const getUserData = async () => {
      const userData = await getUserAndRepos(params.login)
      dispatch({ type: 'GET_USER_AND_REPOS', payload: userData })
    }

    getUserData()
  }, [dispatch, params.login]) // Dependencies only used to clear warnings in console

  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
  } = user

  // NOTE: check for valid url to users website
  const websiteURL = blog?.startsWith('http') ? blog : 'https://' + blog

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className='w-full mx-auto lg:w-10/12'>
        <div className=''>
          <Link to='/' className='btn btn-ghost hover:btn-primary mb-5'>
            Back To Search
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 mb-4 md:gap-8'>
          <div className='custom-card-image mb-6 md:mb-0 px-8 md:px-0'>
            <div className='card rounded-lg shadow-xl image-full'>
              <figure>
                <img src={avatar_url} alt='Github Avatar' />
              </figure>
              <div className='justify-end card-body'>
                <h2 className='card-title mb-0 text-base-100'>{name}</h2>
                <p className='flex-grow-0 text-base-100'>{login}</p>
              </div>
            </div>
          </div>

          <div className='col-span-2'>
            <div className='mb-6'>
              <h1 className='text-xl card-title '>
                {name}
                <div className='badge badge-primary text-base-100 mr-1 ml-2'>
                  {type}
                </div>
              </h1>
              <p className='mt-4'>{bio}</p>
              <div className='mt-4 card-actions'>
                <a
                  href={html_url}
                  target='_blank'
                  rel='noreferrer'
                  className='btn btn-outline hover:btn-primary hover:shadow-lg'
                >
                  Visit Github Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full rounded-lg shadow-md bg-base-100 stats mb-6'>
          <div className='grid md:stats'>
            {location && (
              <div className='stat'>
                <div className='stat-title text-sm'>Location</div>
                <div className='stat-value text-base'>{location}</div>
              </div>
            )}
            {blog && (
              <div className='stat'>
                <div className='stat-title text-sm'>Website</div>
                <div className='stat-value text-base'>
                  <a href={websiteURL} target='_blank' rel='noreferrer'>
                    {blog}
                  </a>
                </div>
              </div>
            )}
            {twitter_username && (
              <div className='stat'>
                <div className='stat-title text-sm'>Twitter</div>
                <div className='stat-value text-base'>
                  <a
                    href={`https://twitter.com/${twitter_username}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {twitter_username}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats'>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
            <div className='stat'>
              <div className='stat-figure text-primary'>
                <FaUsers className='text-3xl md:text-5xl' />
              </div>
              <div className='stat-title pr-5'>Followers</div>
              <div className='stat-value pr-5 text-3xl md:text-4xl'>
                {!followers
                  ? 0
                  : followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </div>

            <div className='stat'>
              <div className='stat-figure text-primary'>
                <FaUserFriends className='text-3xl md:text-5xl' />
              </div>
              <div className='stat-title pr-5'>Following</div>
              <div className='stat-value pr-5 text-3xl md:text-4xl'>
                {!following
                  ? 0
                  : following.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </div>

            <div className='stat'>
              <div className='stat-figure text-primary'>
                <FaCodepen className='text-3xl md:text-5xl' />
              </div>
              <div className='stat-title pr-5'>Public Repos</div>
              <div className='stat-value pr-5 text-3xl md:text-4xl'>
                {public_repos}
              </div>
            </div>

            <div className='stat'>
              <div className='stat-figure text-primary'>
                <FaStore className='text-3xl md:text-5xl' />
              </div>
              <div className='stat-title pr-5'>Public Gists</div>
              <div className='stat-value pr-5 text-3xl md:text-4xl'>
                {public_gists}
              </div>
            </div>
          </div>
        </div>

        <RepoList user={user} repos={repos} />
      </div>
    </>
  )
}

export default User

function About() {
  return (
    <>
      <h1 className='text-4xl md:text-6xl mb-4'>Github Finder</h1>
      <p className='mb-4 text-lg md:text-2xl font-light'>
        A React app to search GitHub profiles and see profile details. The base
        of this project is from the
        <a href='https://www.udemy.com/course/modern-react-front-to-back/'>
          {' '}
          React Front To Back
        </a>{' '}
        Udemy course by
        <strong>
          <a
            href='https://traversymedia.com'
            className='text-primary'
            target='_blank'
            rel='noreferrer'
          >
            {' '}
            Brad Traversy
          </a>
        </strong>{' '}
        but has been customized by{' '}
        <strong>
          <a
            href='https://github.com/JonathonCisneros'
            className='text-primary'
            target='_blank'
            rel='noreferrer'
          >
            {' '}
            Jonathon Cisneros
          </a>
        </strong>
        . Along with a new theme and slight theme asjustments, there are new
        features to look for. When searching for users, their location is listed
        on their card and their name is updated if that user has their full name
        on Github. A new API function grabs information about each repository
        and displays the latest commit, number of commits and number of
        branches.
      </p>
      <p className='text-lg text-gray-400'>
        Version <span className='text-primary'>1.1.0</span>
      </p>
    </>
  )
}

export default About

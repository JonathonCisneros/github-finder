function About() {
  return (
    <>
      <h1 className='text-4xl md:text-6xl mb-4 font-bold'>Github Finder</h1>
      <p className='mb-4 text-lg md:text-2xl font-light'>
        A React app to search GitHub profiles and see profile details. The
        foundation of this project is from the
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
        . Along with a new theme, there are new features to look for. When
        searching for users, their location is listed on their card and their
        name is updated if that user has their full name on GitHub. A new API
        function grabs information about each repository and displays the latest
        commit. Repo modal shows which language was favored, links to the
        repository, live demo (if any), latest 30 commits and all branches.
      </p>
      <h2 className='text-2xl md:text-4xl font-bold'>Tools Used</h2>
      <ul className='list-disc ml-6 mb-4 text-lg md:text-xl font-light'>
        <li>React</li>
        <li>GitHub REST API</li>
        <li>Context API</li>
        <li>Axios</li>
        <li>
          Netlify Functions (to make proxy requests to hide GitHub token from
          being seen by hackers)
        </li>
        <li>Tailwind CSS</li>
        <li>DaisyUI</li>
      </ul>
      <p className='text-lg text-gray-400'>
        Version <span className='text-primary'>1.2.0</span>
      </p>
    </>
  )
}

export default About

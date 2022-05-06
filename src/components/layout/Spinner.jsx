import spinner from './assets/spinner.gif';

function Spinner ( ) {
  return (
    <div className='w-100 mt-200'>
      <img
        className='text-align mx-auto'
        width={ 200 }
        src={ spinner }
        alt='Loading...'
      />
    </div>
  );
}

export default Spinner;

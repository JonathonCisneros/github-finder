import spinner from './assets/spinner.gif';

function Spinner ( ) {
  return (
    <div className='w-100 mt-200'>
      <img
        className='text-align mx-auto'
        width={ 200 }
        src={ spinner }
        alt='Loading...'
      /><br/>
      <p className='text-center mx-auto text-xl'>Loading...</p>
    </div>
  );
}

export default Spinner;

import './css/spinner.css'

function Spinner() {
  return (
    <div className='loader'>
      <div className='duo duo1'>
        <div className='dot dot-a bg-primary'></div>
        <div className='dot dot-b bg-primary'></div>
      </div>
      <div className='duo duo2'>
        <div className='dot dot-a bg-primary'></div>
        <div className='dot dot-b bg-primary'></div>
      </div>
    </div>
  )
}

export default Spinner

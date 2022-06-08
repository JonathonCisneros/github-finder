import './css/spinner.css'

function Spinner() {
  return (
    <div class='loader'>
      <div class='duo duo1'>
        <div class='dot dot-a bg-primary'></div>
        <div class='dot dot-b bg-primary'></div>
      </div>
      <div class='duo duo2'>
        <div class='dot dot-a bg-primary'></div>
        <div class='dot dot-b bg-primary'></div>
      </div>
    </div>
  )
}

export default Spinner

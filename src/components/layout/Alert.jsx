import { useContext } from 'react'
import AlertContext from '../../context/alert/AlertContext'
import { toast } from 'react-toastify'

function Alert() {
  const { alert } = useContext(AlertContext)

  /** Use toast when there is an error **/
  if (alert) {
    toast.error(alert?.msg, {
      autoClose: 2000,
      theme: 'colored',
      className: 'bg-primary',
    })
    console.log(alert)
  }
}

export default Alert

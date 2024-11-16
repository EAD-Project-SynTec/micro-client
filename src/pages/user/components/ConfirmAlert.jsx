import Swal from 'sweetalert2'
export default function ConfirmAlert({message}){
    return(Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 2000
      })
    ) 
}

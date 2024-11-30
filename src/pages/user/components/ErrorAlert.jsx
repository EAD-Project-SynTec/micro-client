import Swal from 'sweetalert2'
export default function ErrorAlert({message}){
    return(Swal.fire({
        icon: "error",
        title: message,
    })
    ) 
}

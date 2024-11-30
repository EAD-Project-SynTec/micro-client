import Swal from 'sweetalert2';
export default function Alert({message, iconType}){
    return(Swal.fire({
        icon: iconType,
        title: message,
        })
    ) 
}
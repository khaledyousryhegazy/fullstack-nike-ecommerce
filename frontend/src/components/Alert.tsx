import Swal, { SweetAlertOptions } from 'sweetalert2'

const Toast = Swal.mixin( {
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
} );

function Alert( options: SweetAlertOptions ) {
    Toast.fire( {
        ...options
    } );
}

export default Alert

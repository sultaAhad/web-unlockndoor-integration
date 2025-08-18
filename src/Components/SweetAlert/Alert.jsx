import Swal from "sweetalert2";

function Alert({ title, text, iconStyle = "success" }) {
  return Swal.fire({
    icon: iconStyle,
    title: title,
    text: `${text}!`,
    timer: 4500,
  });
}

export default Alert;

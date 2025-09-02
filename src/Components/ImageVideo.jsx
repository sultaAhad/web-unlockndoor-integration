import { Link } from "react-router-dom";
import { deletetrash } from "../Constant/Index";
import Swal from "sweetalert2";
import {
  useDeleteImageWomanMutation,
  useDeleteVideoWomanMutation,
} from "../network/services/WomanAuth";

const ImageVideo = ({ file, type }) => {
  const [deleteImageWoman] = useDeleteImageWomanMutation();
  const [deleteVideoWoman] = useDeleteVideoWomanMutation();

  const gender = localStorage.getItem("gender");
  const deleteFile = (file, type) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You will not be able to recover this ${type} file!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (gender === "female") {
          // if (type === "image") {
          //   deleteImageWoman(file);
          // } else if (type === "video") {
          //   deleteVideoWoman(file);
          // }
          // Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  if (type == "video") {
    return (
      <div className="col-md-6">
        <div className="pictures_dv">
          <div className="pic_dv">
            <div className="del_icon d-flex align-items-center justify-content-center  ">
              <Link
                className="cursor-pointer"
                onClick={() => deleteFile(file, type)}
              >
                <img
                  src={deletetrash}
                  className="img-fluid wrapper-deletetrash"
                />
              </Link>
            </div>
            <video>
              <source src={file} type="video/mp4" />
            </video>
            <div className="pic_icon">
              <i class="fa fa-play" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (type == "image") {
    return (
      <div className="col-md-6">
        <div className="pictures_dv">
          <div className="pic_dv">
            <div className="del_icon d-flex align-items-center justify-content-center  ">
              <Link
                className="cursor-pointer"
                onClick={() => deleteFile(file, type)}
              >
                <img
                  src={deletetrash}
                  className="img-fluid wrapper-deletetrash"
                />
              </Link>
            </div>
            <img src={file} />
          </div>
        </div>
      </div>
    );
  }
};

export default ImageVideo;

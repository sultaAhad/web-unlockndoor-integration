import { Link } from "react-router-dom";
import { deletetrash } from "../Constant/Index";
import Swal from "sweetalert2";
import {
  useDeleteImageWomanMutation,
  useDeleteVideoWomanMutation,
} from "../network/services/WomanAuth";
import { useEffect, useRef } from "react";
import {
  useDeleteImageManMutation,
  useDeleteVideoManMutation,
} from "../network/services/ManAuth";

const ImageVideo = ({ file, type }) => {
  const [deleteImageWoman, responseImageWoman] = useDeleteImageWomanMutation();
  const [deleteVideoWoman, responseVideoWoman] = useDeleteVideoWomanMutation();
  const [deleteImageMan, responseImageMan] = useDeleteImageManMutation();
  const [deleteVideoMan, responseVideoMan] = useDeleteVideoManMutation();
  const fileName = useRef(file.split("/").pop());

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
          if (type === "image") {
            deleteImageWoman({ image: fileName?.current });
          } else if (type === "video") {
            deleteVideoWoman({ video: fileName?.current });
          }
        }
        if (gender === "male") {
          if (type === "image") {
            deleteImageMan({ image: fileName?.current });
          } else if (type === "video") {
            deleteVideoMan({ video: fileName?.current });
          }
        }
      }
    });
  };

  useEffect(() => {
    if (responseImageMan?.data?.status) {
      Swal.fire("Deleted!", responseImageMan?.data?.message, "success");
    }
  }, [responseImageMan]);

  useEffect(() => {
    if (responseVideoMan?.data?.status) {
      Swal.fire("Deleted!", responseVideoMan?.data?.message, "success");
    }
  }, [responseVideoMan]);

  useEffect(() => {
    if (responseImageWoman?.data?.status) {
      Swal.fire("Deleted!", responseImageWoman?.data?.message, "success");
    }
  }, [responseImageWoman]);

  useEffect(() => {
    if (responseVideoWoman?.data?.status) {
      Swal.fire("Deleted!", responseImageMan?.data?.message, "success");
    }
  }, [responseVideoWoman]);

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
              <i className="fa fa-play" aria-hidden="true"></i>
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

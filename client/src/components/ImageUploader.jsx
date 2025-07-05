import React from "react";
import { BiCloudUpload } from "react-icons/bi";
import { storage } from "../config/firebase.config";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";


const ImageUploader = ({
    setImageURL,
    setAlert,
    alertMsg,
    isLoading,
    isImage,
    setProgress,
  }) => {
    const uploadImage = (e) => {
      isLoading(true);
      const imageFile = e.target.files[0];
      const storageRef = ref(
        storage,
        `${isImage ? "Images" : "Audio"}/${Date.now()}-${imageFile.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
  
        (error) => {
          setAlert("error");
          alertMsg("File upload failed.");
          setTimeout(() => {
            setAlert(null);
          }, 4000);
          isLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageURL(downloadUrl);
            setProgress(0);
            isLoading(false);
            setAlert("success");
            alertMsg("File uploaded successfully");
            setTimeout(() => {
              setAlert(null);
            }, 4000);
          });
        }
      );
    };
  
    return (
      <label>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col justify-center items-center cursor-pointer">
            <p className="font-bold text-2xl">
              <BiCloudUpload />
            </p>
            <p className="text-lg">
              click to upload {isImage ? "image" : "audio"}
            </p>
          </div>
        </div>
        <input
          type="file"
          name="upload-image"
          accept={`${isImage ? "image/*" : "audio/*"}`}
          onChange={uploadImage}
          className="w-0 h-0"
        />
      </label>
    );
  };

export default ImageUploader; 
"use client";
import React, { useRef } from "react";
import "./App.css";
import { IKUpload } from "imagekitio-next";

function FileUpload({ onSuccess, onProgress, fileType }) {
  //what are these 3 props mean
  // onSuccess: callback function to be called when the upload is successful
  // onProgress: callback function to be called when the upload is in progress
  // fileType: type of the file to be uploaded (image, video, etc.)

  //   const ikUploadRefTest = useRef(null);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const onError = (err) => {
    console.log("Error", err);
    setUploading(false);
    setError(err.message);
  };

  const handleSuccess = (res) => {
    // different from onSuccess prop
    // this is the success callback for the upload request
    console.log("Success", res);
    setUploading(false);
    setError(null);
    onSuccess(res);
  };

  const handleUploadProgress = (evt) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };

  const handleUploadStart = (evt) => {
    // console.log("Start", evt);
    setUploading(true);
    setError(null);
  };

  const validateFile = (file) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("File type not supported. Please upload a video file.");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        // 100MB limit
        setError(
          "File size exceeds the limit. Please upload a smaller video file."
        );
        return false;
      }
    } else if (fileType === "image") {
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setError("File type not supported. Please upload an image file.");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError(
          "File size exceeds the limit. Please upload a smaller image file."
        );
        return false;
      }
    } else {
      return false;
    }
  };
  return (
    <div className="App">
      <h1>ImageKit React quick start</h1>

      <IKUpload
        fileName={fileType === "video" ? "video" : "image"}
        //   tags={["sample-tag1", "sample-tag2"]}
        //   customCoordinates={"10,10,10,10"}
        //   isPrivateFile={false}
        //   useUniqueFileName={true}
        //   responseFields={["tags"]}
        validateFile={validateFile} // returns boolean value
        folder={fileType === "video" ? "/videos" : "/images"}
        // extensions={[
        //   {
        //     name: "remove-bg",
        //     options: {
        //       add_shadow: true,
        //     },
        //   },
        // ]}
        // webhookUrl="https://www.example.com/imagekit-webhook" // replace with your webhookUrl
        // overwriteFile={true}
        // overwriteAITags={true}
        // overwriteTags={true}
        // overwriteCustomMetadata={true}
        // customMetadata={{
        //   "brand": "Nike",
        //   "color": "red",
        // }}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadProgress={handleUploadProgress}
        onUploadStart={handleUploadStart}
        transformation={{
          pre: "l-text,i-Imagekit,fs-50,l-end",
          post: [
            {
              type: "transformation",
              value: "w-100",
            },
          ],
        }}
        // style={{display: 'none'}} // hide the default input and use the custom upload button
        // ref={ikUploadRefTest}
      />
      {/* <p>Custom Upload Button</p>
      {ikUploadRefTest && (
          <button onClick={() => ikUploadRefTest.current.click()}>
            Upload
          </button>
        )}
        <p>Abort upload request</p>
        {ikUploadRefTest && (
          <button onClick={() => ikUploadRefTest.current.abort()}>
            Abort request
          </button>
        )} 

       ...other SDK components added previously */}
      {error && <div className="text-error text-sm text-red-600">{error}</div>}
    </div>
  );
}

export default FileUpload;

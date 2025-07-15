import React, { useState } from "react";
import { Apihelper } from "../../common/service/ApiHelper";

const scrollbarStyle = `
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #000000;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(239, 68, 68, 0.5);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(239, 68, 68, 0.8);
  }
`;

const MovieCreateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    video: [], // array of video files
    image: [], // array of image files
    description: "",
    tags: [],
    cast: [],
    Director: {
      name: "",
      img: null,
      imgPreview: "",
      from: "",
    },
    Music: {
      name: "",
      img: null,
      imgPreview: "",
      from: "",
    },
    language: "Hindi",
    releaseDate: null,
    isPremium: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    thumbnail: "",
    qualities: {
      "720p": "",
      "1080p": "",
    },
    description: "",
    Director: {
      name: "",
      img: "",
    },
    Music: {
      name: "",
      img: "",
    },
    releaseDate: "",
    cast: "",
    streamingUrl: "", // for file validation
  });

  const [tagInput, setTagInput] = useState("");
  const [castInput, setCastInput] = useState({
    name: "",
    img: null,
    imgPreview: "",
    from: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleFileUpload = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === "thumbnail") {
          setFormData((prev) => ({
            ...prev,
            [field]: file,
            thumbnailPreview: reader.result,
          }));
        } else if (field.includes("qualities")) {
          const quality = field.split(".")[1];
          setFormData((prev) => ({
            ...prev,
            qualities: {
              ...prev.qualities,
              [quality]: file,
            },
          }));
        } else if (field.includes("Director.img")) {
          setFormData((prev) => ({
            ...prev,
            Director: {
              ...prev.Director,
              img: file,
              imgPreview: reader.result,
            },
          }));
        } else if (field.includes("Music.img")) {
          setFormData((prev) => ({
            ...prev,
            Music: {
              ...prev.Music,
              img: file,
              imgPreview: reader.result,
            },
          }));
        } else if (field === "streamingUrl") {
          setFormData((prev) => ({
            ...prev,
            streamingUrl: file,
          }));
        }
      };
      // Only read as DataURL for images, not for video
      if (field === "thumbnail" || field.includes("Director.img") || field.includes("Music.img")) {
        reader.readAsDataURL(file);
      } else {
        reader.onloadend(); // for video, just set file
      }
    }
  };

  const handleCastFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCastInput((prev) => ({
          ...prev,
          img: file,
          imgPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddCast = () => {
    if (castInput.name.trim()) {
      setFormData((prev) => ({
        ...prev,
        cast: [
          ...prev.cast,
          {
            name: castInput.name,
            img: castInput.img,
            from: castInput.from,
          },
        ],
      }));
      setCastInput({
        name: "",
        img: null,
        imgPreview: "",
        from: "",
      });
    }
  };

  const handleRemoveCast = (index) => {
    setFormData((prev) => ({
      ...prev,
      cast: prev.cast.filter((_, i) => i !== index),
    }));
  };

  // New handler for video uploads (multiple)
  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      video: files,
    }));
    e.target.value = "";
  };

  // New handler for image uploads (multiple)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      image: files,
    }));
    e.target.value = "";
  };

  // Remove video/image by index
  const removeVideo = (idx) => {
    setFormData((prev) => ({
      ...prev,
      video: prev.video.filter((_, i) => i !== idx),
    }));
  };
  const removeImage = (idx) => {
    setFormData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== idx),
    }));
  };

  const validateForm = () => {
    let tempErrors = {
      name: "",
      thumbnail: "",
      qualities: {
        "720p": "",
        "1080p": "",
      },
      description: "",
      Director: {
        name: "",
        img: "",
      },
      Music: {
        name: "",
        img: "",
      },
      releaseDate: "",
      cast: "",
      streamingUrl: "",
    };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      tempErrors.name = "Movie name is required";
      isValid = false;
    } else if (formData.name.length < 2) {
      tempErrors.name = "Movie name must be at least 2 characters";
      isValid = false;
    }

    // Thumbnail validation
    if (!formData.thumbnail) {
      tempErrors.thumbnail = "Thumbnail is required";
      isValid = false;
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(formData.thumbnail.type)) {
        tempErrors.thumbnail =
          "Please upload a valid image (JPG, PNG, or WEBP)";
        isValid = false;
      } else if (formData.thumbnail.size > 5 * 1024 * 1024) {
        tempErrors.thumbnail = "Image size should be less than 5MB";
        isValid = false;
      }
    }

    // Quality files validation
    if (!formData.qualities["720p"] && !formData.qualities["1080p"]) {
      tempErrors.qualities["720p"] = "At least one quality file is required";
      tempErrors.qualities["1080p"] = "At least one quality file is required";
      isValid = false;
    }

    // Description validation
    if (!formData.description.trim()) {
      tempErrors.description = "Description is required";
      isValid = false;
    } else if (formData.description.length < 20) {
      tempErrors.description = "Description must be at least 20 characters";
      isValid = false;
    }

    // Director validation
    if (!formData.Director.name.trim()) {
      tempErrors.Director.name = "Director name is required";
      isValid = false;
    }

    // Music validation
    if (!formData.Music.name.trim()) {
      tempErrors.Music.name = "Music director name is required";
      isValid = false;
    }

    // Release date validation
    if (!formData.releaseDate) {
      tempErrors.releaseDate = "Release date is required";
      isValid = false;
    }

    // Cast validation
    if (formData.cast.length === 0) {
      tempErrors.cast = "At least one cast member is required";
      isValid = false;
    }

    // Streaming file validation
    if (!formData.streamingUrl) {
      tempErrors.streamingUrl = "Streaming file is required";
      isValid = false;
    } else {
      const validTypes = ["video/mp4", "video/mkv", "video/avi", "video/webm", "video/quicktime"];
      if (!validTypes.includes(formData.streamingUrl.type)) {
        tempErrors.streamingUrl = "Please upload a valid video file (MP4, MKV, AVI, WEBM, MOV)";
        isValid = false;
      } else if (formData.streamingUrl.size > 1024 * 1024 * 1024) { // 1GB limit
        tempErrors.streamingUrl = "Video size should be less than 1GB";
        isValid = false;
      }
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error
      const firstError = document.querySelector(".error-message");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Create FormData object for file uploads
    try {
      const formDataToSend = new FormData();
      // Append all primitive fields
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("language", formData.language);
      formDataToSend.append("releaseDate", formData.releaseDate);
      formDataToSend.append("isPremium", formData.isPremium);
      // Append tags as JSON string (or as multiple fields if backend expects)
      formDataToSend.append("tags", JSON.stringify(formData.tags));
      // Append all video files
      formData.video.forEach((file) => formDataToSend.append("video", file));
      // Append all image files
      formData.image.forEach((file) => formDataToSend.append("image", file));
      // Append Director and Music as JSON strings
      formDataToSend.append("Director", JSON.stringify(formData.Director));
      formDataToSend.append("Music", JSON.stringify(formData.Music));
      // Append cast as JSON string
      formDataToSend.append("cast", JSON.stringify(formData.cast));
      await Apihelper.createMovise(formDataToSend);
    } catch (error) {
      console.log(error);
    }

    // Append all fields

    console.log("Form data to send:", Object.fromEntries(formDataToSend));

    // Here you would typically send the formDataToSend to your backend
    // Example: axios.post('/api/movies', formDataToSend, { headers: { 'Content-Type': 'multipart/form-data' } })
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-900 via-red-900 to-black py-8">
      <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-sm rounded-lg shadow-xl p-6 text-white border border-red-500/30">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300 mb-6">
          Create New Movie
        </h1>

        <style>{scrollbarStyle}</style>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {/* Basic Information */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white mb-1"
              >
                Movie Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border ${
                  errors.name ? "border-red-500" : "border-red-500/50"
                } rounded-md text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                placeholder="Enter movie name"
              />
              {errors.name && (
                <p className="mt-1 text-red-500 text-sm error-message">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Streaming File */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Streaming File <span className="text-red-500">*</span>
              </label>
              <label
                className={`flex flex-col items-center px-4 py-6 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border-2 border-dashed ${
                  errors.streamingUrl ? "border-red-500" : "border-red-500/50"
                } rounded-md cursor-pointer hover:bg-[linear-gradient(to_right,rgba(185,28,28,0.2),rgba(31,41,55,0.8))] transition-all duration-300`}
              >
                <div className="flex flex-col items-center">
                  <svg
                    className="w-8 h-8 text-red-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="text-sm text-red-300 mb-1">
                    Click to upload streaming video file
                  </span>
                  <span className="text-xs text-red-400/70">
                    MP4, MKV, AVI, WEBM, MOV up to 1GB
                  </span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="video/*"
                  onChange={(e) => handleFileUpload("streamingUrl", e)}
                />
                {formData.streamingUrl && (
                  <span className="text-sm text-white/90 mt-2 bg-red-500/20 px-3 py-1 rounded-full">
                    {formData.streamingUrl.name}
                  </span>
                )}
              </label>
              {errors.streamingUrl && (
                <p className="mt-1 text-red-500 text-sm error-message">
                  {errors.streamingUrl}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border border-red-500/50 rounded-md text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="" className="bg-gray-900 text-white">
                    Select language
                  </option>
                  {[
                    "Hindi",
                    "English",
                    "Gujarati",
                    "Tamil",
                    "Telugu",
                    "Malayalam",
                    "Kannada",
                    "Other",
                  ].map((lang) => (
                    <option
                      key={lang}
                      value={lang}
                      className="bg-gray-900 text-white"
                    >
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-white mb-1"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Enter movie description"
                className={`w-full px-4 py-2 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border ${
                  errors.description ? "border-red-500" : "border-red-500/50"
                } rounded-md text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-red-500`}
              />
              {errors.description && (
                <p className="mt-1 text-red-500 text-sm error-message">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Thumbnail <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label
                  className={`flex flex-col items-center px-4 py-6 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border-2 border-dashed ${
                    errors.thumbnail ? "border-red-500" : "border-red-500/50"
                  } rounded-md cursor-pointer hover:bg-[linear-gradient(to_right,rgba(185,28,28,0.2),rgba(31,41,55,0.8))] transition-all duration-300`}
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-8 h-8 text-red-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm text-red-300 mb-1">
                      Click to upload thumbnail
                    </span>
                    <span className="text-xs text-red-400/70">
                      PNG, JPG, WEBP up to 5MB
                    </span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload("thumbnail", e)}
                  />
                  {formData.thumbnail && (
                    <span className="text-sm text-white/90 mt-2 bg-red-500/20 px-3 py-1 rounded-full">
                      {formData.thumbnail.name}
                    </span>
                  )}
                </label>
                {errors.thumbnail && (
                  <p className="mt-1 text-red-500 text-sm error-message">
                    {errors.thumbnail}
                  </p>
                )}
              </div>
              {formData.thumbnailPreview && (
                <div className="w-full md:w-64 h-40 relative group">
                  <img
                    src={formData.thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover rounded-md border-2 border-red-500/30"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          thumbnail: null,
                          thumbnailPreview: "",
                        }))
                      }
                      className="text-white bg-red-500/20 hover:bg-red-500/40 p-2 rounded-full"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quality Files */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
              Video Quality Files
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["720p", "1080p"].map((quality) => (
                <div key={quality}>
                  <label
                    htmlFor={quality}
                    className="block text-sm font-medium text-red-300 mb-1"
                  >
                    {quality} File
                  </label>
                  <label
                    className={`flex flex-col items-center px-4 py-6 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border-2 border-dashed ${
                      errors.qualities[quality]
                        ? "border-red-500"
                        : "border-red-500/50"
                    } rounded-md cursor-pointer hover:bg-[linear-gradient(to_right,rgba(185,28,28,0.2),rgba(31,41,55,0.8))] transition-all duration-300`}
                  >
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-8 h-8 text-red-400 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="text-sm text-red-300 mb-1">
                        Click to upload {quality} file
                      </span>
                      <span className="text-xs text-red-400/70">
                        MP4, MKV, or AVI
                      </span>
                    </div>
                    <input
                      type="file"
                      id={quality}
                      className="hidden"
                      accept="video/*"
                      onChange={(e) =>
                        handleFileUpload(`qualities.${quality}`, e)
                      }
                    />
                    {formData.qualities[quality] && (
                      <span className="text-sm text-white/90 mt-2 bg-red-500/20 px-3 py-1 rounded-full">
                        {formData.qualities[quality].name}
                      </span>
                    )}
                  </label>
                  {errors.qualities[quality] && (
                    <p className="mt-1 text-red-500 text-sm error-message">
                      {errors.qualities[quality]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Director */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-white">Director</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="directorName"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="directorName"
                  value={formData.Director.name}
                  onChange={(e) =>
                    handleNestedChange("Director", "name", e.target.value)
                  }
                  placeholder="Enter director name"
                  className={`w-full px-4 py-2 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border ${
                    errors.Director.name
                      ? "border-red-500"
                      : "border-red-500/50"
                  } rounded-md text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-red-500`}
                />
                {errors.Director.name && (
                  <p className="mt-1 text-red-500 text-sm error-message">
                    {errors.Director.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="directorImg"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Image
                </label>
                <div className="flex items-center space-x-2">
                  <label className="flex-1 flex flex-col items-center px-4 py-2 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border border-red-500/50 rounded-md cursor-pointer hover:bg-[linear-gradient(to_right,rgba(185,28,28,0.2),rgba(31,41,55,0.8))] group transition-all duration-300">
                    <svg
                      className="w-6 h-6 text-red-400 mb-1 group-hover:text-red-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <span className="text-sm text-white group-hover:text-red-300 transition-colors">
                      Upload Image
                    </span>
                    <input
                      type="file"
                      id="directorImg"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileUpload("Director.img", e)}
                    />
                  </label>
                  {formData.Director.imgPreview && (
                    <img
                      src={formData.Director.imgPreview}
                      alt="Director preview"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="directorFrom"
                  className="block text-sm font-medium text-white mb-1"
                >
                  From
                </label>
                <input
                  type="text"
                  id="directorFrom"
                  value={formData.Director.from}
                  onChange={(e) =>
                    handleNestedChange("Director", "from", e.target.value)
                  }
                  placeholder="Enter director's origin"
                  className="w-full px-4 py-2 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border border-red-500/50 rounded-md text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Music */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-white">Music</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="musicName"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="musicName"
                  value={formData.Music.name}
                  onChange={(e) =>
                    handleNestedChange("Music", "name", e.target.value)
                  }
                  placeholder="Enter music director name"
                  className={`w-full px-4 py-2 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border ${
                    errors.Music.name ? "border-red-500" : "border-red-500/50"
                  } rounded-md text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-red-500`}
                />
                {errors.Music.name && (
                  <p className="mt-1 text-red-500 text-sm error-message">
                    {errors.Music.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="musicImg"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Image
                </label>
                <div className="flex items-center space-x-2">
                  <label className="flex-1 flex flex-col items-center px-4 py-2 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border border-red-500/50 rounded-md cursor-pointer hover:bg-[linear-gradient(to_right,rgba(185,28,28,0.2),rgba(31,41,55,0.8))] group transition-all duration-300">
                    <svg
                      className="w-6 h-6 text-red-400 mb-1 group-hover:text-red-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <span className="text-sm text-white group-hover:text-red-300 transition-colors">
                      Upload Image
                    </span>
                    <input
                      type="file"
                      id="musicImg"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileUpload("Music.img", e)}
                    />
                  </label>
                  {formData.Music.imgPreview && (
                    <img
                      src={formData.Music.imgPreview}
                      alt="Music preview"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="musicFrom"
                  className="block text-sm font-medium text-white mb-1"
                >
                  From
                </label>
                <input
                  type="text"
                  id="musicFrom"
                  value={formData.Music.from}
                  onChange={(e) =>
                    handleNestedChange("Music", "from", e.target.value)
                  }
                  placeholder="Enter music director's origin"
                  className="w-full px-4 py-2 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border border-red-500/50 rounded-md text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Cast */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-white">
              Cast Members <span className="text-red-500">*</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label
                  htmlFor="castName"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="castName"
                  value={castInput.name}
                  onChange={(e) =>
                    setCastInput({ ...castInput, name: e.target.value })
                  }
                  placeholder="Enter cast member name"
                  className="w-full px-4 py-2 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border border-red-500/50 rounded-md text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="castImg"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Image
                </label>
                <div className="flex items-center space-x-2">
                  <label className="flex-1 flex flex-col items-center px-4 py-2 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border border-red-500/50 rounded-md cursor-pointer hover:bg-[linear-gradient(to_right,rgba(185,28,28,0.2),rgba(31,41,55,0.8))] group transition-all duration-300">
                    <svg
                      className="w-6 h-6 text-red-400 mb-1 group-hover:text-red-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <span className="text-sm text-white group-hover:text-red-300 transition-colors">
                      Upload Image
                    </span>
                    <input
                      type="file"
                      id="castImg"
                      className="hidden"
                      accept="image/*"
                      onChange={handleCastFileUpload}
                    />
                  </label>
                  {castInput.imgPreview && (
                    <img
                      src={castInput.imgPreview}
                      alt="Cast preview"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="castFrom"
                  className="block text-sm font-medium text-white mb-1"
                >
                  From
                </label>
                <input
                  type="text"
                  id="castFrom"
                  value={castInput.from}
                  onChange={(e) =>
                    setCastInput({ ...castInput, from: e.target.value })
                  }
                  placeholder="Enter cast member's origin"
                  className="w-full px-4 py-2 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border border-red-500/50 rounded-md text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddCast}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 text-white"
            >
              Add Cast Member
            </button>

            {formData.cast.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {formData.cast.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gray-800 border border-gray-700 rounded-md"
                  >
                    {member.img instanceof File ? (
                      <img
                        src={URL.createObjectURL(member.img)}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                    ) : member.img ? (
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-700 mr-3 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-white">{member.name}</p>
                      <p className="text-sm text-gray-400">{member.from}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCast(index)}
                      className="text-red-400 hover:text-white"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.cast && (
              <p className="mt-1 text-red-500 text-sm error-message">
                {errors.cast}
              </p>
            )}
          </div>

          {/* Release Date & Premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Release Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={
                  formData.releaseDate
                    ? formData.releaseDate.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    releaseDate: new Date(e.target.value),
                  })
                }
                className={`w-full px-4 py-2 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border ${
                  errors.releaseDate ? "border-red-500" : "border-red-500/50"
                } rounded-md text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
              />
              {errors.releaseDate && (
                <p className="mt-1 text-red-500 text-sm error-message">
                  {errors.releaseDate}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPremium"
                checked={formData.isPremium}
                onChange={(e) =>
                  setFormData({ ...formData, isPremium: e.target.checked })
                }
                className="h-5 w-5 text-red-600 focus:ring-red-500 border-red-500/50 rounded bg-black/50"
              />
              <label
                htmlFor="isPremium"
                className="ml-2 block text-sm text-red-300"
              >
                Premium Content
              </label>
            </div>
          </div>

          {/* Video Uploads */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white mb-1">
              Upload Videos
            </label>
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={handleVideoUpload}
              className="mb-2"
              value=""
            />
            <div className="flex flex-wrap gap-2">
              {formData.video.map((file, idx) => (
                <div key={idx} className="flex items-center bg-gray-800 px-2 py-1 rounded">
                  <span className="text-white text-xs mr-2">{file.name}</span>
                  <button type="button" onClick={() => removeVideo(idx)} className="text-red-400 hover:text-white">&times;</button>
                </div>
              ))}
            </div>
          </div>

          {/* Image Uploads */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white mb-1">
              Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="mb-2"
              value=""
            />
            <div className="flex flex-wrap gap-2">
              {formData.image.map((file, idx) => (
                <div key={idx} className="flex items-center bg-gray-800 px-2 py-1 rounded">
                  <span className="text-white text-xs mr-2">{file.name}</span>
                  <button type="button" onClick={() => removeImage(idx)} className="text-red-400 hover:text-white">&times;</button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-800 via-red-600 to-red-800 text-white py-3 px-4 rounded-md hover:from-red-700 hover:via-red-500 hover:to-red-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Create Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieCreateForm;

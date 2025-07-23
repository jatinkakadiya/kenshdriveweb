import React, { useState } from "react";
import { Apihelper } from "../../common/service/ApiHelper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MovieCreateForm = ({handleCloseModal}) => {
  const [form, setForm] = useState({
    name: '',
    image: [], // array of files
    video: [], // array of { quality, file }
    isPremium: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    if (type === 'file') {
      if (name === 'image') {
        setForm({ ...form, image: Array.from(files) });
      }
    } else if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleVideoChange = (e, quality) => {
    const file = e.target.files[0];
    setForm(prev => {
      const filtered = prev.video.filter(v => v.quality !== quality);
      return { ...prev, video: [...filtered, { quality, file }] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('isPremium', form.isPremium);

      // Append all images with field name 'image'
      form.image.forEach(imgFile => {
        formData.append('image', imgFile);
      });

      // Append all videos with field name 'video'
      form.video.forEach(({ file }) => {
        formData.append('video', file);
      });

      const res = await Apihelper.createMovise(formData);
      console.log(res)
      if (!res.status===201) throw new Error('Upload failed');
      
     
      
      
      // Reset form after successful submission
      setForm({
        name: '',
        image: [],
        video: [],
        isPremium: false
      });
    } catch (err) {
      toast.error(`Error uploading movie: ${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleCloseModal()
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-red-600 py-4 px-6">
            <h2 className="text-2xl font-bold text-white">Create New Movie</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Movie Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Movie Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Enter movie name"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">Movie Poster</label>
  <div className="mt-1">
    <label className="cursor-pointer block">
      <div className="group relative">
        <div className="w-full h-56 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition">
          {form.image.length > 0 ? (
            <div className="absolute inset-0 flex items-center justify-center p-1">
              <img 
                src={URL.createObjectURL(form.image[0])} 
                alt="Preview" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-4">
              <svg className="w-12 h-12 text-gray-400 group-hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="mt-2 text-sm text-gray-600">Click to upload images or drag and drop</span>
              <span className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</span>
            </div>
          )}
        </div>
        <input
          type="file"
          name="image"
          accept="image/*"
          multiple
          onChange={e => setForm({ ...form, image: Array.from(e.target.files) })}
          required
          className="sr-only"
        />
      </div>
    </label>
    {form.image.length > 0 && (
      <div className="mt-2 text-center text-sm text-gray-500">
        {form.image.length} file(s) selected
      </div>
    )}
  </div>
</div>

            {/* Video Quality Uploads */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Video Files</label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 720p */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <label className="block text-sm font-medium text-gray-700 mb-2">720p Version</label>
                  <div className="flex items-center space-x-4">
                    <label className="flex-1">
                      <div className="relative">
                        <div className="border-2 border-dashed border-gray-300 rounded-md px-3 py-8 text-center hover:border-gray-400 transition">
                          {form.video.find(v => v.quality === '720p') ? (
                            <div className="text-green-600 flex items-center justify-center">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              File Selected
                            </div>
                          ) : (
                            <div className="text-gray-600">
                              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              <span className="mt-2 block text-sm">Upload 720p Video</span>
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          name="video720"
                          accept="video/*"
                          onChange={e => handleVideoChange(e, '720p')}
                          required
                          className="sr-only"
                        />
                      </div>
                    </label>
                  </div>
                </div>

                {/* 1080p */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <label className="block text-sm font-medium text-gray-700 mb-2">1080p Version</label>
                  <div className="flex items-center space-x-4">
                    <label className="flex-1">
                      <div className="relative">
                        <div className="border-2 border-dashed border-gray-300 rounded-md px-3 py-8 text-center hover:border-gray-400 transition">
                          {form.video.find(v => v.quality === '1080p') ? (
                            <div className="text-green-600 flex items-center justify-center">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              File Selected
                            </div>
                          ) : (
                            <div className="text-gray-600">
                              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              <span className="mt-2 block text-sm">Upload 1080p Video</span>
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          name="video1080"
                          accept="video/*"
                          onChange={e => handleVideoChange(e, '1080p')}
                          required
                          className="sr-only"
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isPremium"
                checked={form.isPremium}
                onChange={handleChange}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Premium Content
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                createMovise
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieCreateForm;
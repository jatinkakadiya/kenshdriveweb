import React, { useState } from 'react';

// Static movie data for testing
const staticMovies = [
  {
    _id: '1',
    name: 'Jawan',
    thumbnail: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/jawan-et00330424-1693892482.jpg',
    category: 'Action'
  },
  {
    _id: '2',
    name: 'Animal',
    thumbnail: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/animal-et00311762-1701248935.jpg',
    category: 'Drama'
  },
  {
    _id: '3',
    name: 'Dunki',
    thumbnail: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/dunki-et00326964-1702533315.jpg',
    category: 'Comedy'
  },
  {
    _id: '4',
    name: 'Tiger 3',
    thumbnail: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/tiger-3-et00313411-1699446882.jpg',
    category: 'Action'
  },
  {
    _id: '5',
    name: '12th Fail',
    thumbnail: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/12th-fail-et00363787-1698316138.jpg',
    category: 'Drama'
  },
  {
    _id: '6',
    name: 'Sam Bahadur',
    thumbnail: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/sam-bahadur-et00310187-1701434953.jpg',
    category: 'Biography'
  }
];

// Static slider data for testing
const staticSliders = [
  {
    _id: 's1',
    img: 'https://assets-in.bmscdn.com/promotions/cms/creatives/1703143408556_webbannernew.jpg',
    MoviesId: {
      _id: '1',
      name: 'Jawan'
    }
  },
  {
    _id: 's2',
    img: 'https://assets-in.bmscdn.com/promotions/cms/creatives/1703142597909_dunkinew.jpg',
    MoviesId: {
      _id: '3',
      name: 'Dunki'
    }
  },
  {
    _id: 's3',
    img: 'https://assets-in.bmscdn.com/promotions/cms/creatives/1702980901003_animalweb.jpg',
    MoviesId: {
      _id: '2',
      name: 'Animal'
    }
  }
];

const SliderGallery = () => {
  const [sliders, setSliders] = useState(staticSliders);
  const [movies] = useState(staticMovies);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formData, setFormData] = useState({
    img: null,
    imgPreview: '',
    MoviesId: ''
  });
  const [errors, setErrors] = useState({
    img: '',
    MoviesId: ''
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          img: 'Image size should be less than 5MB'
        }));
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          img: 'Please upload a valid image (JPG, PNG, or WEBP)'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          img: file,
          imgPreview: reader.result
        }));
        setErrors(prev => ({
          ...prev,
          img: ''
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setFormData(prev => ({
      ...prev,
      MoviesId: movie._id
    }));
    setErrors(prev => ({
      ...prev,
      MoviesId: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {
      img: '',
      MoviesId: ''
    };
    let isValid = true;

    if (!formData.img) {
      newErrors.img = 'Slider image is required';
      isValid = false;
    }

    if (!formData.MoviesId) {
      newErrors.MoviesId = 'Please select a movie';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Create a new slider with static data
      const newSlider = {
        _id: 's' + (sliders.length + 1),
        img: formData.imgPreview, // Using the preview URL for demo
        MoviesId: {
          _id: formData.MoviesId,
          name: movies.find(m => m._id === formData.MoviesId)?.name
        }
      };

      // Update sliders state
      setSliders([...sliders, newSlider]);
      
      // Reset form
      setFormData({
        img: null,
        imgPreview: '',
        MoviesId: ''
      });
      setSelectedMovie(null);

    } catch (error) {
      console.error('Error creating slider:', error);
    }
  };

  const handleDelete = (sliderId) => {
    setSliders(sliders.filter(slider => slider._id !== sliderId));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-900 via-red-900 to-black py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Form Section */}
        <div className="bg-black/60 backdrop-blur-sm rounded-lg shadow-xl p-6 text-white border border-red-500/30 mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300 mb-6">
            Add New Slider
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Slider Image <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className={`flex flex-col items-center px-4 py-6 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border-2 border-dashed ${errors.img ? 'border-red-500' : 'border-red-500/50'} rounded-md cursor-pointer hover:bg-[linear-gradient(to_right,rgba(185,28,28,0.2),rgba(31,41,55,0.8))] transition-all duration-300`}>
                    <div className="flex flex-col items-center">
                      <svg className="w-8 h-8 text-red-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-red-300 mb-1">Click to upload slider image</span>
                      <span className="text-xs text-red-400/70">PNG, JPG, WEBP up to 5MB</span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    {formData.img && (
                      <span className="text-sm text-white/90 mt-2 bg-red-500/20 px-3 py-1 rounded-full">
                        {formData.img.name}
                      </span>
                    )}
                  </label>
                  {errors.img && <p className="mt-1 text-red-500 text-sm error-message">{errors.img}</p>}
                </div>
                {formData.imgPreview && (
                  <div className="w-full md:w-64 h-40 relative group">
                    <img 
                      src={formData.imgPreview} 
                      alt="Slider preview" 
                      className="w-full h-full object-cover rounded-md border-2 border-red-500/30"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, img: null, imgPreview: '' }))}
                        className="text-white bg-red-500/20 hover:bg-red-500/40 p-2 rounded-full"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Movie Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Select Movie <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map(movie => (
                  <div
                    key={movie._id}
                    onClick={() => handleMovieSelect(movie)}
                    className={`relative group cursor-pointer rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 ${selectedMovie?._id === movie._id ? 'ring-2 ring-red-500' : ''}`}
                  >
                    <img
                      src={movie.thumbnail}
                      alt={movie.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end ${selectedMovie?._id === movie._id ? 'bg-red-500/20' : ''}`}>
                      <h3 className="text-white font-medium truncate">{movie.name}</h3>
                      <p className="text-white/70 text-sm">{movie.category}</p>
                    </div>
                  </div>
                ))}
              </div>
              {errors.MoviesId && <p className="mt-1 text-red-500 text-sm error-message">{errors.MoviesId}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-800 via-red-600 to-red-800 text-white py-3 px-4 rounded-md hover:from-red-700 hover:via-red-500 hover:to-red-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Add to Slider
              </button>
            </div>
          </form>
        </div>

        {/* Existing Sliders Gallery */}
        <div className="bg-black/60 backdrop-blur-sm rounded-lg shadow-xl p-6 text-white border border-red-500/30">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300 mb-6">
            Current Sliders
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sliders.map((slider, index) => (
              <div key={slider._id} className="relative group rounded-lg overflow-hidden">
                <img
                  src={slider.img}
                  alt={`Slider ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-medium truncate">{slider.MoviesId.name}</h3>
                  <button
                    onClick={() => handleDelete(slider._id)}
                    className="mt-2 bg-red-500/20 hover:bg-red-500/40 text-white px-4 py-2 rounded-md transition-colors duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderGallery; 
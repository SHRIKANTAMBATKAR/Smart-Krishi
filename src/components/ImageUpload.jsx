import { useState, useRef, useCallback } from 'react';
import { FiUploadCloud, FiX, FiImage } from 'react-icons/fi';

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_SIZE_MB = 10;

function ImageUpload({ onImageSelect }) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Unsupported file type. Please upload JPG, JPEG, or PNG images.');
      return false;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File too large. Maximum size is ${MAX_SIZE_MB}MB.`);
      return false;
    }
    setError('');
    return true;
  };

  const handleFile = useCallback(
    (file) => {
      if (!file || !validateFile(file)) return;

      setFileName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      onImageSelect(file);
    },
    [onImageSelect]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const clearImage = () => {
    setPreview(null);
    setFileName('');
    setError('');
    onImageSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {!preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 ${dragActive
              ? 'border-primary-500 bg-primary-50 scale-[1.02]'
              : 'border-gray-300 bg-white hover:border-primary-400 hover:bg-primary-50/50'
            }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleInputChange}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${dragActive
                  ? 'bg-primary-200 text-primary-600'
                  : 'bg-gray-100 text-gray-400'
                }`}
            >
              <FiUploadCloud size={28} />
            </div>

            <div>
              <p className="text-gray-700 font-semibold">
                {dragActive ? 'Drop your image here' : 'Drag & drop your crop image'}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                or click to browse &nbsp;·&nbsp; JPG, JPEG, PNG (max {MAX_SIZE_MB}MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden shadow-xl animate-fade-in bg-white">
          <img
            src={preview}
            alt="Crop preview"
            className="w-full h-64 object-cover"
          />
          <div className="p-4 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FiImage className="text-primary-500" />
              <span className="truncate max-w-[200px]">{fileName}</span>
            </div>
            <button
              onClick={clearImage}
              className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors"
              aria-label="Remove image"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-500 text-center animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
}

export default ImageUpload;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import { predictDisease, fetchDiseases, searchDiseases } from '../services/api';
import { FiAlertCircle, FiSearch, FiChevronDown, FiChevronUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function DiseaseDetection() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Disease Library state
  const [diseases, setDiseases] = useState([]);
  const [diseaseLoading, setDiseaseLoading] = useState(false);
  const [diseaseError, setDiseaseError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedId, setExpandedId] = useState(null);

  // Fetch diseases on mount and page change
  useEffect(() => {
    loadDiseases();
  }, [currentPage]);

  const loadDiseases = async () => {
    setDiseaseLoading(true);
    setDiseaseError('');
    try {
      const data = searchQuery
        ? await searchDiseases(searchQuery, currentPage)
        : await fetchDiseases(currentPage);
      setDiseases(data.data || []);
      setTotalPages(data.last_page || 1);
    } catch (err) {
      setDiseaseError(err.message || 'Failed to load diseases.');
    } finally {
      setDiseaseLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    loadDiseases();
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setLoading(true);
    setError('');
    try {
      const result = await predictDisease(selectedImage);
      navigate('/result', { state: { result } });
    } catch (err) {
      setError(err.message || 'Unable to process image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="max-w-4xl mx-auto py-8 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            🔬 AI-Powered Analysis
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Crop Disease <span className="gradient-text">Detection</span>
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Upload a clear photo of your crop&apos;s leaf and our AI will identify
            any diseases and suggest treatments.
          </p>
        </div>

        {/* Upload component */}
        <div className="max-w-2xl mx-auto">
          <ImageUpload onImageSelect={setSelectedImage} />
        </div>

        {/* Analyze button */}
        {selectedImage && (
          <div className="text-center mt-8 animate-slide-up">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="btn-primary text-lg px-10 py-4 shadow-lg shadow-primary-500/20"
            >
              🔍 Analyze Image
            </button>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mt-6 mx-auto max-w-md bg-red-50 text-red-700 px-5 py-4 rounded-xl flex items-start gap-3 animate-fade-in">
            <FiAlertCircle className="mt-0.5 flex-shrink-0" size={18} />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Tips */}
        <div className="mt-12 max-w-2xl mx-auto bg-primary-50/60 rounded-2xl p-6 border border-primary-100">
          <h3 className="font-semibold text-primary-800 mb-3">📸 Tips for best results</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              Use a clear, well-lit photo of the affected leaf
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              Make sure the leaf fills most of the frame
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              Avoid blurry or heavily shadowed images
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              Supported formats: JPG, JPEG, PNG (max 10MB)
            </li>
          </ul>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* Disease Library - Powered by Perenual API */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              🦠 Disease Library
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Browse Plant <span className="gradient-text">Diseases & Pests</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Search our comprehensive database of plant diseases and pests.
              Find descriptions, solutions, and affected host plants.
            </p>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search diseases... e.g. Powdery mildew, Rust, Blight"
                className="w-full pl-12 pr-28 py-4 rounded-2xl border-2 border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-700 bg-white shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-primary-500/20 transition-all"
              >
                Search
              </button>
            </div>
          </form>

          {/* Disease cards */}
          {diseaseLoading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-3 text-primary-600">
                <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="font-medium">Loading diseases...</span>
              </div>
            </div>
          ) : diseaseError ? (
            <div className="max-w-md mx-auto bg-red-50 text-red-700 px-5 py-4 rounded-xl flex items-start gap-3 animate-fade-in">
              <FiAlertCircle className="mt-0.5 flex-shrink-0" size={18} />
              <p className="text-sm">{diseaseError}</p>
            </div>
          ) : diseases.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No diseases found. Try a different search.</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {diseases.map((disease) => (
                  <DiseaseCard
                    key={disease.id}
                    disease={disease}
                    isExpanded={expandedId === disease.id}
                    onToggle={() => setExpandedId(expandedId === disease.id ? null : disease.id)}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white border-2 border-gray-200 text-gray-600 hover:border-primary-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <FiChevronLeft size={18} /> Previous
                </button>
                <span className="text-sm text-gray-500 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white border-2 border-gray-200 text-gray-600 hover:border-primary-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Next <FiChevronRight size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────
// Disease Card sub-component
// ─────────────────────────────────────────────────────
function DiseaseCard({ disease, isExpanded, onToggle }) {
  const thumbnail = disease.images?.[0]?.thumbnail || disease.images?.[0]?.small_url;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
      {/* Header row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50/80 transition-colors"
      >
        {/* Image */}
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={disease.common_name}
            className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-gray-200"
          />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center flex-shrink-0 text-2xl">
            🦠
          </div>
        )}
        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-lg truncate">{disease.common_name}</h3>
          <p className="text-sm text-gray-500 italic truncate">{disease.scientific_name}</p>
          {disease.host && disease.host.length > 0 && (
            <p className="text-xs text-primary-600 mt-1 truncate">
              Affects: {disease.host.slice(0, 4).join(', ')}{disease.host.length > 4 ? '...' : ''}
            </p>
          )}
        </div>
        {/* Expand icon */}
        <div className="flex-shrink-0 text-gray-400">
          {isExpanded ? <FiChevronUp size={22} /> : <FiChevronDown size={22} />}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-gray-100 animate-fade-in">
          {/* Disease images */}
          {disease.images && disease.images.length > 0 && (
            <div className="flex gap-3 overflow-x-auto py-4 -mx-1 px-1">
              {disease.images.slice(0, 5).map((img, idx) => (
                <img
                  key={idx}
                  src={img.small_url || img.regular_url || img.original_url}
                  alt={`${disease.common_name} ${idx + 1}`}
                  className="w-32 h-24 rounded-xl object-cover flex-shrink-0 border border-gray-200 hover:scale-105 transition-transform cursor-pointer"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ))}
            </div>
          )}

          {/* Description */}
          {disease.description && disease.description.length > 0 && (
            <div className="mt-3">
              <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                📋 Description
              </h4>
              {disease.description.map((desc, idx) => (
                <div key={idx} className="mb-3">
                  <p className="text-sm font-medium text-gray-700">{desc.subtitle}</p>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{desc.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Solutions */}
          {disease.solution && disease.solution.length > 0 && (
            <div className="mt-4 bg-green-50/60 rounded-xl p-4 border border-green-100">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                💊 Treatment & Solutions
              </h4>
              {disease.solution.map((sol, idx) => (
                <div key={idx} className="mb-3">
                  <p className="text-sm font-medium text-green-700">{sol.subtitle}</p>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed whitespace-pre-line">{sol.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Host plants */}
          {disease.host && disease.host.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                🌱 Affected Plants
              </h4>
              <div className="flex flex-wrap gap-2">
                {disease.host.map((plant, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full border border-primary-100"
                  >
                    {plant}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DiseaseDetection;

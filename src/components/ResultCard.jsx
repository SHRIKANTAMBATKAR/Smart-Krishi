import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi';

function ResultCard({ result }) {
  const navigate = useNavigate();

  if (!result) return null;

  const { crop, disease, confidence, treatment, description, prevention } = result;

  // Parse numeric confidence
  const conf = parseFloat(confidence);
  const isHealthy = disease?.toLowerCase().includes('healthy');

  // Confidence color
  const getConfColor = () => {
    if (conf >= 90) return 'text-green-500';
    if (conf >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getConfBg = () => {
    if (conf >= 90) return 'from-green-400 to-emerald-500';
    if (conf >= 70) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  return (
    <div className="max-w-xl mx-auto animate-slide-up">
      <div className="card overflow-hidden">
        {/* Status banner */}
        <div
          className={`-mx-6 -mt-6 px-6 py-4 mb-6 flex items-center gap-3 ${isHealthy
            ? 'bg-gradient-to-r from-green-50 to-emerald-50'
            : 'bg-gradient-to-r from-red-50 to-orange-50'
            }`}
        >
          {isHealthy ? (
            <FiCheckCircle className="text-green-500 text-xl flex-shrink-0" />
          ) : (
            <FiAlertTriangle className="text-red-500 text-xl flex-shrink-0" />
          )}
          <h3 className={`font-bold text-lg ${isHealthy ? 'text-green-700' : 'text-red-700'}`}>
            {isHealthy ? 'Your crop looks healthy!' : 'Disease Detected'}
          </h3>
        </div>

        {/* Details grid */}
        <div className="space-y-5">
          {/* Crop */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">Crop</span>
            <span className="font-semibold text-gray-800 bg-primary-50 px-3 py-1 rounded-lg text-sm">
              🌿 {crop}
            </span>
          </div>

          {/* Disease */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">Disease</span>
            <span
              className={`font-semibold px-3 py-1 rounded-lg text-sm ${isHealthy
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
                }`}
            >
              {disease}
            </span>
          </div>

          {/* Confidence */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 font-medium">Confidence</span>
              <span className={`font-bold text-lg ${getConfColor()}`}>{confidence}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${getConfBg()} transition-all duration-1000 ease-out`}
                style={{ width: `${Math.min(conf, 100)}%` }}
              />
            </div>
          </div>

          {/* Description */}
          {description && (
            <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-2 text-sm">
                📋 Disease Description
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
            </div>
          )}

          {/* Treatment */}
          {treatment && !isHealthy && (
            <div className="bg-gradient-to-br from-primary-50 to-emerald-50 rounded-xl p-4 border border-primary-100">
              <h4 className="font-semibold text-primary-800 mb-2 text-sm">
                💊 Recommended Treatment
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">{treatment}</p>
            </div>
          )}

          {/* Prevention */}
          {prevention && !isHealthy && (
            <div className="bg-yellow-50/60 rounded-xl p-4 border border-yellow-100">
              <h4 className="font-semibold text-yellow-800 mb-2 text-sm">
                🛡️ Prevention Tips
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">{prevention}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            onClick={() => navigate('/detect')}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            <FiRefreshCw size={16} />
            Analyze Another
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
          >
            <FiHome size={16} />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;

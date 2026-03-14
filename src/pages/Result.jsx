import { useLocation, Navigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';

function Result() {
  const location = useLocation();
  const result = location.state?.result;

  // Redirect if accessed directly without data
  if (!result) {
    return <Navigate to="/detect" replace />;
  }

  return (
    <div className="py-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          📊 Analysis Complete
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Detection <span className="gradient-text">Results</span>
        </h1>
        <p className="text-gray-500">
          Here is what our AI found in your crop image.
        </p>
      </div>

      {/* Result card */}
      <ResultCard result={result} />
    </div>
  );
}

export default Result;

import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

function TechniqueCard({ icon, title, description, details }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card group">
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-emerald-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed mb-4">{description}</p>

      {/* Toggle Details */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-primary-600 text-sm font-semibold flex items-center gap-1 hover:text-primary-700 transition-colors"
      >
        {expanded ? 'Show Less' : 'Read More'}
        {expanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </button>

      {/* Expandable Details */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {details}
          </p>
        </div>
      )}
    </div>
  );
}

export default TechniqueCard;

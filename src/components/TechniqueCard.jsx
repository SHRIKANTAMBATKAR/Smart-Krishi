import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

function TechniqueCard({ icon, title, description, details, image }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card group overflow-hidden p-0">
      {/* Card Image Banner */}
      <div className="relative w-full h-44 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        {/* Icon badge on image */}
        <div className="absolute bottom-3 left-4 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-2xl shadow-lg border border-white/60">
          {icon}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>

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
    </div>
  );
}

export default TechniqueCard;

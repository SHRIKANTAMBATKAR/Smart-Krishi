import { useState } from 'react';
import TechniqueCard from '../components/TechniqueCard';
import { FiPlay, FiSearch, FiLoader, FiDroplet, FiSun, FiShield, FiCloud, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { GiFarmer, GiPlantSeed, GiWateringCan, GiChemicalDrop } from 'react-icons/gi';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

const techniques = [
  {
    icon: '🧪',
    title: 'Jeevamrut Preparation',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=300&fit=crop&auto=format',
    description:
      'A powerful organic soil enricher made from cow dung, cow urine, jaggery, and gram flour that boosts microbial activity.',
    details: `Ingredients:
• 10 kg fresh cow dung
• 10 litres cow urine
• 2 kg jaggery (gul)
• 2 kg gram flour (besan)
• 200 litres water
• A handful of soil from your farm

Method:
1. Mix all ingredients in a 200-litre drum.
2. Stir the mixture clockwise every morning and evening for 5-7 days.
3. Keep the drum covered with a cloth (not airtight).
4. After fermentation, dilute 20 litres in 200 litres of water.
5. Apply to the soil near plant roots once a month.`,
  },
  {
    icon: '🌱',
    title: 'Beejamrut Seed Treatment',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&h=300&fit=crop&auto=format',
    description:
      'An organic seed treatment method that protects seeds from soil-borne diseases and improves germination.',
    details: `Ingredients:
• 5 kg fresh cow dung
• 5 litres cow urine
• 50 grams lime
• A handful of farm soil
• 20 litres water

Method:
1. Mix cow dung and cow urine in water.
2. Add lime and soil, stir well.
3. Soak seeds in this solution for 20 minutes.
4. Dry the seeds in shade before sowing.
5. This protects seeds from fungal infections and boosts early growth.`,
  },
  {
    icon: '🐛',
    title: 'Organic Pest Control',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=300&fit=crop&auto=format',
    description:
      'Natural methods to control pests without harmful chemicals, keeping crops safe and eco-friendly.',
    details: `Neem Oil Spray:
• Mix 5ml neem oil with 1 litre water and a few drops of liquid soap.
• Spray on affected plants every 7-10 days.

Garlic-Chilli Spray:
• Grind 10 garlic cloves and 5 green chillies.
• Soak in 1 litre water overnight.
• Strain and spray on crops.

Companion Planting:
• Plant marigolds near vegetables to repel pests.
• Basil near tomatoes keeps whiteflies away.
• Mint deters aphids and ants.`,
  },
  {
    icon: '♻️',
    title: 'Composting',
    image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=600&h=300&fit=crop&auto=format',
    description:
      'Turn farm waste into nutrient-rich compost that improves soil health and reduces fertilizer costs.',
    details: `Vermicomposting Method:
1. Prepare a compost pit (3ft × 3ft × 3ft).
2. Layer dry leaves, crop residue, and kitchen waste.
3. Add cow dung slurry between layers.
4. Introduce earthworms (about 1000 per pit).
5. Keep the pit moist but not waterlogged.
6. Cover with gunny bags or dried leaves.
7. Turn the pile every 2 weeks.
8. Compost is ready in 60-90 days when it turns dark and crumbly.`,
  },
  {
    icon: '🌾',
    title: 'Mulching',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=300&fit=crop&auto=format',
    description:
      'Covering soil with organic material to retain moisture, suppress weeds, and regulate soil temperature.',
    details: `Types of Mulch:
• Straw mulch — ideal for vegetables and fruit crops.
• Dried leaves — good for flower beds and around trees.
• Grass clippings — excellent nitrogen source.

How to Apply:
1. Clear weeds from around the plant base.
2. Spread mulch material 3-4 inches thick.
3. Leave a small gap around the stem to prevent rotting.
4. Replenish mulch every few weeks as it decomposes.

Benefits:
• Reduces water evaporation by up to 70%.
• Keeps soil cool in summer and warm in winter.
• Adds organic matter to the soil as it breaks down.`,
  },
  {
    icon: '🔄',
    title: 'Crop Rotation',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=300&fit=crop&auto=format',
    description:
      'Rotating crops across seasons prevents soil depletion and breaks pest and disease cycles naturally.',
    details: `Rotation Plan (Example):
Season 1 — Legumes (moong, groundnut) → fix nitrogen in soil.
Season 2 — Cereals (wheat, rice) → consume nitrogen.
Season 3 — Vegetables (tomato, brinjal) → benefit from organic matter.
Season 4 — Cover crops or green manure → restore soil.

Key Rules:
• Never plant the same crop family in the same spot two seasons in a row.
• Follow heavy feeders with light feeders or nitrogen fixers.
• Include a legume crop at least once in every rotation cycle.
• Combine with green manuring for maximum soil health benefits.`,
  },
];

const videos = [
  { id: 'XFBMF4OFS5A', title: 'Jeevamrut Preparation', description: 'A powerful organic soil enricher made from cow dung, cow urine, jaggery, and gram flour.' },
  { id: '5qkLjHMeQf8', title: 'Beejamrut Seed Treatment', description: 'An organic seed treatment method that protects seeds from soil-borne diseases.' },
  { id: 'b-SigV4YabY', title: 'Organic Pest Control', description: 'Natural methods to control pests without harmful chemicals, keeping crops safe.' },
  { id: 'nxTzuasQLFo', title: 'Composting', description: 'Turn farm waste into nutrient-rich compost that improves soil health.' },
  { id: 'Db0a_4lyCH8', title: 'Mulching', description: 'Covering soil with organic material to retain moisture and suppress weeds.' },
  { id: 'Nk83ASvbNKk', title: 'Crop Rotation', description: 'Rotating crops across seasons prevents soil depletion and breaks pest cycles.' },
];

const RESULT_CARDS = [
  { key: 'fertilizer', icon: <GiChemicalDrop size={22} />, label: 'Fertilizer Advice', color: 'from-emerald-500 to-green-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  { key: 'farming_method', icon: <GiFarmer size={22} />, label: 'Farming Method', color: 'from-teal-500 to-cyan-600', bg: 'bg-teal-50', border: 'border-teal-200' },
  { key: 'irrigation', icon: <FiDroplet size={22} />, label: 'Irrigation Schedule', color: 'from-blue-500 to-cyan-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  { key: 'disease_prevention', icon: <FiShield size={22} />, label: 'Disease Prevention', color: 'from-rose-500 to-pink-600', bg: 'bg-rose-50', border: 'border-rose-200' },
  { key: 'weather_advice', icon: <FiCloud size={22} />, label: 'Weather-Based Advice', color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50', border: 'border-amber-200' },
];

function RecommendationSection() {
  const [form, setForm] = useState({ crop: '', soil: '', season: '', location: '', method: '', problem: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.crop || !form.soil || !form.season) {
      setError('Please fill in at least Crop, Soil Type, and Season.');
      return;
    }
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/farming-recommendation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get recommendation');
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ crop: '', soil: '', season: '', location: '', method: '', problem: '' });
    setResult(null);
    setError('');
  };

  return (
    <section style={{ marginBottom: '5rem' }}>
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          🤖 AI-Powered
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Personalized Farming <span className="gradient-text">Recommendation</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
          Tell us about your farm and get instant AI-generated guidance — tailored to your crop, soil, season, and specific problems.
        </p>
      </div>

      <div
        style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 40%, #f0fdfa 100%)',
          border: '1.5px solid #bbf7d0',
          borderRadius: '1.5rem',
          boxShadow: '0 8px 40px 0 rgba(16,185,129,0.10)',
          padding: '2.5rem 2rem',
        }}
      >
        {/* Input Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: result || error ? '2rem' : 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {/* Crop Name */}
            <div>
              <label style={labelStyle}>🌾 Crop Name <span style={{ color: '#ef4444' }}>*</span></label>
              <input
                id="rec-crop"
                name="crop"
                value={form.crop}
                onChange={handleChange}
                placeholder="e.g. Tomato, Wheat, Rice"
                style={inputStyle}
                required
              />
            </div>

            {/* Soil Type */}
            <div>
              <label style={labelStyle}>🟫 Soil Type <span style={{ color: '#ef4444' }}>*</span></label>
              <select name="soil" id="rec-soil" value={form.soil} onChange={handleChange} style={inputStyle} required>
                <option value="">Select soil type</option>
                <option>Black Soil (Regur)</option>
                <option>Red Soil</option>
                <option>Alluvial Soil</option>
                <option>Sandy Soil</option>
                <option>Loamy Soil</option>
                <option>Clay Soil</option>
                <option>Laterite Soil</option>
                <option>Saline / Alkaline Soil</option>
              </select>
            </div>

            {/* Season */}
            <div>
              <label style={labelStyle}>🗓️ Season <span style={{ color: '#ef4444' }}>*</span></label>
              <select name="season" id="rec-season" value={form.season} onChange={handleChange} style={inputStyle} required>
                <option value="">Select season</option>
                <option>Monsoon (Jun–Oct)</option>
                <option>Winter ( Nov–Mar)</option>
                <option>Summer (Mar–Jun)</option>
                <option>Year-round</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label style={labelStyle}>📍 Location / Region</label>
              <input
                id="rec-location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Pune, Maharashtra"
                style={inputStyle}
              />
            </div>

            {/* Farming Method */}
            <div>
              <label style={labelStyle}>🌿 Farming Method</label>
              <select name="method" id="rec-method" value={form.method} onChange={handleChange} style={inputStyle}>
                <option value="">Select method</option>
                <option>Organic / Natural</option>
                <option>Modern / Conventional</option>
                <option>Zero Budget Natural Farming (ZBNF)</option>
                <option>Integrated Farming</option>
                <option>Biodynamic Farming</option>
              </select>
            </div>

            {/* Problem Faced */}
            <div>
              <label style={labelStyle}>⚠️ Problem Faced</label>
              <input
                id="rec-problem"
                name="problem"
                value={form.problem}
                onChange={handleChange}
                placeholder="e.g. Yellowing leaves, pest attack"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginTop: '1rem', fontSize: '0.9rem' }}>
              <FiAlertCircle size={18} /> {error}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button
              id="get-recommendation-btn"
              type="submit"
              disabled={loading}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'linear-gradient(135deg, #16a34a, #059669)',
                color: '#fff', border: 'none', borderRadius: '0.875rem',
                padding: '0.75rem 1.75rem', fontWeight: 700, fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.75 : 1,
                boxShadow: '0 4px 15px rgba(16,163,74,0.35)',
                transition: 'all 0.2s',
              }}
            >
              {loading ? <FiLoader size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <FiSearch size={18} />}
              {loading ? 'Getting AI Advice…' : 'Get My Recommendation'}
            </button>
            {(result || form.crop) && (
              <button
                type="button"
                onClick={handleReset}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  background: '#fff', color: '#374151', border: '1.5px solid #d1d5db',
                  borderRadius: '0.875rem', padding: '0.75rem 1.5rem',
                  fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                ↺ Reset
              </button>
            )}
          </div>
        </form>

        {/* Results */}
        {result && (
          <div style={{ animation: 'fadeSlideIn 0.5s ease-out' }}>
            {/* Summary banner */}
            <div style={{
              background: 'linear-gradient(135deg, #065f46, #059669)',
              borderRadius: '1rem', padding: '1.25rem 1.5rem',
              color: '#fff', marginBottom: '1.5rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <FiCheckCircle size={24} style={{ flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: 700, fontSize: '1.05rem', margin: 0 }}>
                  AI Recommendation Ready — {form.crop} · {form.soil} · {form.season}
                </p>
                <p style={{ fontSize: '0.85rem', opacity: 0.85, margin: '0.1rem 0 0' }}>
                  Powered by Gemini AI · Personalized for your farm
                </p>
              </div>
            </div>

            {/* Result Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              {RESULT_CARDS.map(({ key, icon, label, color, bg, border }) => (
                <div key={key} style={{
                  background: '#fff', borderRadius: '1rem', border: `1.5px solid`,
                  borderColor: border.replace('border-', '').replace('-200', ''),
                  padding: '1.25rem',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                    <div style={{
                      background: `linear-gradient(135deg, var(--tw-gradient-from, #10b981), var(--tw-gradient-to, #059669))`,
                      backgroundImage: `linear-gradient(135deg, ${getGradientColors(color)})`,
                      color: '#fff', borderRadius: '0.625rem',
                      width: '38px', height: '38px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {icon}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1f2937' }}>{label}</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: '1.65', margin: 0 }}>
                    {result[key]}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Tips */}
            {result.quick_tips && result.quick_tips.length > 0 && (
              <div style={{
                background: '#fff', borderRadius: '1rem', border: '1.5px solid #d1fae5',
                padding: '1.25rem 1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>💡</span>
                  <span style={{ fontWeight: 700, color: '#1f2937', fontSize: '0.95rem' }}>Quick Expert Tips</span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.5rem' }}>
                  {result.quick_tips.map((tip, i) => (
                    <li key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                      fontSize: '0.875rem', color: '#374151', lineHeight: '1.6',
                    }}>
                      <span style={{ color: '#16a34a', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

function getGradientColors(cls) {
  const map = {
    'from-emerald-500 to-green-600': '#10b981, #16a34a',
    'from-teal-500 to-cyan-600': '#14b8a6, #0891b2',
    'from-blue-500 to-cyan-600': '#3b82f6, #0891b2',
    'from-rose-500 to-pink-600': '#f43f5e, #db2777',
    'from-amber-500 to-orange-600': '#f59e0b, #ea580c',
  };
  return map[cls] || '#16a34a, #059669';
}

const labelStyle = {
  display: 'block', fontWeight: 600, fontSize: '0.82rem',
  color: '#374151', marginBottom: '0.4rem', letterSpacing: '0.01em',
};

const inputStyle = {
  width: '100%', padding: '0.7rem 0.9rem',
  border: '1.5px solid #d1d5db', borderRadius: '0.75rem',
  fontSize: '0.92rem', color: '#1f2937', background: '#fff',
  outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
  appearance: 'auto',
};

function NaturalFarming() {
  return (
    <div className="max-w-7xl mx-auto py-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          🌿 Organic Practices
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Natural Farming <span className="gradient-text">Guide</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Learn time-tested organic farming techniques to grow healthier crops
          without chemicals.
        </p>
      </div>

      {/* ── Personalized Recommendation System ── */}
      <div className="px-4 md:px-0">
        <RecommendationSection />
      </div>

      {/* Technique Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
        {techniques.map((t) => (
          <TechniqueCard key={t.title} {...t} />
        ))}
      </div>

      {/* YouTube Videos Section */}
      <div className="mt-20 px-4 md:px-0">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <FiPlay size={14} /> Video Tutorials
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Learn from <span className="gradient-text">Experts</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Watch these curated videos to master natural farming techniques with visual, step-by-step guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="card group overflow-hidden p-0">
              <div className="relative aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-t-2xl"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-primary-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NaturalFarming;

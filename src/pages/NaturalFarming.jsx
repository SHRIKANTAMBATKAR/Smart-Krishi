import TechniqueCard from '../components/TechniqueCard';
import { FiPlay } from 'react-icons/fi';

const techniques = [
  {
    icon: '🧪',
    title: 'Jeevamrut Preparation',
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
  {
    id: 'jMKl0-Y4UGY',
    title: 'Zero Budget Natural Farming – Subhash Palekar',
    description: 'Learn the fundamentals of ZBNF from legendary Padma Shri awardee Subhash Palekar.',
  },
  {
    id: '2b3RNMrIAXA',
    title: 'How to Make Jeevamrut at Home',
    description: 'Step-by-step guide to preparing Jeevamrut – the most powerful organic fertilizer.',
  },
  {
    id: 'Yv2oB6JGqMo',
    title: 'Natural Pest Control for Crops',
    description: 'Effective organic pest management techniques using neem, garlic, and companion planting.',
  },
  {
    id: 'fBLMhGaalBE',
    title: 'Vermicomposting – Complete Guide',
    description: 'How to set up a vermicompost pit and turn farm waste into nutrient-rich compost.',
  },
  {
    id: '1A9sRYpJoRE',
    title: 'Mulching Techniques for Better Yield',
    description: 'Learn how mulching conserves water, suppresses weeds, and improves soil health naturally.',
  },
  {
    id: 'nFMnOxMqdak',
    title: 'Successful Organic Farming in India',
    description: 'Inspiring real-life success stories of Indian farmers thriving with natural farming methods.',
  },
];

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

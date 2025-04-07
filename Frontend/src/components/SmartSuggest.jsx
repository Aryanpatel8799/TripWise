import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SmartPackingForm from "../component/SmartPackingForm";
import SmartSuggestForm from "../component/SmartSuggestForm";

const SmartSuggest = () => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [formData, setFormData] = useState({
    destinationType: "",
    tripType: "",
    season: "",
    duration: "",
    budget: "medium",
    interests: []
  });
  const [error, setError] = useState(null);

  const interests = [
    { id: "nature", label: "Nature & Wildlife", icon: "🌿" },
    { id: "culture", label: "Culture & Heritage", icon: "🏛️" },
    { id: "adventure", label: "Adventure", icon: "🏃‍♂️" },
    { id: "food", label: "Food & Cuisine", icon: "🍜" },
    { id: "beach", label: "Beaches", icon: "🏖️" },
    { id: "mountains", label: "Mountains", icon: "⛰️" },
    { id: "shopping", label: "Shopping", icon: "🛍️" },
    { id: "nightlife", label: "Nightlife", icon: "🌃" },
    { id: "wellness", label: "Wellness & Spa", icon: "💆‍♀️" },
    { id: "history", label: "Historical Places", icon: "🏰" }
  ];

  const handleInterestToggle = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const generatePrompt = () => {
    const tripTypeText = formData.tripType ? `${formData.tripType.toLowerCase()}` : "general";
    const durationText = formData.duration || "any duration";
    const seasonText = formData.season ? formData.season.toLowerCase() : "any season";
    const interestsText = formData.interests.length > 0
      ? formData.interests.map(id => 
          interests.find(i => i.id === id)?.label.toLowerCase()
        ).join(", ")
      : "general tourism";
    const budgetText = formData.budget || "medium";
    const locationText = formData.destinationType === "domestic" ? "in India" : "internationally";

    return `Act as a travel expert and suggest 5 travel destinations ${locationText} for a ${tripTypeText} trip.

Key Requirements:
- Duration: ${durationText}
- Season: ${seasonText}
- Interests: ${interestsText}
- Budget Level: ${budgetText}

Please provide exactly 5 destinations, each formatted precisely as follows:

1. [City], [Country/State]: One-line introduction

Description: 2-3 sentences about why this destination is perfect for the specified requirements.

Must-Visit:
1. [Place Name]: One-line description
2. [Place Name]: One-line description
3. [Place Name]: One-line description

Best Time: Specific months with weather details
Budget: Daily cost range in local currency

---

Example Format:
1. Paris, France: The City of Light, perfect for romantic getaways and cultural exploration.

Description: Paris offers an unmatched blend of art, history, and culinary excellence. The city's charming neighborhoods, world-class museums, and iconic landmarks create an enchanting atmosphere for visitors.

Must-Visit:
1. Eiffel Tower: Iconic iron lattice tower offering panoramic city views
2. Louvre Museum: World's largest art museum, home to the Mona Lisa
3. Montmartre: Historic hilltop district with artistic heritage and stunning basilica

Best Time: April to June, 15-25°C, mild weather and fewer crowds
Budget: €200-300 per day for mid-range accommodations and dining

---

Please provide 5 destinations following this exact format. Ensure each suggestion:
1. Matches the specified trip type and interests
2. Is suitable for the given season
3. Fits the budget level
4. Includes specific details for must-visit places
5. Provides concrete budget figures in local currency`;
  };

  const parseSuggestions = (text) => {
    try {
      // Remove any introductory text and split into destinations
      const cleanText = text.replace(/^[\s\S]*?(?=1\.\s+[\w\s]+,)/, '').trim();
      const destinations = cleanText.split(/(?=\d+\.\s+[\w\s]+,)/).filter(d => d.trim());

      return destinations.map(block => {
        const lines = block.split('\n').filter(line => line.trim());
        const destination = {};

        // Parse destination and intro
        const firstLine = lines[0].replace(/^\d+\.\s*/, '').trim();
        destination.destination = firstLine;

        let currentSection = '';
        let currentContent = [];

        lines.slice(1).forEach(line => {
          line = line.trim();
          
          if (line.toLowerCase().startsWith('description:')) {
            currentSection = 'description';
            currentContent = [line.replace(/^description:\s*/i, '').trim()];
          } else if (line.toLowerCase().startsWith('must-visit:')) {
            destination.description = currentContent.join(' ').trim();
            currentSection = 'mustVisit';
            currentContent = [];
          } else if (line.toLowerCase().startsWith('best time:')) {
            if (currentSection === 'mustVisit') {
              destination.mustVisit = currentContent.join(', ');
            }
            currentSection = 'bestTime';
            currentContent = [line.replace(/^best time:\s*/i, '').trim()];
          } else if (line.toLowerCase().startsWith('budget:')) {
            destination.bestTime = currentContent.join(' ').trim();
            currentSection = 'budget';
            currentContent = [line.replace(/^budget:\s*/i, '').trim()];
          } else if (line.match(/^\d+\./)) {
            // This is a must-visit item
            const item = line.replace(/^\d+\.\s*/, '').trim();
            if (item) currentContent.push(item);
          } else if (line && !line.match(/^-+$/)) {
            // Add to current section if not a separator
            currentContent.push(line);
          }
        });

        // Save the last section
        if (currentSection === 'budget') {
          destination.budget = currentContent.join(' ').trim();
        }

        // Validate all required fields are present
        const isValid = ['destination', 'description', 'mustVisit', 'bestTime', 'budget']
          .every(field => destination[field] && destination[field].trim().length > 0);

        return isValid ? destination : null;
      }).filter(Boolean);
    } catch (error) {
      console.error('Error parsing suggestions:', error);
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuggestions(null);

    try {
      // Validate form data
      if (!formData.destinationType || !formData.tripType || !formData.duration) {
        throw new Error('Please fill in all required fields');
      }

      const prompt = generatePrompt();
      console.log('Generated prompt:', prompt);

      const response = await fetch('https://api.cohere.ai/v1/generate', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer r6eFcwJx0A0Fa8xIefdJGVawcCJ5W9C1Z9mrUaNw',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'command',
          prompt: prompt,
          max_tokens: 2500,
          temperature: 0.7,
          k: 0,
          stop_sequences: ["---"],
          return_likelihoods: 'NONE'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get suggestions');
      }

      const data = await response.json();
      const generatedText = data.generations[0].text;
      console.log('Generated text:', generatedText);

      const parsedSuggestions = parseSuggestions(generatedText);
      console.log('Parsed suggestions:', parsedSuggestions);

      if (!parsedSuggestions || parsedSuggestions.length === 0) {
        throw new Error('No valid destinations found. Please try again.');
      }

      if (parsedSuggestions.length < 5) {
        throw new Error('Not enough valid destinations found. Please try again.');
      }

      setSuggestions(parsedSuggestions);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to generate suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const DestinationCard = ({ suggestion, index }) => {
    // Extract city and state/country
    const [city, region] = suggestion.destination.split(',').map(s => s.trim());
    
    // Get first 2 must-visit places without descriptions (reduced from 3 to 2)
    const mustVisitPlaces = suggestion.mustVisit
      .split(',')
      .slice(0, 2)
      .map(place => place.split(':')[0].trim());

    // Extract budget range numbers
    const budgetText = suggestion.budget.match(/\d[\d,.]*/g)?.[0] || suggestion.budget;
    
    // Simplify best time
    const bestTime = suggestion.bestTime.split(',')[0].trim();

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-5 relative">
          <div className="mb-1">
            <h3 className="text-xl font-bold text-white">{city}</h3>
            <p className="text-purple-200 text-sm">{region}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Must Visit Places */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-800">
              <span className="text-lg">🎯</span>
              <span className="text-sm font-medium">Must Visit</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {mustVisitPlaces.map((place, i) => (
                <span 
                  key={i} 
                  className="bg-purple-50 px-3 py-1.5 rounded-lg text-sm text-gray-700 truncate"
                >
                  {place}
                </span>
              ))}
            </div>
          </div>

          {/* Info Row */}
          <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-base">🗓️</span>
              <span className="text-gray-600">{bestTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base">💰</span>
              <span className="text-gray-600">{budgetText}</span>
            </div>
          </div>

          {/* Plan Trip Button */}
          <Link to="/itinerary" className="block">
            <button 
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 group-hover:gap-3"
            >
              Plan Trip
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 transition-all" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary">
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm -z-10 rounded-2xl"></div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 drop-shadow-sm"
            >
              Discover Your Perfect Destination
            </motion.h1>
            <p className="text-xl text-gray-800 font-medium">
              Let our AI help you find your next dream destination
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Destination Type */}
              <div>
                <label className="text-lg font-semibold text-gray-700 mb-3 block">
                  Where would you like to travel?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {["domestic", "international"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, destinationType: type }))}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.destinationType === type
                          ? "border-purple-600 bg-purple-50 text-purple-600"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <span className="text-lg font-medium capitalize">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trip Type */}
              <div>
                <label className="text-lg font-semibold text-gray-700 mb-3 block">
                  Type of Trip
                </label>
                <select
                  value={formData.tripType}
                  onChange={(e) => setFormData(prev => ({ ...prev, tripType: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select trip type</option>
                  <option value="Solo">Solo</option>
                  <option value="Family">Family</option>
                  <option value="Couple">Couple</option>
                  <option value="Friends">Friends</option>
                  <option value="Adventure">Adventure</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="text-lg font-semibold text-gray-700 mb-3 block">
                  Duration
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select duration</option>
                  <option value="2-3 days">2-3 days</option>
                  <option value="4-7 days">4-7 days</option>
                  <option value="8-14 days">8-14 days</option>
                  <option value="15+ days">15+ days</option>
                </select>
              </div>

              {/* Season */}
              <div>
                <label className="text-lg font-semibold text-gray-700 mb-3 block">
                  Preferred Season
                </label>
                <select
                  value={formData.season}
                  onChange={(e) => setFormData(prev => ({ ...prev, season: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select season</option>
                  <option value="Summer">Summer</option>
                  <option value="Winter">Winter</option>
                  <option value="Monsoon">Monsoon</option>
                  <option value="Spring">Spring</option>
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="text-lg font-semibold text-gray-700 mb-3 block">
                  Budget Range
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {["budget", "medium", "luxury"].map((budget) => (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, budget }))}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.budget === budget
                          ? "border-purple-600 bg-purple-50 text-purple-600"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <span className="text-base font-medium capitalize">{budget}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
      <div>
                <label className="text-lg font-semibold text-gray-700 mb-3 block">
                  Interests
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {interests.map((interest) => (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => handleInterestToggle(interest.id)}
                      className={`p-4 rounded-xl border-2 transition-all flex items-center gap-2 ${
                        formData.interests.includes(interest.id)
                          ? "border-purple-600 bg-purple-50 text-purple-600"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <span className="text-xl">{interest.icon}</span>
                      <span className="text-sm font-medium">{interest.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Finding destinations...</span>
                  </div>
                ) : (
                  'Find My Perfect Destination'
                )}
          </button>
            </form>
          </motion.div>

          {/* Results Section */}
          {suggestions && suggestions.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Recommended Destinations
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {suggestions.map((suggestion, index) => (
                  <DestinationCard key={index} suggestion={suggestion} index={index} />
                ))}
              </div>
            </motion.div>
          ) : loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Finding perfect destinations for you...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 bg-red-50 p-4 rounded-lg inline-block">{error}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SmartSuggest;

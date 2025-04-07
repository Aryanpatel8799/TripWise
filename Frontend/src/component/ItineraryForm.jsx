import React, { useState } from "react";

const ItineraryForm = ({ onItineraryGenerated }) => {
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    companion: "",
    travelStyle: "",
    interests: []
  });
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    setFormData(prev => ({ ...prev, destination: value }));

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=17e15ee720494e99a5ff87da332928d0`
        );
        const data = await response.json();
        const cities = data.features.map((feature) => feature.properties.formatted);
        setSuggestions(cities);
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city) => {
    setQuery(city);
    setFormData(prev => ({ ...prev, destination: city }));
    setSuggestions([]);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        interests: checked 
          ? [...prev.interests, value]
          : prev.interests.filter(interest => interest !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const generatePrompt = () => {
    return `Create a detailed ${formData.days}-day itinerary for ${formData.destination} for ${formData.companion} travelers.
Travel style: ${formData.travelStyle}
Interests: ${formData.interests.join(', ')}

IMPORTANT INSTRUCTIONS:
1. Create EXACTLY ${formData.days} days of itinerary
2. Each day MUST have at least 2 activities
3. Focus on specific, concrete activities (not "day available for planning")
4. Include actual venues, attractions, and experiences

Format each day as follows:

Day [1-${formData.days}] - [Location/Area Name]

Morning (8:00 AM): [Specific Activity/Attraction Name]
[Write 2-3 sentences describing the activity, including venue details and what makes it special]

Afternoon (1:00 PM): [Specific Activity/Attraction Name]
[Write 2-3 sentences describing the activity, including venue details and what makes it special]

Evening (5:00 PM): [Specific Activity/Attraction Name]
[Write 2-3 sentences describing the activity, including venue details and what makes it special]

Night (8:00 PM): [Specific Activity/Attraction Name]
[Write 2-3 sentences describing the activity, including venue details and what makes it special]

Required formatting rules:
1. Always include Morning and Afternoon activities for each day
2. Evening and Night activities are optional based on location and availability
3. Use the exact times shown above
4. Each activity must have a clear, specific name (not generic descriptions)
5. Each activity must have a detailed description
6. Include specific locations and venues in descriptions
7. Make activities match the travel style and interests
8. Keep descriptions informative and engaging

Example activity format:
Morning (8:00 AM): Sydney Opera House Tour
Embark on a guided tour of the iconic Sydney Opera House, a UNESCO World Heritage site. Explore the stunning architecture and learn about its fascinating history while getting exclusive access to performance venues and backstage areas.

Start with Day 1 and continue sequentially until Day ${formData.days}.`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // First, try with default settings
      let response = await makeCoherePlanRequest(0.7);
      let data = await response.json();
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate itinerary');
      }

      let generatedText = data.generations[0].text;
      console.log('Initial generated text:', generatedText);

      // Check if we got the correct number of days
      const dayCount = (generatedText.match(/Day \d+/g) || []).length;
      
      if (dayCount !== parseInt(formData.days)) {
        console.log(`Retrying with adjusted parameters. Got ${dayCount} days, expected ${formData.days}`);
        
        // Try again with different temperature
        response = await makeCoherePlanRequest(0.5);
        data = await response.json();
        generatedText = data.generations[0].text;
        
        const newDayCount = (generatedText.match(/Day \d+/g) || []).length;
        if (newDayCount !== parseInt(formData.days)) {
          throw new Error(`Unable to generate the correct number of days. Expected ${formData.days} days but got ${newDayCount} days.`);
        }
      }

      try {
        const parsedItinerary = parseGeneratedText(generatedText);
        onItineraryGenerated(parsedItinerary);
      } catch (parseError) {
        console.error('Parse error:', parseError);
        console.error('Original text:', generatedText);
        setError(`Failed to format the itinerary: ${parseError.message}`);
      }
    } catch (error) {
      console.error('Error details:', error);
      setError(error.message || 'Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const makeCoherePlanRequest = async (temperature) => {
    return fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer r6eFcwJx0A0Fa8xIefdJGVawcCJ5W9C1Z9mrUaNw',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'command',
        prompt: generatePrompt(),
        max_tokens: 3000,
        temperature: temperature,
        k: 0,
        stop_sequences: [],
        return_likelihoods: 'NONE'
      })
    });
  };

  const parseGeneratedText = (text) => {
    try {
      // Split the text into day blocks, keeping the "Day X" header
      const dayBlocks = text.split(/(?=Day \d+)/).filter(block => block.trim());
      
      if (dayBlocks.length === 0) {
        throw new Error('No valid day blocks found in the generated text');
      }

      if (dayBlocks.length !== parseInt(formData.days)) {
        throw new Error(`Expected ${formData.days} days but got ${dayBlocks.length} days`);
      }

      const parsedDays = dayBlocks.map((block) => {
        // Extract day number and location from the first line
        const firstLine = block.split('\n')[0].trim();
        const dayMatch = firstLine.match(/Day (\d+)/);
        const locationMatch = firstLine.split('-')[1]?.trim();
        
        if (!dayMatch || !locationMatch) {
          throw new Error(`Invalid day header format: "${firstLine}"`);
        }

        const dayNumber = parseInt(dayMatch[1]);
        const location = locationMatch;

        // Parse activities
        const activities = [];
        
        // Split remaining lines and process them
        const lines = block.split('\n')
          .slice(1)  // Remove the day header
          .map(line => line.trim())
          .filter(Boolean); // Remove empty lines

        // Process lines for activities
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          
          // Match time slot and activity title
          const activityMatch = line.match(/(Morning|Afternoon|Evening|Night)\s*\(([^)]+)\):\s*([^.]+)/);
          
          if (activityMatch) {
            const timeSlot = activityMatch[1];
            const time = activityMatch[2].trim();
            const activityTitle = activityMatch[3].trim();
            
            // Collect description from subsequent lines
            let description = [];
            let j = i + 1;
            
            while (j < lines.length) {
              const nextLine = lines[j].trim();
              // Stop if we hit another time slot or empty line
              if (nextLine.match(/(Morning|Afternoon|Evening|Night)\s*\([^)]+\):/) || !nextLine) {
                break;
              }
              description.push(nextLine);
              j++;
            }
            
            // Update outer loop counter
            i = j - 1;
            
            // Only add activity if we have both title and description
            if (activityTitle && description.length > 0) {
              activities.push({
                timeSlot,
                time,
                title: activityTitle,
                description: description.join(' '),
                icon: getActivityIcon(activityTitle.toLowerCase())
              });
            }
          }
        }

        // Verify we have at least some activities
        if (activities.length === 0) {
          throw new Error(`No valid activities found for day ${dayNumber}`);
        }

        // Sort activities by time slot
        activities.sort((a, b) => {
          const order = { 'Morning': 0, 'Afternoon': 1, 'Evening': 2, 'Night': 3 };
          return (order[a.timeSlot] || 0) - (order[b.timeSlot] || 0);
        });

        return {
          day: dayNumber,
          location,
          activities: activities.map(({ timeSlot, ...activity }) => activity)
        };
      });

      // Verify days are in sequence
      const expectedDays = Array.from({ length: formData.days }, (_, i) => i + 1);
      const actualDays = parsedDays.map(day => day.day);
      const missingDays = expectedDays.filter(day => !actualDays.includes(day));

      if (missingDays.length > 0) {
        throw new Error(`Missing days in sequence: ${missingDays.join(', ')}`);
      }

      return parsedDays;
    } catch (error) {
      console.error('Error parsing itinerary:', error);
      throw error;
    }
  };

  const getActivityIcon = (activity) => {
    const iconMap = {
      breakfast: '🍳',
      lunch: '🍽️',
      dinner: '🍴',
      hike: '🥾',
      trek: '🏃',
      temple: '🏛️',
      shrine: '⛩️',
      museum: '🏛️',
      beach: '🏖️',
      garden: '🌺',
      shopping: '🛍️',
      market: '🏪',
      tour: '🚶',
      walk: '🚶‍♂️',
      explore: '🗺️',
      visit: '📍',
      watch: '👀',
      sunset: '🌅',
      sunrise: '🌄',
      boat: '⛵',
      cruise: '🚢',
      drive: '🚗',
      train: '🚂',
      flight: '✈️',
      spa: '💆',
      massage: '💆‍♂️',
      yoga: '🧘',
      meditation: '🧘‍♂️',
      adventure: '🤠',
      sport: '⚽',
      swim: '🏊',
      snorkel: '🤿',
      dive: '🤿',
      surf: '🏄',
      ski: '⛷️',
      paragliding: '🪂',
      cycling: '🚴',
      bike: '🚲',
      dance: '💃',
      music: '🎵',
      concert: '🎫',
      theater: '🎭',
      cinema: '🎬',
      restaurant: '🍽️',
      cafe: '☕',
      bar: '🍸',
      club: '🎉',
      party: '🎊',
      festival: '🎪',
      fair: '🎡',
      amusementPark: '🎢',
      park: '🌳', // Nature park/garden
      zoo: '🦁',
      aquarium: '🐠',
      wildlife: '🦒',
      safari: '🦁',
      photography: '📸',
      art: '🎨',
      gallery: '🖼️',
      workshop: '🛠️',
      class: '📚',
      learn: '📖',
      teach: '👨‍🏫',
      relax: '😌',
      rest: '💤',
      sleep: '😴'
    };

    // Find the matching icon based on activity keywords
    for (const [keyword, icon] of Object.entries(iconMap)) {
      if (activity.includes(keyword)) {
        return icon;
      }
    }
    
    return '📍'; // Default icon
  };

  const handleReset = () => {
    setFormData({
      destination: "",
      days: "",
      companion: "",
      travelStyle: "",
      interests: []
    });
    setQuery("");
    setSuggestions([]);
    setError(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Plan Your Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination
          </label>
          <input
            type="text"
            name="destination"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter destination"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(city)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Number of Days */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Days
          </label>
          <input
            type="number"
            name="days"
            min="1"
            value={formData.days}
            onChange={handleFormChange}
            placeholder="Enter number of days"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        {/* Companion */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Companion
          </label>
          <select
            name="companion"
            value={formData.companion}
            onChange={handleFormChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          >
            <option value="">Select your companion</option>
            <option value="solo">Solo</option>
            <option value="couple">Couple</option>
            <option value="friends">Friends</option>
            <option value="family">Family</option>
          </select>
        </div>

        {/* Travel Style */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Travel Style
          </label>
          <select
            name="travelStyle"
            value={formData.travelStyle}
            onChange={handleFormChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          >
            <option value="">Select a travel style</option>
            <option value="relaxation">Relaxation</option>
            <option value="adventure">Adventure</option>
            <option value="sightseeing">Sightseeing</option>
          </select>
        </div>

        {/* Additional Interests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Interests
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              "Hiking",
              "Food",
              "Wellness",
              "Culture",
              "Hidden Gems",
              "Museums",
              "Architecture",
            ].map((interest) => (
              <label
                key={interest}
                className="flex items-center space-x-2 text-sm"
              >
                <input
                  type="checkbox"
                  name="interests"
                  value={interest}
                  checked={formData.interests.includes(interest)}
                  onChange={handleFormChange}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span>{interest}</span>
              </label>
            ))}
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Itinerary'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItineraryForm;

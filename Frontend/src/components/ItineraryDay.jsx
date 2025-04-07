import React from 'react';
import ItineraryCard from './ItineraryCard';

const ItineraryDay = ({ day, location, activities }) => {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Day {day} - {location}</h2>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <ItineraryCard
            key={index}
            time={activity.time}
            title={activity.title}
            description={activity.description}
            icon={activity.icon}
            image={activity.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ItineraryDay; 
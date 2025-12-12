import React from 'react';

// Define the interface for the component's props
interface ActiveTabTitleProps {
  title: string;
  isActive: boolean;
  onClick: () => void; // Function that takes no arguments and returns nothing
}

// Use the interface to type the component
const ActiveTabTitle: React.FC<ActiveTabTitleProps> = ({ title, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative pb-3 text-base md:text-lg font-medium transition duration-200 ease-in-out ${
        isActive
          ? 'text-black font-bold border-b-2 border-transparent'
          : 'text-black font-medium hover:text-indigo-600'
      }`}
    >
      {title}
      
      {/* Custom Brush Stroke Indicator */}
      {isActive && (
        <span 
          className="absolute bottom-0 left-0 w-full h-1"
          style={{
            // Colors: #B065E8
            background: 'linear-gradient(to right, #B065E8, #B065E8, #a05fe0, #B065E8)',
            borderRadius: '2px',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1), 0 0 10px rgba(176, 101, 232, 0.5)',
          }}
        />
      )}
    </button>
  );
};

export default ActiveTabTitle;
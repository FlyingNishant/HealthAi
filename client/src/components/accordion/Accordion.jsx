import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Accordion = ({ title, expandByDefault, children }) => {
  const [isOpen, setIsOpen] = useState(expandByDefault);

  return (
    <div className="">
      {/* Accordion Header */}
      <button
        className="w-full border-b border-gray-300 flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ExpandMoreIcon
            className={`transform transition-transform duration-300 ${!isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* Accordion Content */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
};
export default Accordion;
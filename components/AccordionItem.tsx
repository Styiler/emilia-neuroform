
import React from 'react';
import { ChevronDownIcon } from './Icons';

interface AccordionItemProps {
  title: string;
  sectionNumber: number;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, sectionNumber, isOpen, onToggle, children }) => {
  return (
    <div className="border border-gray-200 bg-white/70 backdrop-blur-md rounded-xl shadow-sm mb-4 transition-all duration-300">
      <button
        type="button"
        className="w-full flex justify-between items-center text-left p-6"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <span className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold mr-4 transition-colors ${isOpen ? 'bg-blue-600' : 'bg-gray-400'}`}>
            {sectionNumber}
          </span>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        <ChevronDownIcon
          className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-6 border-t border-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
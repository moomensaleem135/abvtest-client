import React from 'react';

interface CheckboxIconProps {
  isActive: boolean;
}

export const CheckboxIcon: React.FC<CheckboxIconProps> = ({ isActive }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="10"
      cy="10"
      r="8"
      fill={isActive ? 'currentColor' : 'transparent'}
      stroke="currentColor"
      strokeWidth="1.5"
    />
    {isActive && (
      <path
        d="M6.5 10L9 12.5L13.5 8"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </svg>
);

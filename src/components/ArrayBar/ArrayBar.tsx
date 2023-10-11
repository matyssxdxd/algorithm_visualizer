import React from 'react';
import './ArrayBar.css';

interface ArrayBarProps {
  height: number;
}

const ArrayBar: React.FC<ArrayBarProps> = ({ height }) => {
  return <div className="array-col" style={{ height: `${height}px` }}></div>;
};

export default ArrayBar;

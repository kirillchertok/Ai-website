'use client';

import React, { useState } from 'react';
import CheckBoxCard from './checkbox-card';

type Option = {
  id: string;
  title: string;
  description: string;
};

type CheckBoxCardGroupProps = {
  options: Option[];
  defaultSelected?: string;
  isCollapsed?: boolean;
};

const CheckBoxCardGroup = ({
  options,
  defaultSelected = '',
  isCollapsed = false,
}: CheckBoxCardGroupProps) => {
  const [selectedId, setSelectedId] = useState(defaultSelected);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div
      className={`space-y-5 ${isCollapsed ? 'flex flex-col items-center' : ''}`}
    >
      {options.map((option, index) => (
        <CheckBoxCard
          key={option.id}
          id={option.id}
          title={option.title}
          description={option.description}
          checked={selectedId === option.id}
          onSelect={handleSelect}
          isCollapsed={isCollapsed}
          isLastItem={index === options.length - 1}
        />
      ))}
    </div>
  );
};

export default CheckBoxCardGroup;

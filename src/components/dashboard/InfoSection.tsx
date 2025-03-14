
import React, { ReactNode } from 'react';

interface InfoSectionProps {
  title: string;
  bgColor: string;
  textColor: string;
  icon?: ReactNode;
  children: ReactNode;
}

const InfoSection: React.FC<InfoSectionProps> = ({ 
  title, 
  bgColor, 
  textColor, 
  icon, 
  children 
}) => {
  return (
    <div className={`${bgColor} p-3 rounded-lg`}>
      <h4 className={`${textColor} font-medium text-sm mb-1`}>{title}</h4>
      {icon ? (
        <div className="flex items-center">
          <span className={`text-xl ${textColor} ml-2`}>{icon}</span>
          {children}
        </div>
      ) : children}
    </div>
  );
};

export default InfoSection;

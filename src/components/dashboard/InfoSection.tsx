
import React, { ReactNode } from 'react';

interface InfoSectionProps {
  title: string;
  bgColor: string;
  textColor: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ 
  title, 
  bgColor, 
  textColor, 
  icon, 
  children,
  className = ''
}) => {
  return (
    <div className={`${bgColor} p-3 rounded-lg ${className}`}>
      <h4 className={`${textColor} font-medium text-sm mb-1`}>{title}</h4>
      {icon ? (
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className={`text-xl ${textColor}`}>{icon}</span>
          <div className="flex-1">{children}</div>
        </div>
      ) : children}
    </div>
  );
};

export default InfoSection;

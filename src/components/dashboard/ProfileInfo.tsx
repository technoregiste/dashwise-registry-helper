
import React from 'react';
import { ProfileData } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface ProfileInfoProps {
  profile: ProfileData | null;
  className?: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile, className }) => {
  if (!profile) return null;

  return (
    <div className={cn("bg-white rounded-xl shadow-card p-6 animate-fade-in", className)}>
      <h2 className="text-lg font-semibold mb-4">المعلومات الشخصية</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">اسم الشركة:</span>
          <span className="font-medium">{profile.company_name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">اسم المؤسس:</span>
          <span className="font-medium">{profile.founder_name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">رقم الهاتف:</span>
          <span className="font-medium ltr">{profile.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">رقم السجل التجاري:</span>
          <span className="font-medium ltr">{profile.company_number}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

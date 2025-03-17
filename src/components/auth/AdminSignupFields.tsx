
import React from 'react';
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AdminSignupFieldsProps {
  adminName: string;
  setAdminName: (name: string) => void;
}

const AdminSignupFields: React.FC<AdminSignupFieldsProps> = ({ 
  adminName, 
  setAdminName 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Label htmlFor="adminName" className="block text-sm font-medium mb-1">
        اسم المسؤول
      </Label>
      <Input
        id="adminName"
        value={adminName}
        onChange={(e) => setAdminName(e.target.value)}
        required
        placeholder="أدخل اسم المسؤول"
        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
      />
    </motion.div>
  );
};

export default AdminSignupFields;

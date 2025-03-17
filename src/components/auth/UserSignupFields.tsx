
import React from 'react';
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UserSignupFieldsProps {
  founderName: string;
  setFounderName: (name: string) => void;
  companyName: string;
  setCompanyName: (name: string) => void;
  companyNumber: string;
  setCompanyNumber: (number: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
}

const UserSignupFields: React.FC<UserSignupFieldsProps> = ({
  founderName,
  setFounderName,
  companyName,
  setCompanyName,
  companyNumber,
  setCompanyNumber,
  phone,
  setPhone
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Label htmlFor="founderName" className="block text-sm font-medium mb-1">
          اسم المؤسس
        </Label>
        <Input
          id="founderName"
          value={founderName}
          onChange={(e) => setFounderName(e.target.value)}
          required
          placeholder="أدخل اسم المؤسس"
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Label htmlFor="companyName" className="block text-sm font-medium mb-1">
          اسم الشركة
        </Label>
        <Input
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          placeholder="أدخل اسم الشركة"
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Label htmlFor="companyNumber" className="block text-sm font-medium mb-1">
          رقم السجل التجاري
        </Label>
        <Input
          id="companyNumber"
          value={companyNumber}
          onChange={(e) => setCompanyNumber(e.target.value)}
          required
          placeholder="أدخل رقم السجل التجاري"
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Label htmlFor="phone" className="block text-sm font-medium mb-1">
          رقم الهاتف
        </Label>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="أدخل رقم الهاتف"
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </motion.div>
    </>
  );
};

export default UserSignupFields;

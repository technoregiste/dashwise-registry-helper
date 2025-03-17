
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from 'lucide-react';
import { itemVariants } from '@/utils/animation';
import AdminSignupFields from './AdminSignupFields';
import UserSignupFields from './UserSignupFields';

interface SignupFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  founderName: string;
  setFounderName: (name: string) => void;
  companyName: string;
  setCompanyName: (name: string) => void;
  companyNumber: string;
  setCompanyNumber: (number: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  adminName: string;
  setAdminName: (name: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  toggleForm: () => void;
  handleAccountTypeToggle: (checked: boolean) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  isAdmin,
  setIsAdmin,
  founderName,
  setFounderName,
  companyName,
  setCompanyName,
  companyNumber,
  setCompanyNumber,
  phone,
  setPhone,
  adminName,
  setAdminName,
  loading,
  onSubmit,
  toggleForm,
  handleAccountTypeToggle
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <motion.div variants={itemVariants}>
        <Label htmlFor="email" className="block text-sm font-medium mb-1">
          البريد الإلكتروني
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="أدخل بريدك الإلكتروني"
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label htmlFor="password" className="block text-sm font-medium mb-1">
          كلمة المرور
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="أدخل كلمة المرور"
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between space-x-2 py-2"
      >
        <Label htmlFor="is-admin" className="text-sm font-medium">
          تسجيل كمسؤول النظام
        </Label>
        <Switch 
          id="is-admin" 
          checked={isAdmin}
          onCheckedChange={handleAccountTypeToggle}
        />
      </motion.div>

      <AnimatePresence>
        {isAdmin ? (
          <AdminSignupFields 
            adminName={adminName} 
            setAdminName={setAdminName} 
          />
        ) : (
          <UserSignupFields 
            founderName={founderName}
            setFounderName={setFounderName}
            companyName={companyName}
            setCompanyName={setCompanyName}
            companyNumber={companyNumber}
            setCompanyNumber={setCompanyNumber}
            phone={phone}
            setPhone={setPhone}
          />
        )}
      </AnimatePresence>

      <motion.div 
        variants={itemVariants}
        className="pt-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg shadow-md transition-all duration-200"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              جاري التحميل...
            </>
          ) : (
            "إنشاء حساب"
          )}
        </Button>
      </motion.div>

      <motion.div 
        className="mt-4 text-center"
        variants={itemVariants}
      >
        <button
          type="button"
          className="text-sm text-primary hover:underline"
          onClick={toggleForm}
        >
          لديك حساب بالفعل؟ تسجيل الدخول
        </button>
      </motion.div>
    </form>
  );
};

export default SignupForm;

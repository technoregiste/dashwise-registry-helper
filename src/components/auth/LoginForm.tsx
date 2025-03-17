
import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react';
import { itemVariants } from '@/utils/animation';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  toggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  onSubmit,
  toggleForm
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
            "تسجيل الدخول"
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
          ليس لديك حساب؟ إنشاء حساب جديد
        </button>
      </motion.div>
    </form>
  );
};

export default LoginForm;

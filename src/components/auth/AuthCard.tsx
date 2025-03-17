
import React from 'react';
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="p-6 shadow-lg border-0">
        {children}
      </Card>
    </motion.div>
  );
};

export default AuthCard;


import React from 'react';
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from '@/utils/animation';

const AuthHeader: React.FC = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-8 text-center"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-3xl font-bold mb-2"
      >
        منصة تسجيل الشركات الناشئة
      </motion.h1>
      
      <motion.p 
        variants={itemVariants}
        className="text-muted-foreground"
      >
        منصة لتسهيل إجراءات تسجيل الشركات الناشئة
      </motion.p>
    </motion.div>
  );
};

export default AuthHeader;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const SignIn = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await signIn(email, password);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <Card className="w-full max-w-md shadow-card animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
          <CardDescription>
            قم بتسجيل الدخول للوصول إلى لوحة التحكم الخاصة بك
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">البريد الإلكتروني</label>
              <Input 
                id="email"
                type="email"
                placeholder="أدخل البريد الإلكتروني"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm">كلمة المرور</label>
                <Link to="/auth/reset-password" className="text-xs text-primary hover:underline">
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <Input 
                id="password"
                type="password"
                placeholder="أدخل كلمة المرور"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                dir="ltr"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            ليس لديك حساب؟{' '}
            <Link to="/auth/signup" className="font-medium text-primary hover:underline">
              إنشاء حساب جديد
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;

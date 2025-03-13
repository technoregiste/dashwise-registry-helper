
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth, SignUpData } from '@/contexts/AuthContext';
import { X, Plus } from 'lucide-react';

const SignUp = () => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState<SignUpData>({
    email: '',
    password: '',
    founderName: '',
    companyName: '',
    companyNumber: '',
    phone: '',
    coFounders: []
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addCoFounder = () => {
    setFormData(prev => ({
      ...prev,
      coFounders: [...(prev.coFounders || []), { name: '' }]
    }));
  };

  const removeCoFounder = (index: number) => {
    setFormData(prev => ({
      ...prev,
      coFounders: prev.coFounders?.filter((_, i) => i !== index)
    }));
  };

  const updateCoFounder = (index: number, name: string) => {
    setFormData(prev => {
      const newCoFounders = [...(prev.coFounders || [])];
      newCoFounders[index] = { name };
      return { ...prev, coFounders: newCoFounders };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== confirmPassword) {
      alert('كلمة المرور وتأكيدها غير متطابقين');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await signUp(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <Card className="w-full max-w-2xl shadow-card animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">انشاء حساب جديد</CardTitle>
          <CardDescription>
            قم بتسجيل بيانات شركتك الناشئة للبدء في عملية التسجيل
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">معلومات المؤسس</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="founderName" className="block text-sm">اسم المؤسس الرئيسي</label>
                  <Input 
                    id="founderName"
                    name="founderName"
                    placeholder="أدخل اسم المؤسس الرئيسي"
                    required
                    value={formData.founderName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm">رقم الهاتف</label>
                  <Input 
                    id="phone"
                    name="phone"
                    placeholder="أدخل رقم الهاتف"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">المؤسسين المشاركين (اختياري)</h3>
                <Button 
                  type="button" 
                  onClick={addCoFounder}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Plus className="w-4 h-4 ml-1" /> إضافة مؤسس
                </Button>
              </div>
              
              {formData.coFounders && formData.coFounders.length > 0 ? (
                <div className="space-y-2">
                  {formData.coFounders.map((coFounder, index) => (
                    <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Input
                        placeholder={`اسم المؤسس المشارك ${index + 1}`}
                        value={coFounder.name}
                        onChange={(e) => updateCoFounder(index, e.target.value)}
                        required
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeCoFounder(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">لم تتم إضافة أي مؤسسين مشاركين بعد.</p>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">معلومات الشركة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="companyName" className="block text-sm">اسم الشركة الناشئة</label>
                  <Input 
                    id="companyName"
                    name="companyName"
                    placeholder="أدخل اسم الشركة"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="companyNumber" className="block text-sm">رقم الشركة</label>
                  <Input 
                    id="companyNumber"
                    name="companyNumber"
                    placeholder="أدخل رقم الشركة إن وجد"
                    required
                    value={formData.companyNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">معلومات الحساب</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm">البريد الإلكتروني</label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="أدخل البريد الإلكتروني"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm">كلمة المرور</label>
                  <Input 
                    id="password"
                    name="password"
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm">تأكيد كلمة المرور</label>
                  <Input 
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="تأكيد كلمة المرور"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'جاري إنشاء الحساب...' : 'إنشاء حساب جديد'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            لديك حساب بالفعل؟{' '}
            <Link to="/auth/signin" className="font-medium text-primary hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;

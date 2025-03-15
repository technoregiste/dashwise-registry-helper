
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface StartupData {
  id: string;
  name: string;
  founderName: string;
  phone: string;
  email: string;
  progress: number;
  status: 'pending' | 'in-progress' | 'completed';
}

const AdminPanel = () => {
  const [startups, setStartups] = useState<StartupData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        toast({
          title: "غير مصرح",
          description: "يجب تسجيل الدخول للوصول إلى لوحة الإدارة",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      if (user.email !== 'technoregiste@gmail.com') {
        toast({
          title: "وصول محظور",
          description: "أنت لا تملك صلاحيات الوصول للوحة الإدارة",
          variant: "destructive",
        });
        navigate('/dashboard');
        return;
      }
    };

    checkAdminAccess();
  }, [user, navigate]);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setLoading(true);
        
        // Get profiles data
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*');
        
        if (profilesError) throw profilesError;
        
        // For each profile, get their registration steps to calculate progress
        const startupsWithProgress = await Promise.all(
          profilesData.map(async (profile) => {
            const { data: stepsData, error: stepsError } = await supabase
              .from('registration_steps')
              .select('*')
              .eq('profile_id', profile.id);
            
            if (stepsError) throw stepsError;
            
            // Calculate progress
            let progress = 0;
            let status: 'pending' | 'in-progress' | 'completed' = 'pending';
            
            if (stepsData && stepsData.length > 0) {
              const completedSteps = stepsData.filter(step => step.status === 'complete').length;
              const inProgressSteps = stepsData.filter(step => step.status === 'progress' || step.status === 'in_progress').length;
              
              progress = Math.round((completedSteps / stepsData.length) * 100);
              
              if (progress === 100) {
                status = 'completed';
              } else if (progress > 0) {
                status = 'in-progress';
              }
            }
            
            // Get user email
            const { data: userData, error: userError } = await supabase
              .from('auth.users')
              .select('email')
              .eq('id', profile.id)
              .single();
              
            const email = userError ? 'N/A' : (userData?.email || 'N/A');
            
            return {
              id: profile.id,
              name: profile.company_name,
              founderName: profile.founder_name,
              phone: profile.phone,
              email: email,
              progress,
              status,
            };
          })
        );
        
        setStartups(startupsWithProgress);
      } catch (error) {
        console.error('Error fetching startups data:', error);
        toast({
          title: "خطأ في تحميل البيانات",
          description: "حدث خطأ أثناء تحميل بيانات الشركات الناشئة",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (user && user.email === 'technoregiste@gmail.com') {
      fetchStartups();
    }
  }, [user]);

  // Function to get badge color based on status
  const getStatusBadge = (status: string, progress: number) => {
    if (status === 'completed') return <Badge className="bg-status-complete">مكتمل</Badge>;
    if (status === 'pending' || progress < 20) return <Badge className="bg-status-incomplete">لم يبدأ</Badge>;
    return <Badge className="bg-status-progress">قيد التنفيذ</Badge>;
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <div className="bg-white shadow-subtle p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-semibold text-lg">ت</span>
          </div>
          <h1 className="text-xl font-semibold">
            لوحة إدارة تكنوريجستر
          </h1>
        </div>
        <div>
          <span className="text-muted-foreground">مدير النظام</span>
        </div>
      </div>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-card p-6 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6">الشركات الناشئة المسجلة</h2>
          
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : startups.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              لا توجد شركات ناشئة مسجلة حاليًا
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الرقم</TableHead>
                    <TableHead className="text-right">اسم الشركة</TableHead>
                    <TableHead className="text-right">اسم المؤسس</TableHead>
                    <TableHead className="text-right">رقم الهاتف</TableHead>
                    <TableHead className="text-right">البريد الإلكتروني</TableHead>
                    <TableHead className="text-right">نسبة التقدم</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {startups.map((startup, index) => (
                    <TableRow key={startup.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{startup.name}</TableCell>
                      <TableCell>{startup.founderName}</TableCell>
                      <TableCell className="ltr">{startup.phone}</TableCell>
                      <TableCell className="ltr">{startup.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-secondary rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                startup.progress >= 80 ? "bg-status-complete" : 
                                startup.progress >= 40 ? "bg-status-progress" : 
                                "bg-status-incomplete"
                              }`}
                              style={{ width: `${startup.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{startup.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(startup.status, startup.progress)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;


import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface StartupData {
  id: number;
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

  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    try {
      setLoading(true);
      
      // Fetch profiles and registration steps data
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, founder_name, company_name, phone');
      
      if (profilesError) throw profilesError;
      
      // Fetch users to get email addresses
      const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
      if (usersError) throw usersError;
      
      // Get registration steps for progress calculation
      const { data: steps, error: stepsError } = await supabase
        .from('registration_steps')
        .select('profile_id, step_id, status');
      
      if (stepsError) throw stepsError;
      
      // Process the data to match our StartupData interface
      const processedData: StartupData[] = profiles ? profiles.map((profile, index) => {
        // Find user email
        const user = users && users.users ? users.users.find(u => u.id === profile.id) : undefined;
        const email = user ? user.email : '';
        
        // Calculate progress
        const userSteps = steps ? steps.filter(step => step.profile_id === profile.id) : [];
        const totalSteps = userSteps.length || 1;
        const completedSteps = userSteps.filter(step => step.status === 'complete').length;
        const inProgressSteps = userSteps.filter(step => step.status === 'progress').length;
        
        const progressPercentage = Math.round(
          ((completedSteps + (inProgressSteps * 0.5)) / totalSteps) * 100
        );
        
        // Determine status
        let status: 'pending' | 'in-progress' | 'completed' = 'pending';
        if (progressPercentage === 100) {
          status = 'completed';
        } else if (progressPercentage > 0) {
          status = 'in-progress';
        }
        
        return {
          id: index + 1,
          name: profile.company_name,
          founderName: profile.founder_name,
          phone: profile.phone,
          email: email,
          progress: progressPercentage,
          status: status
        };
      }) : [];
      
      setStartups(processedData);
    } catch (error) {
      console.error('Error fetching startups:', error);
      toast({
        title: "خطأ في تحميل البيانات",
        description: "حدث خطأ أثناء محاولة تحميل بيانات الشركات الناشئة",
        variant: "destructive",
      });
      // If there's an error, show the mock data as fallback
      setStartups([
        {
          id: 1,
          name: "تك فيستا لابز",
          founderName: "أحمد محمود",
          phone: "0550123456",
          email: "info@techvista.dz",
          progress: 42,
          status: 'in-progress'
        },
        {
          id: 2,
          name: "سمارت سوليوشنز",
          founderName: "سارة رحمان",
          phone: "0660789123",
          email: "contact@smartsolutions.dz",
          progress: 85,
          status: 'in-progress'
        },
        {
          id: 3,
          name: "ديجيتال اينوفيت",
          founderName: "محمد خالد",
          phone: "0770456789",
          email: "info@digitalinnovate.dz",
          progress: 100,
          status: 'completed'
        },
        {
          id: 4,
          name: "تيك مايند",
          founderName: "يوسف ابراهيم",
          phone: "0540123789",
          email: "contact@techmind.dz",
          progress: 14,
          status: 'pending'
        },
        {
          id: 5,
          name: "أجيل ديف",
          founderName: "ليلى عمران",
          phone: "0660452178",
          email: "info@agiledev.dz",
          progress: 71,
          status: 'in-progress'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

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
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
              <span className="sr-only">جاري التحميل...</span>
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
                  {startups.map((startup) => (
                    <TableRow key={startup.id}>
                      <TableCell className="font-medium">{startup.id}</TableCell>
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


import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  founder_name: string;
  company_name: string;
  created_at: string;
  status: string;
  progress: number;
}

interface UserEmail {
  id: string;
  email: string;
}

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const adminEmail = "technoregiste@gmail.com";

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (user.email !== adminEmail) {
      toast({
        title: "غير مصرح",
        description: "ليس لديك صلاحية الوصول إلى لوحة الإدارة",
        variant: "destructive",
      });
      navigate('/dashboard');
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        
        // Get all profiles
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles_users')
          .select('*');

        if (profilesError) throw profilesError;

        // Get registration steps for progress calculation
        const { data: steps, error: stepsError } = await supabase
          .from('registration_steps')
          .select('*');

        if (stepsError) throw stepsError;

        // Get user emails from auth.users (using function to bypass RLS)
        const { data: userEmails, error: emailsError } = await supabase
          .rpc('get_user_emails');

        if (emailsError) {
          console.error("Error fetching user emails:", emailsError);
          throw emailsError;
        }

        // Combine data
        const usersData = profiles.map(profile => {
          // Get user email
          const userEmail = userEmails?.find(u => u.id === profile.id);
          const email = userEmail ? userEmail.email : '';

          // Calculate progress
          const userSteps = steps.filter(step => step.profile_id === profile.id);
          let progress = 0;
          
          if (userSteps.length > 0) {
            const completed = userSteps.filter(step => step.status === 'complete').length;
            const inProgress = userSteps.filter(step => step.status === 'progress' || step.status === 'in_progress').length;
            progress = Math.round(((completed + (inProgress * 0.5)) / userSteps.length) * 100);
          }

          return {
            id: profile.id,
            email: email,
            founder_name: profile.founder_name,
            company_name: profile.company_name,
            created_at: new Date(profile.created_at).toLocaleDateString('ar-SA'),
            status: progress === 100 ? 'مكتمل' : progress > 0 ? 'قيد التقدم' : 'لم يبدأ',
            progress: progress
          };
        });

        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "خطأ في تحميل البيانات",
          description: "حدث خطأ أثناء محاولة تحميل بيانات المستخدمين",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, navigate, adminEmail]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">لوحة إدارة الحاضنة</h1>
        <Button onClick={() => navigate('/dashboard')} variant="outline">
          <ArrowLeft className="ml-2" size={16} />
          العودة إلى لوحة المعلومات
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <Table>
          <TableCaption>قائمة المستخدمين المسجلين في المنصة وتقدمهم في عملية التسجيل</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>اسم الشركة</TableHead>
              <TableHead>اسم المؤسس</TableHead>
              <TableHead>البريد الإلكتروني</TableHead>
              <TableHead>تاريخ التسجيل</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>نسبة التقدم</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.company_name}</TableCell>
                <TableCell>{user.founder_name}</TableCell>
                <TableCell dir="ltr">{user.email}</TableCell>
                <TableCell>{user.created_at}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'مكتمل' ? 'bg-status-complete/20 text-status-complete' :
                    user.status === 'قيد التقدم' ? 'bg-status-progress/20 text-status-progress' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>{user.progress}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminPanel;

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

// Define the structure of startup data
interface StartupData {
  id: string;
  name: string;
  founder: string;
  email: string;
  phone: string;
  progress: number;
  status: 'pending' | 'in-progress' | 'completed';
}

// Define a basic profile type to address the 'never' type issue
interface Profile {
  id: string;
  founder_name: string;
  company_name: string;
  phone: string;
  [key: string]: any;
}

// Define a step type for error handling
interface Step {
  profile_id: string;
  step_id: number;
  status: string;
  [key: string]: any;
}

// Define a User type for the auth.users data
interface User {
  id: string;
  email: string;
  [key: string]: any;
}

const AdminPanel = () => {
  const [startups, setStartups] = useState<StartupData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch user profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
      
      if (profilesError) throw profilesError;
      
      // Fetch user emails from auth.users (requires admin access)
      const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
      
      if (usersError) throw usersError;
      
      // Fetch registration steps
      const { data: steps, error: stepsError } = await supabase
        .from('registration_steps')
        .select('*');
      
      if (stepsError) throw stepsError;
      
      // Safely cast data to known types
      const typedProfiles = profiles as Profile[] | null;
      const typedSteps = steps as Step[] | null;
      const typedUsers = users?.users as User[] | undefined;
      
      // Process the data to match our StartupData interface
      const processedData: StartupData[] = typedProfiles ? typedProfiles.map((profile) => {
        // Find user email from the typed users array
        const user = typedUsers ? typedUsers.find(u => u.id === profile.id) : undefined;
        const email = user ? user.email : '';
        
        // Calculate progress
        const userSteps = typedSteps ? typedSteps.filter(step => step.profile_id === profile.id) : [];
        const totalSteps = userSteps.length || 1;
        const completedSteps = userSteps.filter(step => step.status === 'complete').length;
        const inProgressSteps = userSteps.filter(step => step.status === 'progress').length;
        
        // Calculate progress as a percentage
        const progress = Math.round(((completedSteps + (inProgressSteps * 0.5)) / totalSteps) * 100);
        
        // Determine status
        let status: 'pending' | 'in-progress' | 'completed' = 'pending';
        if (completedSteps === totalSteps) {
          status = 'completed';
        } else if (inProgressSteps > 0 || completedSteps > 0) {
          status = 'in-progress';
        }
        
        return {
          id: profile.id,
          name: profile.company_name,
          founder: profile.founder_name,
          email,
          phone: profile.phone,
          progress,
          status
        };
      }) : [];
      
      setStartups(processedData);
    } catch (err) {
      console.error('Error fetching startups:', err);
      setError('Failed to load startup data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = (status: 'pending' | 'in-progress' | 'completed') => {
    switch (status) {
      case 'pending':
        return <span className="text-gray-500">معلق</span>;
      case 'in-progress':
        return <span className="text-blue-500">قيد التقدم</span>;
      case 'completed':
        return <span className="text-green-500">مكتمل</span>;
      default:
        return <span className="text-gray-500">غير معروف</span>;
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("هل أنت متأكد أنك تريد حذف هذا الحساب؟");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      // Delete the user from auth.users (requires admin access)
      const { error: userError } = await supabase.auth.admin.deleteUser(id);

      if (userError) {
        throw userError;
      }

      // Optionally, delete the profile from the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (profileError) {
        throw profileError;
      }

      // Update the state to reflect the deletion
      setStartups(startups.filter(startup => startup.id !== id));
      toast({
        title: "تم حذف الحساب",
        description: "تم حذف الحساب بنجاح.",
      });
    } catch (err) {
      console.error("Error deleting startup:", err);
      toast({
        variant: "destructive",
        title: "فشل في حذف الحساب",
        description: "حدث خطأ أثناء محاولة حذف الحساب.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">لوحة تحكم المسؤول</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">خطأ!</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {loading ? (
        <div className="text-center">جاري التحميل...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  اسم الشركة
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  اسم المؤسس
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  البريد الإلكتروني
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  رقم الهاتف
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  التقدم
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {startups.map(startup => (
                <tr key={startup.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {startup.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {startup.founder}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {startup.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {startup.phone}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {startup.progress}%
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {renderStatus(startup.status)}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <Button variant="destructive" onClick={() => handleDelete(startup.id)}>
                      حذف
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

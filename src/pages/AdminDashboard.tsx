
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, LogOut, RefreshCw, UserPlus } from 'lucide-react';
import { calculateProgress } from '@/pages/Dashboard';

interface CompanyProfile {
  id: string;
  founder_name: string;
  company_name: string;
  company_number: string;
  phone: string;
  email: string;
  created_at: string;
  role: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [registrationProgress, setRegistrationProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    // Check if user is admin
    if (!isAdmin) {
      toast({
        title: "غير مصرح",
        description: "ليس لديك صلاحية للوصول إلى هذه الصفحة",
        variant: "destructive",
      });
      navigate('/dashboard');
    } else {
      fetchCompanies();
    }
  }, [isAdmin, navigate]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      // Fetch all non-admin profiles
      const { data, error } = await supabase
        .from('admin_view_profiles')
        .select('*')
        .eq('role', 'user');

      if (error) throw error;

      if (data) {
        setCompanies(data as CompanyProfile[]);
        
        // Fetch registration progress for each company
        for (const company of data) {
          fetchRegistrationProgress(company.id);
        }
      }
    } catch (error: any) {
      console.error('Error fetching companies:', error);
      toast({
        title: "خطأ في استرجاع البيانات",
        description: error.message || "حدث خطأ أثناء استرجاع بيانات الشركات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrationProgress = async (profileId: string) => {
    try {
      const { data, error } = await supabase
        .from('registration_steps')
        .select('*')
        .eq('profile_id', profileId);

      if (error) throw error;

      if (data && data.length > 0) {
        // Calculate progress percentage
        const steps = data.map(step => ({
          id: step.step_id,
          status: step.status,
          details: {
            documents: step.documents,
            checklistItems: step.checklist_items
          }
        }));
        
        const progress = calculateProgress(steps);
        setRegistrationProgress(prev => ({
          ...prev,
          [profileId]: progress
        }));
      } else {
        setRegistrationProgress(prev => ({
          ...prev,
          [profileId]: 0
        }));
      }
    } catch (error) {
      console.error('Error fetching registration progress:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCompanies();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">لوحة تحكم المسؤول</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              {refreshing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span className="mr-2">تحديث</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-red-500"
            >
              <LogOut className="h-4 w-4 ml-2" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">الشركات المسجلة</h2>
            <Button
              onClick={() => navigate('/auth')}
              className="flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              إضافة شركة جديدة
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : companies.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              لا توجد شركات مسجلة حتى الآن
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>قائمة الشركات المسجلة في النظام</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">اسم الشركة</TableHead>
                    <TableHead className="whitespace-nowrap">اسم المؤسس</TableHead>
                    <TableHead className="whitespace-nowrap">رقم الهاتف</TableHead>
                    <TableHead className="whitespace-nowrap">البريد الإلكتروني</TableHead>
                    <TableHead className="whitespace-nowrap">رقم السجل التجاري</TableHead>
                    <TableHead className="whitespace-nowrap">تاريخ التسجيل</TableHead>
                    <TableHead className="whitespace-nowrap">تقدم التسجيل</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.company_name}</TableCell>
                      <TableCell>{company.founder_name}</TableCell>
                      <TableCell className="ltr">{company.phone}</TableCell>
                      <TableCell className="ltr">{company.email}</TableCell>
                      <TableCell className="ltr">{company.company_number}</TableCell>
                      <TableCell>{formatDate(company.created_at)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${registrationProgress[company.id] || 0}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {registrationProgress[company.id] || 0}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;

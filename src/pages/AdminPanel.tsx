import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

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
  // Mock data for startups
  const [startups, setStartups] = useState<StartupData[]>([
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
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;

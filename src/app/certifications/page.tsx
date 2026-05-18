'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useToast } from '@/components/Toast';
import { SkeletonTable } from '@/components/Skeleton';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CertificationsPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchCerts() {
      try {
        const { data, error } = await supabase
          .from('timestamp_certifications')
          .select(`
            *,
            trade_secrets (name, code)
          `)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Fetch error:', error);
          setCerts([]);
        } else {
          setCerts(data || []);
        }
      } catch (err) {
        console.error('Error:', err);
        setCerts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCerts();
  }, []);

  const filtered = certs.filter(c => {
    if (filterStatus === 'all') return true;
    return c.status === filterStatus;
  });

  const handleDownload = (cert: any) => {
    showToast('证书下载成功！', 'success');
  };

  if (loading) {
    return <SkeletonTable />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">认证中心</h1>

      <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="搜索认证记录..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-400"></span>
        </div>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          全部
        </button>
        <button 
          onClick={() => setFilterStatus('completed')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === 'completed' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          已完成
        </button>
        <button 
          onClick={() => setFilterStatus('processing')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === 'processing' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          进行中
        </button>
        <button 
          onClick={() => setFilterStatus('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === 'pending' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          待处理
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">认证编号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">关联秘密</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">认证时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.length > 0 ? (
              filtered.map((cert) => (
                <tr key={cert.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 text-sm text-gray-900">{cert.code}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {cert.trade_secrets?.name || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(cert.created_at).toLocaleDateString('zh-CN')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      cert.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : cert.status === 'processing'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {cert.status === 'completed' ? '已完成' : cert.status === 'processing' ? '进行中' : '待处理'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDownload(cert)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      下载证书
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  暂无认证记录
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

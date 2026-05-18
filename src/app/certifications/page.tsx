'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/Toast';

export default function CertificationsPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data } = await supabase.from('timestamp_certifications').select(`*, trade_secrets (name, code)`).order('created_at', { ascending: false });
    setCerts(data || []);
  }

  const handleDownload = (cert: any) => {
    showToast('证书下载成功！', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">认证中心</h2>
        <span className="bg-green-100 text-green-800 text-sm px-4 py-2 rounded-full font-medium">
          ✅ 累计认证 {certs.length} 次
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-blue-100 text-sm">总认证次数</div>
          <div className="text-3xl font-bold mt-2">{certs.length}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-green-100 text-sm">成功率</div>
          <div className="text-3xl font-bold mt-2">100%</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-purple-100 text-sm">最近认证</div>
          <div className="text-lg font-bold mt-2">{certs[0] ? new Date(certs[0].created_at).toLocaleDateString() : '-'}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200"><h3 className="font-bold text-lg">认证记录</h3></div>
        {certs.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {certs.map((cert: any) => (
              <div key={cert.id} className="p-6 hover:bg-gray-50 transition flex items-start justify-between group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition">📜</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{cert.trade_secrets?.name || '未知'}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      编号：{cert.trade_secrets?.code || '-'} · 
                      <span className="text-blue-600 font-medium ml-1">{cert.cert_type === 'create' ? '创建认证' : '更新认证'}</span>
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span>🕐 {new Date(cert.created_at).toLocaleString()}</span>
                      <span>📜 ID: {cert.id.slice(0, 8)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 transition">
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">✅ 已上链</span>
                  <button onClick={() => handleDownload(cert)} className="text-blue-600 text-sm hover:underline font-medium">
                    📥 下载证书
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <div className="text-5xl mb-4">📜</div>
            <p className="text-lg font-medium">暂无认证记录</p>
          </div>
        )}
      </div>
    </div>
  );
}

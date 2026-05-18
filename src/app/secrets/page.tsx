'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function SecretsPage() {
  const [secrets, setSecrets] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState('');

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    const { data } = await supabase.from('trade_secrets').select(`*, secret_categories(name), secret_levels(name, code)`).order('created_at', { ascending: false });
    setSecrets(data || []);
  }

  const filtered = secrets.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase());
    const matchLevel = !filterLevel || s.secret_levels?.code === filterLevel;
    return matchSearch && matchLevel;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">商业秘密库</h2>
        <Link href="/secrets/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2">
          <span>+</span> 新增秘密
        </Link>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex gap-4">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
          <input 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
            placeholder="搜索名称或编号..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
          />
        </div>
        <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white" value={filterLevel} onChange={e => setFilterLevel(e.target.value)}>
          <option value="">全部级别</option>
          <option value="CORE">核心</option>
          <option value="IMPORTANT">重要</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">编号</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">名称</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">分类</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">级别</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">状态</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length > 0 ? filtered.map((secret: any) => (
              <tr key={secret.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{secret.code}</td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{secret.name}</div>
                  <div className="text-xs text-gray-500 truncate max-w-xs">{secret.description}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{secret.secret_categories?.name || '-'}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    secret.secret_levels?.code === 'CORE' ? 'bg-red-100 text-red-800' :
                    secret.secret_levels?.code === 'IMPORTANT' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>{secret.secret_levels?.name || '未定级'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 text-sm text-green-600">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>已认证
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link href={`/secrets/${secret.id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">查看详情</Link>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                <div className="text-4xl mb-2">🔍</div>未找到匹配的秘密
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

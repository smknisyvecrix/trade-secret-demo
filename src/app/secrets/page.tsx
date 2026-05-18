'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SkeletonTable } from '@/components/Skeleton';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SecretsPage() {
  const [secrets, setSecrets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState('');

  useEffect(() => {
    async function fetchSecrets() {
      try {
        const { data, error } = await supabase
          .from('trade_secrets')
          .select(`
            *,
            secret_categories (name),
            secret_levels (name, code)
          `)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Fetch error:', error);
          setSecrets([]);
        } else {
          setSecrets(data || []);
        }
      } catch (err) {
        console.error('Error:', err);
        setSecrets([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSecrets();
  }, []);

  const filtered = secrets.filter(s => {
    if (!s) return false;
    const matchSearch = !search || 
      (s.name && s.name.toLowerCase().includes(search.toLowerCase())) || 
      (s.code && s.code.toLowerCase().includes(search.toLowerCase()));
    const matchLevel = !filterLevel || (s.secret_levels && s.secret_levels.code === filterLevel);
    return matchSearch && matchLevel;
  });

  if (loading) {
    return <SkeletonTable />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">商业秘密库</h1>
        <a
          href="/secrets/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + 新增秘密
        </a>
      </div>

      <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="搜索秘密名称或编号..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">全部级别</option>
          <option value="CORE">核心</option>
          <option value="IMPORTANT">重要</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">编号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">分类</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">级别</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">创建时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.length > 0 ? (
              filtered.map((secret) => (
                <tr key={secret.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{secret.code || '-'}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{secret.name || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{secret.secret_categories?.name || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      secret.secret_levels?.code === 'CORE'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {secret.secret_levels?.name || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                      已保护
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {secret.created_at ? new Date(secret.created_at).toLocaleDateString('zh-CN') : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`/secrets/${secret.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      查看详情
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  {search || filterLevel ? '未找到匹配的秘密' : '暂无数据'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

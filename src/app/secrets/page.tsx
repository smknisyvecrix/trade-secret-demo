'use client';

import { useState } from 'react';

export default function SecretsPage() {
  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const secrets = [
    { id: '1', code: 'SEC-2026-001', name: '客户名单 Q1', category: '经营信息', level: 'CORE', status: 'protected', created: '2026-05-19', updated: '2026-05-19' },
    { id: '2', code: 'SEC-2026-002', name: '技术方案 V2', category: '技术信息', level: 'CORE', status: 'protected', created: '2026-05-18', updated: '2026-05-19' },
    { id: '3', code: 'SEC-2026-003', name: '财务报表 2025', category: '经营信息', level: 'IMPORTANT', status: 'protected', created: '2026-05-15', updated: '2026-05-15' },
    { id: '4', code: 'SEC-2026-004', name: '产品路线图', category: '技术信息', level: 'IMPORTANT', status: 'draft', created: '2026-05-10', updated: '2026-05-12' },
    { id: '5', code: 'SEC-2026-005', name: '市场分析报告', category: '经营信息', level: 'GENERAL', status: 'archived', created: '2026-04-20', updated: '2026-05-01' },
  ];

  const filtered = secrets.filter(s => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase());
    const matchLevel = !filterLevel || s.level === filterLevel;
    const matchStatus = !filterStatus || s.status === filterStatus;
    return matchSearch && matchLevel && matchStatus;
  });

  const levelMap: any = { CORE: { text: '核心', class: 'bg-red-100 text-red-700' }, IMPORTANT: { text: '重要', class: 'bg-orange-100 text-orange-700' }, GENERAL: { text: '一般', class: 'bg-gray-100 text-gray-700' } };
  const statusMap: any = { protected: { text: '已保护', class: 'bg-green-100 text-green-700' }, draft: { text: '草稿', class: 'bg-yellow-100 text-yellow-700' }, archived: { text: '已归档', class: 'bg-gray-100 text-gray-700' } };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">秘密库</h1>
          <p className="text-sm text-gray-500 mt-1">管理企业商业秘密全生命周期</p>
        </div>
        <a href="/secrets/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <span>➕</span>
          <span>新增秘密</span>
        </a>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <input type="text" placeholder="搜索秘密名称或编号..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
          <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">全部级别</option>
            <option value="CORE">核心</option>
            <option value="IMPORTANT">重要</option>
            <option value="GENERAL">一般</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">全部状态</option>
            <option value="protected">已保护</option>
            <option value="draft">草稿</option>
            <option value="archived">已归档</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">编号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">分类</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">级别</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">更新时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-blue-600">{s.code}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{s.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{s.category}</td>
                <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${levelMap[s.level].class}`}>{levelMap[s.level].text}</span></td>
                <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusMap[s.status].class}`}>{statusMap[s.status].text}</span></td>
                <td className="px-6 py-4 text-sm text-gray-500">{s.updated}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <a href={`/secrets/${s.id}`} className="text-blue-600 hover:text-blue-800 text-sm">查看</a>
                    <button className="text-gray-600 hover:text-gray-800 text-sm">编辑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-12 text-gray-500">未找到匹配的秘密</div>}
      </div>
    </div>
  );
}

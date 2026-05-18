'use client';

import { useState } from 'react';

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const users = [
    { id: '1', name: '张三', email: 'zhangsan@company.com', role: 'admin', roleText: '管理员', status: 'active', statusText: '活跃', lastLogin: '2026-05-19 14:30', dept: '技术部' },
    { id: '2', name: '李四', email: 'lisi@company.com', role: 'user', roleText: '普通用户', status: 'active', statusText: '活跃', lastLogin: '2026-05-19 10:20', dept: '销售部' },
    { id: '3', name: '王五', email: 'wangwu@company.com', role: 'auditor', roleText: '审计员', status: 'inactive', statusText: '停用', lastLogin: '2026-05-15 09:00', dept: '财务部' },
    { id: '4', name: '赵六', email: 'zhaoliu@company.com', role: 'user', roleText: '普通用户', status: 'active', statusText: '活跃', lastLogin: '2026-05-18 16:45', dept: '市场部' },
  ];

  const roleClass: any = { admin: 'bg-purple-100 text-purple-700', user: 'bg-gray-100 text-gray-700', auditor: 'bg-blue-100 text-blue-700' };
  const statusClass: any = { active: 'bg-green-100 text-green-700', inactive: 'bg-red-100 text-red-700' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
          <p className="text-sm text-gray-500 mt-1">管理系统用户与角色权限</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <span>➕</span>
          <span>新增用户</span>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-blue-600">24</p>
          <p className="text-sm text-gray-500">总用户数</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-green-600">18</p>
          <p className="text-sm text-gray-500">活跃用户</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-purple-600">3</p>
          <p className="text-sm text-gray-500">管理员</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-orange-600">6</p>
          <p className="text-sm text-gray-500">待审核</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <input type="text" placeholder="搜索用户姓名或邮箱..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">全部角色</option>
            <option value="admin">管理员</option>
            <option value="user">普通用户</option>
            <option value="auditor">审计员</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">部门</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">角色</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">最后登录</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">{u.name[0]}</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{u.dept}</td>
                <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${roleClass[u.role]}`}>{u.roleText}</span></td>
                <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClass[u.status]}`}>{u.statusText}</span></td>
                <td className="px-6 py-4 text-sm text-gray-500">{u.lastLogin}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">编辑</button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm">{u.status === 'active' ? '禁用' : '启用'}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

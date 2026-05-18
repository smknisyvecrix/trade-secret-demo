'use client';

import { useState } from 'react';

export default function SecretDetailPage() {
  const [activeTab, setActiveTab] = useState('info');

  const tabs = [
    { id: 'info', label: '基本信息' },
    { id: 'certs', label: '认证时间线' },
    { id: 'permissions', label: '权限管理' },
    { id: 'logs', label: '访问日志' },
  ];

  const secret = {
    code: 'SEC-2026-001',
    name: '客户名单 Q1',
    category: '经营信息',
    level: '核心机密',
    status: '已保护',
    owner: '张三',
    created: '2026-05-19 10:30',
    updated: '2026-05-19 14:20',
    description: '2026 年第一季度重点客户名单，包含联系方式、合作意向、预计金额等敏感信息。',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{secret.name}</h1>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">{secret.status}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">编号：{secret.code} · 创建人：{secret.owner}</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
            <span>📦</span>
            <span>生成证据包</span>
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">编辑</button>
          <button className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100">删除</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6">
          <nav className="flex gap-6">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'info' && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">分类</label>
                  <p className="text-gray-900">{secret.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">级别</label>
                  <p className="text-gray-900">{secret.level}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">创建时间</label>
                  <p className="text-gray-900">{secret.created}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">更新时间</label>
                  <p className="text-gray-900">{secret.updated}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">负责人</label>
                  <p className="text-gray-900">{secret.owner}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">描述</label>
                  <p className="text-gray-900">{secret.description}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'certs' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-2xl"></span>
                <div>
                  <p className="font-medium text-blue-900">首次认证时间</p>
                  <p className="text-sm text-blue-700">2026-05-19 10:30:00 · 时间戳证书编号：TSA-2026-001234</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div className="w-0.5 h-12 bg-gray-200"></div>
                  </div>
                  <div className="pb-6">
                    <p className="font-medium text-gray-900">完成首次时间戳认证</p>
                    <p className="text-sm text-gray-500 mt-1">2026-05-19 10:30:00</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">文件哈希值固化</p>
                    <p className="text-sm text-gray-500 mt-1">2026-05-19 10:30:05 · SHA256: a1b2c3d4...</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">授权用户列表</h3>
                <button className="text-blue-600 text-sm hover:text-blue-800">+ 添加用户</button>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">用户</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">权限</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">状态</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3 text-sm">张三（负责人）</td>
                    <td className="px-4 py-3 text-sm">读取、编辑、下载</td>
                    <td className="px-4 py-3"><span className="text-green-600 text-xs">生效中</span></td>
                    <td className="px-4 py-3"><button className="text-gray-600 text-sm">编辑</button></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">李四</td>
                    <td className="px-4 py-3 text-sm">仅读取</td>
                    <td className="px-4 py-3"><span className="text-green-600 text-xs">生效中</span></td>
                    <td className="px-4 py-3"><button className="text-gray-600 text-sm">编辑</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'logs' && (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">操作</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">用户</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">IP 地址</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">时间</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3 text-sm">查看详细信息</td>
                  <td className="px-4 py-3 text-sm">张三</td>
                  <td className="px-4 py-3 text-sm text-gray-500">192.168.1.100</td>
                  <td className="px-4 py-3 text-sm text-gray-500">2026-05-19 14:30</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm">下载文件</td>
                  <td className="px-4 py-3 text-sm">李四</td>
                  <td className="px-4 py-3 text-sm text-gray-500">192.168.1.101</td>
                  <td className="px-4 py-3 text-sm text-gray-500">2026-05-18 15:20</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

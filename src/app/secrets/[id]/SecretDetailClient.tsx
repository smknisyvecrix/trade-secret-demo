'use client';

import { useState } from 'react';

export default function SecretDetailClient({ secret, certs }: any) {
  const [activeTab, setActiveTab] = useState('info');

  const tabs = [
    { id: 'info', label: '基本信息' },
    { id: 'certs', label: '认证时间线' },
    { id: 'permissions', label: '权限管理' },
    { id: 'logs', label: '访问日志' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{secret.name}</h1>
          <p className="text-sm text-gray-500 mt-1">编号：{secret.code}</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg">
            <span>📦</span>
            <span>生成证据包</span>
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            编辑
          </button>
          <button className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors">
            删除
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'info' && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">分类</label>
                <p className="text-gray-900">{secret.secret_categories?.name || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">级别</label>
                <p className="text-gray-900">{secret.secret_levels?.name || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">状态</label>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                  已保护
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">创建时间</label>
                <p className="text-gray-900">{new Date(secret.created_at).toLocaleDateString('zh-CN')}</p>
              </div>
              {secret.file_path && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">附件</label>
                  <a href={secret.file_path} target="_blank" className="text-blue-600 hover:underline flex items-center gap-2">
                    <span>📄</span>
                    <span>下载文件</span>
                  </a>
                </div>
              )}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-500 mb-1">描述</label>
                <p className="text-gray-900">{secret.description || '暂无描述'}</p>
              </div>
            </div>
          )}

          {activeTab === 'certs' && (
            <div className="space-y-4">
              {certs.length > 0 ? (
                certs.map((cert: any, index: number) => (
                  <div key={cert.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      {index < certs.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1"></div>}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-gray-900">{cert.code}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(cert.created_at).toLocaleString('zh-CN')}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{cert.description || '完成时间戳认证'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">暂无认证记录</p>
              )}
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-4">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">用户</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">权限</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3 text-sm">张三</td>
                    <td className="px-4 py-3 text-sm">读取、编辑</td>
                    <td className="px-4 py-3"><span className="text-green-600 text-xs">生效中</span></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">李四</td>
                    <td className="px-4 py-3 text-sm">仅读取</td>
                    <td className="px-4 py-3"><span className="text-green-600 text-xs">生效中</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-4">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">用户</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">时间</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3 text-sm">查看详细信息</td>
                    <td className="px-4 py-3 text-sm">张三</td>
                    <td className="px-4 py-3 text-sm text-gray-500">2026-05-19 10:30</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">下载文件</td>
                    <td className="px-4 py-3 text-sm">李四</td>
                    <td className="px-4 py-3 text-sm text-gray-500">2026-05-18 15:20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

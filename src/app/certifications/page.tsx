'use client';

import { useState } from 'react';

export default function CertificationsPage() {
  const [activeTab, setActiveTab] = useState('list');
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');

  const certs = [
    { id: 'TSA-2026-001', secretCode: 'SEC-2026-001', secretName: '客户名单 Q1', certTime: '2026-05-19 10:30:00', hash: 'a1b2c3d4e5f6...', status: 'completed', issuer: '联合信任时间戳服务中心' },
    { id: 'TSA-2026-002', secretCode: 'SEC-2026-002', secretName: '技术方案 V2', certTime: '2026-05-19 12:15:00', hash: 'f6e5d4c3b2a1...', status: 'completed', issuer: '联合信任时间戳服务中心' },
    { id: 'TSA-2026-003', secretCode: 'SEC-2026-003', secretName: '财务报表 2025', certTime: '-', hash: '-', status: 'pending', issuer: '-' },
    { id: 'TSA-2026-004', secretCode: 'SEC-2026-004', secretName: '产品路线图', certTime: '-', hash: '-', status: 'processing', issuer: '-' },
  ];

  const statusClass: any = { completed: 'bg-green-100 text-green-700', pending: 'bg-yellow-100 text-yellow-700', processing: 'bg-blue-100 text-blue-700' };
  const statusText: any = { completed: '已完成', pending: '待认证', processing: '认证中' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">认证中心</h1>
          <p className="text-sm text-gray-500 mt-1">时间戳认证管理，保障商业秘密法律效力</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">+ 批量认证</button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">认证总数</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">987</p>
          <p className="text-xs text-green-600 mt-2">↑ 8% 较上月</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">认证成功率</p>
          <p className="text-3xl font-bold text-green-600 mt-1">99.2%</p>
          <p className="text-xs text-green-600 mt-2">↑ 1.5% 较上月</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">待认证</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">5</p>
          <p className="text-xs text-gray-500 mt-2">需尽快处理</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">平均耗时</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">2.3s</p>
          <p className="text-xs text-green-600 mt-2">↑ 15% 优化</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6">
          <nav className="flex gap-6">
            <button onClick={() => setActiveTab('list')} className={`py-4 text-sm font-medium border-b-2 ${activeTab === 'list' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>认证列表</button>
            <button onClick={() => setActiveTab('timeline')} className={`py-4 text-sm font-medium border-b-2 ${activeTab === 'timeline' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>认证时间线</button>
            <button onClick={() => setActiveTab('stats')} className={`py-4 text-sm font-medium border-b-2 ${activeTab === 'stats' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>认证统计</button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'list' && (
            <>
              <div className="flex gap-4 items-center mb-4">
                <div className="flex-1 relative">
                  <input type="text" placeholder="搜索证书编号或秘密名称..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">全部状态</option>
                  <option value="completed">已完成</option>
                  <option value="processing">认证中</option>
                  <option value="pending">待认证</option>
                </select>
              </div>

              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">证书编号</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">关联秘密</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">认证时间</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">文件哈希</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">状态</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {certs.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-blue-600">{c.id}</td>
                      <td className="px-4 py-3 text-sm">{c.secretName}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{c.certTime}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-500">{c.hash}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full ${statusClass[c.status]}`}>{statusText[c.status]}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="text-blue-600 text-sm">查看</button>
                          {c.status === 'completed' && <button className="text-green-600 text-sm">下载证书</button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-3xl">🔒</span>
                <div>
                  <p className="font-medium text-blue-900">首次认证时间</p>
                  <p className="text-sm text-blue-700">2026-01-15 09:00:00 · 累计完成 987 次认证</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { time: '2026-05-19 12:15', event: '技术方案 V2 完成时间戳认证', type: 'success' },
                  { time: '2026-05-19 10:30', event: '客户名单 Q1 完成时间戳认证', type: 'success' },
                  { time: '2026-05-18 16:45', event: '财务报表 2025 提交认证申请', type: 'info' },
                  { time: '2026-05-18 14:20', event: '产品路线图 提交认证申请', type: 'info' },
                  { time: '2026-05-17 09:00', event: '系统完成批量认证（15 个文件）', type: 'success' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${item.type === 'success' ? 'bg-green-600' : 'bg-blue-600'}`}></div>
                      {i < 4 && <div className="w-0.5 h-12 bg-gray-200"></div>}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-gray-900">{item.event}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">月度认证趋势</h4>
                <div className="flex items-end justify-between h-40 gap-2">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t" style={{ height: h + '%' }}></div>
                      <span className="text-xs text-gray-400 mt-2">{i + 1}月</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-4">认证类型分布</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm">文件哈希认证</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm">存在性认证</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm">完整性认证</span>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

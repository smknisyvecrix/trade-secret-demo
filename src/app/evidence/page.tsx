'use client';

import { useState } from 'react';

export default function EvidencePage() {
  const [activeTab, setActiveTab] = useState('list');
  const [filterType, setFilterType] = useState('');
  const [search, setSearch] = useState('');

  const evidence = [
    { id: 'EV-2026-001', name: '客户名单泄露证据', type: 'screenshot', typeText: '网页截图', source: '某技术论坛', status: 'solidified', solidified: '2026-05-19 10:30', hash: 'a1b2c3d4...', notarized: 'pending' },
    { id: 'EV-2026-002', name: '内部邮件往来记录', type: 'email', typeText: '邮件记录', source: '企业邮箱', status: 'solidified', solidified: '2026-05-18 15:20', hash: 'e5f6g7h8...', notarized: 'completed' },
    { id: 'EV-2026-003', name: '竞品技术方案对比', type: 'document', typeText: '文档材料', source: '公开渠道', status: 'collecting', solidified: '-', hash: '-', notarized: 'pending' },
    { id: 'EV-2026-004', name: '离职员工操作日志', type: 'log', typeText: '系统日志', source: '内部系统', status: 'solidified', solidified: '2026-05-17 09:00', hash: 'i9j0k1l2...', notarized: 'completed' },
  ];

  const typeClass: any = { screenshot: 'bg-blue-100 text-blue-700', email: 'bg-green-100 text-green-700', document: 'bg-purple-100 text-purple-700', log: 'bg-orange-100 text-orange-700' };
  const statusClass: any = { solidified: 'bg-green-100 text-green-700', collecting: 'bg-yellow-100 text-yellow-700' };
  const statusText: any = { solidified: '已固化', collecting: '采集中' };
  const notarizedClass: any = { completed: 'bg-green-100 text-green-700', pending: 'bg-yellow-100 text-yellow-700' };
  const notarizedText: any = { completed: '已公证', pending: '待公证' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">证据保全</h1>
          <p className="text-sm text-gray-500 mt-1">证据收集、固化与公证，保障维权法律效力</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <span>📸</span>
          <span>采集证据</span>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">证据总数</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">156</p>
          <p className="text-xs text-green-600 mt-2">↑ 12 条 较上月</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">已固化</p>
          <p className="text-3xl font-bold text-green-600 mt-1">142</p>
          <p className="text-xs text-gray-500 mt-2">固化率 91%</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">已公证</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">89</p>
          <p className="text-xs text-gray-500 mt-2">公证率 57%</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">已采信</p>
          <p className="text-3xl font-bold text-orange-600 mt-1">23</p>
          <p className="text-xs text-green-600 mt-2">采信率 100%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6">
          <nav className="flex gap-6">
            <button onClick={() => setActiveTab('list')} className={`py-4 text-sm font-medium border-b-2 ${activeTab === 'list' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>证据列表</button>
            <button onClick={() => setActiveTab('process')} className={`py-4 text-sm font-medium border-b-2 ${activeTab === 'process' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`)>保全流程</button>
            <button onClick={() => setActiveTab('stats')} className={`py-4 text-sm font-medium border-b-2 ${activeTab === 'stats' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>统计分析</button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'list' && (
            <>
              <div className="flex gap-4 items-center mb-4">
                <div className="flex-1 relative">
                  <input type="text" placeholder="搜索证据名称或编号..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">全部类型</option>
                  <option value="screenshot">网页截图</option>
                  <option value="email">邮件记录</option>
                  <option value="document">文档材料</option>
                  <option value="log">系统日志</option>
                </select>
              </div>

              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">证据编号</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">证据名称</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">类型</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">来源</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">状态</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">固化时间</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">公证</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {evidence.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-blue-600">{e.id}</td>
                      <td className="px-4 py-3 text-sm font-medium">{e.name}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full ${typeClass[e.type]}`}>{e.typeText}</span></td>
                      <td className="px-4 py-3 text-sm text-gray-600">{e.source}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full ${statusClass[e.status]}`}>{statusText[e.status]}</span></td>
                      <td className="px-4 py-3 text-sm text-gray-500">{e.solidified}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full ${notarizedClass[e.notarized]}`}>{notarizedText[e.notarized]}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="text-blue-600 text-sm">查看</button>
                          <button className="text-green-600 text-sm">下载</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {activeTab === 'process' && (
            <div className="max-w-2xl mx-auto">
              <div className="space-y-8">
                {[
                  { step: 1, title: '证据采集', desc: '通过网页截图、邮件导出、文档上传等方式收集证据', status: 'done' },
                  { step: 2, title: '哈希计算', desc: '对证据文件进行 SHA256 哈希计算，生成唯一指纹', status: 'done' },
                  { step: 3, title: '时间戳固化', desc: '联合信任时间戳服务中心对哈希值进行时间戳认证', status: 'done' },
                  { step: 4, title: '证据存证', desc: '将固化后的证据安全存储，确保证据完整性', status: 'done' },
                  { step: 5, title: '公证申请', desc: '向公证处申请证据保全公证，获取公证书', status: 'processing' },
                  { step: 6, title: '维权使用', desc: '在诉讼或投诉中使用公证证据进行维权', status: 'pending' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        item.status === 'done' ? 'bg-green-600 text-white' : 
                        item.status === 'processing' ? 'bg-blue-600 text-white' : 
                        'bg-gray-200 text-gray-500'
                      }`}>
                        {item.status === 'done' ? '✓' : item.step}
                      </div>
                      {item.step < 6 && <div className={`w-0.5 h-16 ${item.status === 'done' ? 'bg-green-600' : 'bg-gray-200'}`}></div>}
                    </div>
                    <div className="pb-8">
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">证据类型分布</h4>
                <div className="space-y-3">
                  {[
                    { type: '网页截图', count: 45, percent: 29 },
                    { type: '邮件记录', count: 38, percent: 24 },
                    { type: '文档材料', count: 42, percent: 27 },
                    { type: '系统日志', count: 31, percent: 20 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1"><span>{item.type}</span><span className="text-gray-500">{item.count} 条 ({item.percent}%)</span></div>
                      <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percent}%` }}></div></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-4">月度证据采集趋势</h4>
                <div className="flex items-end justify-between h-40 gap-2">
                  {[20, 35, 25, 45, 30, 55, 40, 50, 35, 45, 60, 50].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t" style={{ height: h + '%' }}></div>
                      <span className="text-xs text-gray-400 mt-2">{i + 1}月</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

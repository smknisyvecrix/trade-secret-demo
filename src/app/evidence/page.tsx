'use client';

import { useState } from 'react';

export default function EvidencePage() {
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const evidence = [
    { id: 'EV-2026-001', name: '客户名单泄露证据', type: 'screenshot', typeText: '网页截图', source: '某技术论坛', status: 'solidified', solidified: '2026-05-19 10:30', hash: 'a1b2c3d4e5f6...', notarized: 'completed' },
    { id: 'EV-2026-002', name: '竞品产品对比图', type: 'image', typeText: '图片', source: '竞品官网', status: 'collecting', solidified: '2026-05-18 14:20', hash: 'b2c3d4e5f6a7...', notarized: 'pending' },
    { id: 'EV-2026-003', name: '源代码泄露录屏', type: 'video', typeText: '视频录屏', source: 'GitHub 仓库', status: 'solidified', solidified: '2026-05-17 09:15', hash: 'c3d4e5f6a7b8...', notarized: 'completed' },
    { id: 'EV-2026-004', name: '邮件往来记录', type: 'document', typeText: '文档', source: '企业邮箱', status: 'notarized', solidified: '2026-05-16 16:45', hash: 'd4e5f6a7b8c9...', notarized: 'completed' },
  ];

  const processSteps = [
    { step: 1, name: '发现线索', desc: '监控发现疑似泄密行为' },
    { step: 2, name: '收集证据', desc: '截图、录屏、下载原始文件' },
    { step: 3, name: '固定证据', desc: '上传系统生成哈希值' },
    { step: 4, name: '时间戳认证', desc: '联合信任时间戳认证' },
    { step: 5, name: '公证存证', desc: '对接公证处存证' },
    { step: 6, name: '形成证据链', desc: '完整证据链可用于诉讼' },
  ];

  const stats = {
    total: 156,
    collecting: 23,
    solidified: 89,
    notarized: 44,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'collecting': return 'bg-yellow-100 text-yellow-800';
      case 'solidified': return 'bg-blue-100 text-blue-800';
      case 'notarized': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'collecting': return '收集';
      case 'solidified': return '已固定';
      case 'notarized': return '已公证';
      default: return '未知';
    }
  };

  const getNotarizedColor = (notarized) => {
    return notarized === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600';
  };

  const getNotarizedText = (notarized) => {
    return notarized === 'completed' ? '已公证' : '待公证';
  };

  const filteredEvidence = evidence.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = typeFilter === 'all' || item.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">证据保全</h1>
          <p className="mt-1 text-sm text-gray-500">证据收集、固定与公证，保障维权法律效力</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <span>+</span>
          <span>收集证据</span>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm font-medium text-gray-500">证据总数</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm font-medium text-gray-500">收集中</p>
          <p className="mt-2 text-3xl font-bold text-yellow-600">{stats.collecting}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm font-medium text-gray-500">已固定</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">{stats.solidified}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm font-medium text-gray-500">已公证</p>
          <p className="mt-2 text-3xl font-bold text-green-600">{stats.notarized}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button onClick={() => setActiveTab('list')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'list' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              证据列表
            </button>
            <button onClick={() => setActiveTab('process')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'process' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              保全流程
            </button>
            <button onClick={() => setActiveTab('stats')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'stats' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              统计分析
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'list' && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="搜索证据名称或编号..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">全部类型</option>
                  <option value="screenshot">网页截图</option>
                  <option value="image">图片</option>
                  <option value="video">视频录屏</option>
                  <option value="document">文档</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">编号</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">证据名称</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">类型</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">来源</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">状态</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">固定时间</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">公证</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvidence.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-mono text-gray-600">{item.id}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{item.typeText}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{item.source}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                            {getStatusText(item.status)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{item.solidified}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getNotarizedColor(item.notarized)}`}>
                            {getNotarizedText(item.notarized)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">查看</button>
                          <button className="text-gray-600 hover:text-gray-800">下载</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-8">
                {processSteps.map((step, index) => (
                  <div key={step.step} className="flex-1 text-center">
                    <div className="flex items-center justify-center">
                      {index > 0 && <div className="flex-1 h-0.5 bg-gray-200 mr-2" />}
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-bold">
                        {step.step}
                      </div>
                      {index < processSteps.length - 1 && <div className="flex-1 h-0.5 bg-gray-200 ml-2" />}
                    </div>
                    <p className="mt-2 text-sm font-medium text-gray-900">{step.name}</p>
                    <p className="mt-1 text-xs text-gray-500">{step.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-800">
                  提示：完整的保全流程可以确保证据的法律效力。每个步骤都有时间戳认证，形成不可篡改的证据链。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">证据类型分布</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">网页截图</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }} />
                      </div>
                      <span className="text-sm font-medium text-gray-900">40%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">图片</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '25%' }} />
                      </div>
                      <span className="text-sm font-medium text-gray-900">25%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">视频录屏</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: '20%' }} />
                      </div>
                      <span className="text-sm font-medium text-gray-900">20%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">文档</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '15%' }} />
                      </div>
                      <span className="text-sm font-medium text-gray-900">15%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">公证状态统计</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">已公证</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '28%' }} />
                      </div>
                      <span className="text-sm font-medium text-gray-900">28%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">待公证</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: '72%' }} />
                      </div>
                      <span className="text-sm font-medium text-gray-900">72%</span>
                    </div>
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

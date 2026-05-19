'use client';

import { useState } from 'react';

export default function IntelligencePage() {
  const [activeTab, setActiveTab] = useState('alerts');

  const alerts = [
    { id: 1, level: 'high', title: '检测到疑似核心技术外泄', source: '某技术论坛', time: '10 分钟前', status: 'pending' },
    { id: 2, level: 'medium', title: '竞品发布相似技术方案', source: '行业新闻', time: '2 小时前', status: 'processing' },
    { id: 3, level: 'low', title: '前员工在社交平台讨论内部项目', source: '微博', time: '5 小时前', status: 'resolved' },
    { id: 4, level: 'high', title: '暗网发现疑似客户数据交易', source: '暗网监控', time: '1 天前', status: 'pending' },
  ];

  const competitors = [
    { id: 1, name: '竞争对手 A', action: '发布新产品技术白皮书', time: '2026-05-18', risk: 'high' },
    { id: 2, name: '竞争对手 B', action: '申请相似技术专利', time: '2026-05-15', risk: 'medium' },
    { id: 3, name: '竞争对手 C', action: '挖角核心技术团队成员', time: '2026-05-10', risk: 'high' },
  ];

  const sentiments = [
    { id: 1, keyword: '公司名称', positive: 65, negative: 20, neutral: 15, trend: 'up' },
    { id: 2, keyword: '核心技术', positive: 45, negative: 35, neutral: 20, trend: 'down' },
    { id: 3, keyword: '产品安全', positive: 80, negative: 10, neutral: 10, trend: 'up' },
  ];

  const levelClass: any = { high: 'bg-red-100 text-red-700', medium: 'bg-yellow-100 text-yellow-700', low: 'bg-green-100 text-green-700' };
  const levelText: any = { high: '高危', medium: '中危', low: '低危' };
  const statusClass: any = { pending: 'bg-red-100 text-red-700', processing: 'bg-blue-100 text-blue-700', resolved: 'bg-green-100 text-green-700' };
  const statusText: any = { pending: '待处理', processing: '处理中', resolved: '已解决' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">情报监控</h1>
          <p className="text-sm text-gray-500 mt-1">实时监控外部泄密风险与竞品动态</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">🔄 刷新数据</button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
          <p className="text-2xl font-bold text-red-700">3</p>
          <p className="text-sm text-red-600">泄密预警</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
          <p className="text-2xl font-bold text-blue-700">12</p>
          <p className="text-sm text-blue-600">竞品动态</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl">
          <p className="text-2xl font-bold text-purple-700">5</p>
          <p className="text-sm text-purple-600">舆情监测</p>
        </div>
        <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
          <p className="text-2xl font-bold text-green-700">89%</p>
          <p className="text-sm text-green-600">监控覆盖率</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6">
          <nav className="flex gap-6">
            <button onClick={() => setActiveTab('alerts')} className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'alerts' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>泄密预警</button>
            <button onClick={() => setActiveTab('competitors')} className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'competitors' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>竞品动态</button>
            <button onClick={() => setActiveTab('sentiments')} className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'sentiments' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>舆情监测</button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'alerts' && (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${levelClass[alert.level]}`}>{levelText[alert.level]}</span>
                      <div>
                        <p className="font-medium text-gray-900">{alert.title}</p>
                        <p className="text-sm text-gray-500 mt-1">来源：{alert.source} · {alert.time}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClass[alert.status]}`}>{statusText[alert.status]}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="text-blue-600 text-sm hover:text-blue-800">查看详情</button>
                    <button className="text-gray-600 text-sm hover:text-gray-800">标记处理</button>
                    <button className="text-gray-600 text-sm hover:text-gray-800">忽略</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'competitors' && (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">竞争对手</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">动态内容</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">时间</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">风险等级</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {competitors.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{c.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{c.action}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{c.time}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full ${levelClass[c.risk]}`}>{levelText[c.risk]}</span></td>
                    <td className="px-4 py-3"><button className="text-blue-600 text-sm">分析</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'sentiments' && (
            <div className="space-y-4">
              {sentiments.map((s) => (
                <div key={s.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium">{s.keyword}</p>
                    <span className={`text-sm ${s.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>{s.trend === 'up' ? '↑ 正面趋势' : '↓ 负面趋势'}</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1"><span>正面</span><span>{s.positive}%</span></div>
                      <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: `${s.positive}%` }}></div></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1"><span>负面</span><span>{s.negative}%</span></div>
                      <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-red-500 h-2 rounded-full" style={{ width: `${s.negative}%` }}></div></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1"><span>中性</span><span>{s.neutral}%</span></div>
                      <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-gray-400 h-2 rounded-full" style={{ width: `${s.neutral}%` }}></div></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

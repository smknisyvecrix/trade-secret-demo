'use client';

import { useState } from 'react';

export default function RightsProtectionPage() {
  const [activeTab, setActiveTab] = useState('cases');

  const cases = [
    { id: 'CASE-001', title: '诉前证据保全申请', type: 'litigation', status: 'processing', court: '北京知识产权法院', lawyer: '张律师', created: '2026-05-10', updated: '2026-05-18' },
    { id: 'CASE-002', title: '侵权投诉 - 某电商平台', type: 'complaint', status: 'resolved', court: '-', lawyer: '李律师', created: '2026-04-20', updated: '2026-05-15' },
    { id: 'CASE-003', title: '商业秘密侵权诉讼', type: 'litigation', status: 'pending', court: '上海知识产权法院', lawyer: '王律师', created: '2026-05-15', updated: '2026-05-15' },
  ];

  const lawyers = [
    { id: 1, name: '张律师', firm: '某某律师事务所', specialty: '知识产权诉讼', cases: 12, winRate: '85%' },
    { id: 2, name: '李律师', firm: '某某律师事务所', specialty: '商业秘密保护', cases: 8, winRate: '90%' },
    { id: 3, name: '王律师', firm: '某某律师事务所', specialty: '侵权维权', cases: 15, winRate: '80%' },
  ];

  const statusClass: any = { pending: 'bg-yellow-100 text-yellow-700', processing: 'bg-blue-100 text-blue-700', resolved: 'bg-green-100 text-green-700' };
  const statusText: any = { pending: '待立案', processing: '审理中', resolved: '已结案' };
  const typeClass: any = { litigation: 'bg-purple-100 text-purple-700', complaint: 'bg-blue-100 text-blue-700' };
  const typeText: any = { litigation: '诉讼', complaint: '投诉' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">维权中心</h1>
          <p className="text-sm text-gray-500 mt-1">管理侵权维权案件与律师协作</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">+ 新建案件</button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-red-600">3</p>
          <p className="text-sm text-gray-500">进行中案件</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-green-600">12</p>
          <p className="text-sm text-gray-500">已胜诉</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-blue-600">¥2.5M</p>
          <p className="text-sm text-gray-500">获赔金额</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-purple-600">5</p>
          <p className="text-sm text-gray-500">合作律师</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6">
          <nav className="flex gap-6">
            <button onClick={() => setActiveTab('cases')} className={`py-4 text-sm font-medium border-b-2 ${activeTab === 'cases' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>案件管理</button>
            <button onClick={() => setActiveTab('lawyers')} className={`py-4 text-sm font-medium border-b-2 ${activeTab === 'lawyers' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>律师库</button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'cases' && (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">案件编号</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">案件名称</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">类型</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">状态</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">负责律师</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">更新时间</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {cases.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-blue-600">{c.id}</td>
                    <td className="px-4 py-3 text-sm font-medium">{c.title}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full ${typeClass[c.type]}`}>{typeText[c.type]}</span></td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full ${statusClass[c.status]}`}>{statusText[c.status]}</span></td>
                    <td className="px-4 py-3 text-sm">{c.lawyer}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{c.updated}</td>
                    <td className="px-4 py-3"><button className="text-blue-600 text-sm">查看</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'lawyers' && (
            <div className="grid grid-cols-3 gap-4">
              {lawyers.map((l) => (
                <div key={l.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">{l.name[0]}</div>
                    <div>
                      <p className="font-medium">{l.name}</p>
                      <p className="text-xs text-gray-500">{l.firm}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">专业领域</span><span>{l.specialty}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">承办案件</span><span>{l.cases} 件</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">胜诉率</span><span className="text-green-600 font-medium">{l.winRate}</span></div>
                  </div>
                  <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg text-sm">委托案件</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

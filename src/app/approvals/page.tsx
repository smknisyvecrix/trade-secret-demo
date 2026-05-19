'use client';

import { useState } from 'react';

export default function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState('pending');

  const pending = [
    { id: 1, type: '下载申请', user: '李四', target: '客户名单 Q1', reason: '需要联系客户进行业务洽谈', time: '2026-05-19 14:30', urgency: 'high' },
    { id: 2, type: '权限申请', user: '王五', target: '技术方案 V2', reason: '参与项目研发需要查看技术资料', time: '2026-05-19 12:15', urgency: 'medium' },
    { id: 3, type: '下载申请', user: '赵六', target: '财务报表 2025', reason: '年度审计需要', time: '2026-05-18 16:45', urgency: 'low' },
  ];

  const history = [
    { id: 4, type: '下载申请', user: '张三', target: '产品路线图', result: 'approved', approver: '管理员', time: '2026-05-18 10:00' },
    { id: 5, type: '权限申请', user: '钱七', target: '客户名单 Q1', result: 'rejected', approver: '管理员', time: '2026-05-17 15:30' },
  ];

  const urgencyClass: any = { high: 'bg-red-100 text-red-700', medium: 'bg-yellow-100 text-yellow-700', low: 'bg-green-100 text-green-700' };
  const urgencyText: any = { high: '紧急', medium: '一般', low: '低' };
  const resultClass: any = { approved: 'bg-green-100 text-green-700', rejected: 'bg-red-100 text-red-700' };
  const resultText: any = { approved: '已通过', rejected: '已拒绝' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">审批流程</h1>
          <p className="text-sm text-gray-500 mt-1">管理商业秘密访问与操作审批</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
          <p className="text-2xl font-bold text-yellow-700">5</p>
          <p className="text-sm text-yellow-600">待审批</p>
        </div>
        <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
          <p className="text-2xl font-bold text-green-700">12</p>
          <p className="text-sm text-green-600">已通过</p>
        </div>
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
          <p className="text-2xl font-bold text-red-700">2</p>
          <p className="text-sm text-red-600">已拒绝</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6">
          <nav className="flex gap-6">
            <button onClick={() => setActiveTab('pending')} className={`py-4 text-sm font-medium border-b-2 ${activeTab === 'pending' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>待审批 ({pending.length})</button>
            <button onClick={() => setActiveTab('history')} className={`py-4 text-sm font-medium border-b-2 ${activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>审批历史</button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'pending' && (
            <div className="space-y-4">
              {pending.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.type}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${urgencyClass[item.urgency]}`}>{urgencyText[item.urgency]}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">申请人：{item.user} · {item.time}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg mb-3">
                    <p className="text-sm"><span className="text-gray-500">申请对象：</span>{item.target}</p>
                    <p className="text-sm mt-1"><span className="text-gray-500">申请理由：</span>{item.reason}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">通过</button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700">拒绝</button>
                    <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">查看详情</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">类型</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">申请人</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">目标对象</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">审批结果</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">审批人</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">时间</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{item.type}</td>
                    <td className="px-4 py-3 text-sm">{item.user}</td>
                    <td className="px-4 py-3 text-sm">{item.target}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full ${resultClass[item.result]}`}>{resultText[item.result]}</span></td>
                    <td className="px-4 py-3 text-sm">{item.approver}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

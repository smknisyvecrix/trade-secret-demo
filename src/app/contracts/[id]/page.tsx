'use client';

import { useState } from 'react';

export default function ContractDetailPage() {
  const [activeTab, setActiveTab] = useState('info');

  const contract = {
    id: 'CT-2026-001',
    name: '商业秘密保护协议',
    type: 'NDA',
    typeText: '保密协议',
    party: 'ABC科技有限公司',
    status: 'active',
    signed: '2026-05-15',
    expired: '2027-05-15',
    description: '本协议旨在保护双方合作过程中涉及的商业秘密信息，包括但不限于技术资料、客户信息、财务数据等。',
    contactPerson: '张经理',
    contactPhone: '138****1234',
    contactEmail: 'zhang@abc.com',
  };

  const relatedSecrets = [
    { id: 'SEC-001', name: '客户名单 Q1', level: 'CORE', levelText: '核心' },
    { id: 'SEC-002', name: '技术方案 v2', level: 'CORE', levelText: '核心' },
    { id: 'SEC-005', name: '供应商报价单', level: 'IMPORTANT', levelText: '重要' },
  ];

  const accessLogs = [
    { user: '张律师', action: '查看合同', time: '2026-05-19 10:30' },
    { user: '李助理', action: '下载合同', time: '2026-05-18 14:20' },
    { user: '王经理', action: '修改合同', time: '2026-05-15 09:00' },
  ];

  const timeline = [
    { date: '2026-05-15', event: '合同签署', desc: '双方正式签署保密协议' },
    { date: '2026-05-16', event: '关联秘密', desc: '关联 3 项商业秘密' },
    { date: '2026-05-17', event: '首次访问', desc: '张律师查看合同内容' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{contract.name}</h1>
            <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">生效中</span>
          </div>
          <p className="mt-1 text-sm text-gray-500">合同编号：{contract.id}</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">编辑</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">下载合同</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button onClick={() => setActiveTab('info')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'info' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              合同信息
            </button>
            <button onClick={() => setActiveTab('secrets')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'secrets' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              关联秘密
            </button>
            <button onClick={() => setActiveTab('timeline')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'timeline' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              时间线
            </button>
            <button onClick={() => setActiveTab('logs')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'logs' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              访问日志
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'info' && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">基本信息</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">合同类型</span>
                    <span className="text-sm font-medium text-gray-900">{contract.typeText}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">合作方</span>
                    <span className="text-sm font-medium text-gray-900">{contract.party}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">签署日期</span>
                    <span className="text-sm font-medium text-gray-900">{contract.signed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">到期日期</span>
                    <span className="text-sm font-medium text-gray-900">{contract.expired}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">联系信息</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">联系人</span>
                    <span className="text-sm font-medium text-gray-900">{contract.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">电话</span>
                    <span className="text-sm font-medium text-gray-900">{contract.contactPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">邮箱</span>
                    <span className="text-sm font-medium text-gray-900">{contract.contactEmail}</span>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-gray-500 mb-2">合同说明</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{contract.description}</p>
              </div>
            </div>
          )}

          {activeTab === 'secrets' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">编号</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">秘密名称</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">级别</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relatedSecrets.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-mono text-gray-600">{item.id}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${item.level === 'CORE' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {item.levelText}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-blue-600 hover:text-blue-800">查看</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">+ 添加关联秘密</button>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-600" />
                    {index < timeline.length - 1 && <div className="w-0.5 h-16 bg-gray-200" />}
                  </div>
                  <div className="pb-6">
                    <p className="text-sm font-medium text-gray-900">{item.event}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-3">
              {accessLogs.map((log, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{log.user}</p>
                    <p className="text-xs text-gray-500">{log.action}</p>
                  </div>
                  <span className="text-xs text-gray-400">{log.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

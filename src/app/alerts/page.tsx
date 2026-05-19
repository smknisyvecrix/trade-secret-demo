'use client';

import { useState } from 'react';

export default function AlertsPage() {
  const [filterLevel, setFilterLevel] = useState('');

  const alerts = [
    { id: 1, level: 'high', title: '异常下载行为', desc: '用户李四在 1 小时内下载了 5 个核心机密文件', time: '10 分钟前', status: 'pending' },
    { id: 2, level: 'medium', title: '异地登录警告', desc: '用户张三从新 IP 地址（192.168.10.55）登录系统', time: '30 分钟前', status: 'processing' },
    { id: 3, level: 'low', title: '权限即将过期', desc: '用户王五的访问权限将在 3 天后过期', time: '2 小时前', status: 'pending' },
    { id: 4, level: 'high', title: '批量导出检测', desc: '检测到用户赵六尝试批量导出客户数据（已拦截）', time: '1 小时前', status: 'resolved' },
    { id: 5, level: 'medium', title: '非工作时间访问', desc: '用户钱七在凌晨 2:30 访问了敏感文件', time: '3 小时前', status: 'pending' },
  ];

  const levelConfig: any = {
    high: { bg: 'bg-red-50', border: 'border-red-200', icon: '🔴', text: 'text-red-700', label: '高危' },
    medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: '🟡', text: 'text-yellow-700', label: '中危' },
    low: { bg: 'bg-blue-50', border: 'border-blue-200', icon: '🔵', text: 'text-blue-700', label: '低危' },
  };

  const statusClass: any = { pending: 'bg-yellow-100 text-yellow-700', processing: 'bg-blue-100 text-blue-700', resolved: 'bg-green-100 text-green-700' };
  const statusText: any = { pending: '待处理', processing: '处理中', resolved: '已解决' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">风险预警</h1>
          <p className="text-sm text-gray-500 mt-1">实时监控异常行为与安全威胁</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">标记全部已读</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
          <p className="text-2xl font-bold text-red-700">2</p>
          <p className="text-sm text-red-600">高危预警</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
          <p className="text-2xl font-bold text-yellow-700">2</p>
          <p className="text-sm text-yellow-600">中危预警</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
          <p className="text-2xl font-bold text-blue-700">1</p>
          <p className="text-sm text-blue-600">低危预警</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          <option value="">全部等级</option>
          <option value="high">高危</option>
          <option value="medium">中危</option>
          <option value="low">低危</option>
        </select>
      </div>

      <div className="space-y-4">
        {alerts.filter(a => !filterLevel || a.level === filterLevel).map((alert) => {
          const config = levelConfig[alert.level];
          return (
            <div key={alert.id} className={`${config.bg} ${config.border} border rounded-xl p-5 hover:shadow-md transition-all`}>
              <div className="flex items-start gap-4">
                <span className="text-2xl">{config.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`font-semibold ${config.text}`}>{alert.title}</h3>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>{config.label}</span>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusClass[alert.status]}`}>{statusText[alert.status]}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{alert.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{alert.time}</span>
                    <div className="flex gap-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800">查看详情</button>
                      <button className="text-sm text-gray-600 hover:text-gray-800">标记已处理</button>
                      {alert.level === 'high' && <button className="text-sm text-red-600 hover:text-red-800">紧急处理</button>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

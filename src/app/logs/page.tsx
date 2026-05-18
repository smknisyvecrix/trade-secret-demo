'use client';

import { useState } from 'react';

export default function LogsPage() {
  const [filterType, setFilterType] = useState('');
  const [filterUser, setFilterUser] = useState('');

  const logs = [
    { id: 1, action: '新增秘密', actionType: 'create', user: '张三', target: '客户名单 Q1', ip: '192.168.1.100', time: '2026-05-19 14:30', device: 'Chrome / Windows' },
    { id: 2, action: '完成认证', actionType: 'certify', user: '系统', target: '技术方案 V2', ip: '-', time: '2026-05-19 12:15', device: 'System' },
    { id: 3, action: '导入规则', actionType: 'import', user: '管理员', target: '技术信息保护规则', ip: '192.168.1.1', time: '2026-05-19 10:00', device: 'Chrome / Windows' },
    { id: 4, action: '下载文件', actionType: 'download', user: '李四', target: '财务报表 2025', ip: '192.168.1.101', time: '2026-05-18 16:45', device: 'Safari / Mac' },
    { id: 5, action: '修改权限', actionType: 'permission', user: '管理员', target: '客户名单 Q1', ip: '192.168.1.1', time: '2026-05-18 14:20', device: 'Chrome / Windows' },
    { id: 6, action: '查看秘密', actionType: 'view', user: '王五', target: '产品路线图', ip: '192.168.1.102', time: '2026-05-18 11:30', device: 'Firefox / Linux' },
    { id: 7, action: '删除秘密', actionType: 'delete', user: '管理员', target: '过期文档', ip: '192.168.1.1', time: '2026-05-17 09:00', device: 'Chrome / Windows' },
  ];

  const typeClass: any = { create: 'bg-blue-100 text-blue-700', certify: 'bg-green-100 text-green-700', import: 'bg-purple-100 text-purple-700', download: 'bg-orange-100 text-orange-700', permission: 'bg-yellow-100 text-yellow-700', view: 'bg-gray-100 text-gray-700', delete: 'bg-red-100 text-red-700' };
  const typeLabel: any = { create: '新增', certify: '认证', import: '导入', download: '下载', permission: '权限', view: '查看', delete: '删除' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">操作日志</h1>
          <p className="text-sm text-gray-500 mt-1">审计追踪所有系统操作行为</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">📥 导出日志</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">🔍 筛选</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-blue-600">156</p>
          <p className="text-sm text-gray-500">今日操作</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-green-600">89</p>
          <p className="text-sm text-gray-500">认证成功</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-purple-600">45</p>
          <p className="text-sm text-gray-500">新增秘密</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-orange-600">22</p>
          <p className="text-sm text-gray-500">导出记录</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex gap-4 items-center">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">全部类型</option>
            <option value="create">新增</option>
            <option value="certify">认证</option>
            <option value="download">下载</option>
            <option value="permission">权限</option>
            <option value="delete">删除</option>
          </select>
          <select value={filterUser} onChange={(e) => setFilterUser(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">全部用户</option>
            <option value="admin">管理员</option>
            <option value="zhangsan">张三</option>
            <option value="lisi">李四</option>
          </select>
          <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          <span className="text-gray-400">至</span>
          <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作类型</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作人</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">目标对象</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP 地址</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">设备</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeClass[log.actionType]}`}>{typeLabel[log.actionType]}</span></td>
                <td className="px-6 py-4 text-sm text-gray-900">{log.user}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.target}</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">{log.ip}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{log.device}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

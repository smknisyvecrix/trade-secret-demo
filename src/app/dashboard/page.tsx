'use client';

import { useState } from 'react';

export default function DashboardPage() {
  const [period, setPeriod] = useState('month');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">数据看板</h1>
          <p className="text-sm text-gray-500 mt-1">可视化统计分析系统运营数据</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setPeriod('week')} className={`px-4 py-2 rounded-lg text-sm ${period === 'week' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'}`}>本周</button>
          <button onClick={() => setPeriod('month')} className={`px-4 py-2 rounded-lg text-sm ${period === 'month' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'}`}>本月</button>
          <button onClick={() => setPeriod('quarter')} className={`px-4 py-2 rounded-lg text-sm ${period === 'quarter' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'}`}>本季度</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">总秘密数</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">1,234</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% 较上期</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">认证成功率</p>
          <p className="text-3xl font-bold text-green-600 mt-1">98.5%</p>
          <p className="text-xs text-green-600 mt-2">↑ 2.1% 较上期</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">活跃用户</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">156</p>
          <p className="text-xs text-red-600 mt-2">↓ 3% 较上期</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">风险事件</p>
          <p className="text-3xl font-bold text-orange-600 mt-1">5</p>
          <p className="text-xs text-green-600 mt-2">↓ 40% 较上期</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">秘密分类分布</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1"><span>技术信息</span><span className="text-gray-500">60%</span></div>
              <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-blue-600 h-3 rounded-full" style={{ width: '60%' }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span>经营信息</span><span className="text-gray-500">25%</span></div>
              <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-purple-600 h-3 rounded-full" style={{ width: '25%' }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span>管理信息</span><span className="text-gray-500">15%</span></div>
              <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-green-600 h-3 rounded-full" style={{ width: '15%' }}></div></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">认证趋势</h3>
          <div className="flex items-end justify-between h-40 gap-2">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all hover:from-blue-700 hover:to-blue-500" style={{ height: `${h}%` }}></div>
                <span className="text-xs text-gray-400 mt-2">{i + 1}月</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">级别分布</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span className="text-sm">核心机密</span></div>
              <span className="font-medium">30%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full"></div><span className="text-sm">重要机密</span></div>
              <span className="font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div><span className="text-sm">一般机密</span></div>
              <span className="font-medium">25%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 col-span-2">
          <h3 className="font-semibold text-gray-900 mb-4">TOP 5 热门秘密</h3>
          <div className="space-y-3">
            {[
              { name: '客户名单 Q1', views: 234, trend: 'up' },
              { name: '技术方案 V2', views: 189, trend: 'up' },
              { name: '财务报表 2025', views: 167, trend: 'down' },
              { name: '产品路线图', views: 145, trend: 'up' },
              { name: '市场分析报告', views: 132, trend: 'stable' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{item.views} 次访问</span>
                  <span className={`text-xs ${item.trend === 'up' ? 'text-green-600' : item.trend === 'down' ? 'text-red-600' : 'text-gray-400'}`}>
                    {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

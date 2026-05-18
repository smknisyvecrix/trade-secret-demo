'use client';

import { useState } from 'react';

function StatCard({ icon, label, value, color, trend }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-all cursor-pointer group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className={`text-xs mt-2 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% 较上月
          </p>
        </div>
        <span className="text-3xl group-hover:scale-110 transition-transform">{icon}</span>
      </div>
    </div>
  );
}

function TodoItem({ text, urgent, time }: any) {
  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${urgent ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'} hover:shadow-sm transition-all`}>
      <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600" />
      <div className="flex-1">
        <p className={`text-sm ${urgent ? 'text-red-700 font-medium' : 'text-gray-700'}`}>{text}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
      {urgent && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">紧急</span>}
    </div>
  );
}

function ActivityItem({ icon, text, time, color }: any) {
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <span className={`w-2 h-2 rounded-full mt-2 ${color}`}></span>
      <div className="flex-1">
        <p className="text-sm text-gray-700">{text}</p>
        <p className="text-xs text-gray-400 mt-0.5">{time}</p>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, desc, href, color }: any) {
  return (
    <a href={href} className={`block p-4 rounded-xl ${color} hover:shadow-md transition-all group`}>
      <span className="text-2xl group-hover:scale-110 transition-transform inline-block">{icon}</span>
      <p className="font-medium text-sm mt-2">{label}</p>
      <p className="text-xs opacity-70 mt-0.5">{desc}</p>
    </a>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-1">欢迎回来，管理员</h1>
          <p className="text-blue-100 text-sm">今天是 2026 年 5 月 19 日，系统运行正常</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard icon="📁" label="商业秘密总数" value="1,234" color="blue" trend={12} />
        <StatCard icon="🔒" label="已认证数量" value="987" color="green" trend={8} />
        <StatCard icon="" label="活跃用户数" value="156" color="purple" trend={-3} />
        <StatCard icon="⚠️" label="待处理事项" value="5" color="orange" trend={25} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-4">快捷入口</h2>
          <div className="grid grid-cols-4 gap-3">
            <QuickAction icon="➕" label="新增秘密" desc="记录新的商业秘密" href="/secrets/new" color="bg-blue-50 text-blue-700" />
            <QuickAction icon="📥" label="导入规则" desc="批量导入保护规则" href="/rules/import" color="bg-purple-50 text-purple-700" />
            <QuickAction icon="🔒" label="查看认证" desc="管理认证记录" href="/certifications" color="bg-green-50 text-green-700" />
            <QuickAction icon="📊" label="数据看板" desc="可视化统计分析" href="/dashboard" color="bg-orange-50 text-orange-700" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-4">待办事项</h2>
          <div className="space-y-2">
            <TodoItem text="审核新导入的保护规则" urgent={true} time="10 分钟前" />
            <TodoItem text="处理 3 个认证申请" urgent={false} time="1 小时前" />
            <TodoItem text="更新核心机密分类标准" urgent={true} time="2 小时前" />
            <TodoItem text="备份本月认证数据" urgent={false} time="昨天" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-4">近 7 天认证趋势</h2>
          <div className="flex items-end justify-between h-32 gap-2">
            {[3, 5, 2, 8, 6, 9, 4].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <span className="text-xs text-gray-500 mb-1">{h}</span>
                <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all hover:from-blue-700 hover:to-blue-500" style={{ height: `${h * 12}px` }}></div>
                <span className="text-xs text-gray-400 mt-2">{['一', '二', '三', '四', '五', '六', '日'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-4">最近活动</h2>
          <div className="space-y-1">
            <ActivityItem icon="🔵" text="用户 张三 新增了秘密「客户名单 Q1」" time="2 小时前" color="bg-blue-500" />
            <ActivityItem icon="🟢" text="秘密「技术方案 V2」完成时间戳认证" time="5 小时前" color="bg-green-500" />
            <ActivityItem icon="🟣" text="管理员导入了新的保护规则" time="1 天前" color="bg-purple-500" />
            <ActivityItem icon="🟠" text="用户 李四 下载了「财务报表」" time="1 天前" color="bg-orange-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${color}`}>
          +12%
        </span>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function TodoItem({ text, urgent }: any) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg ${urgent ? 'bg-red-50 border border-red-100' : 'bg-gray-50'}`}>
      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
      <span className={`text-sm ${urgent ? 'text-red-700 font-medium' : 'text-gray-700'}`}>{text}</span>
      {urgent && <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">紧急</span>}
    </div>
  );
}

function TrendChart() {
  const data = [3, 5, 2, 8, 6, 9, 4];
  const max = Math.max(...data);
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">近 7 天认证趋势</h3>
      <div className="flex items-end justify-between h-40 gap-2">
        {data.map((value, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">{value}</span>
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition-all hover:from-blue-600 hover:to-blue-500"
                style={{ height: `${(value / max) * 100}px` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function HomePage() {
  const [{ count: secretCount }, { count: certCount }] = await Promise.all([
    supabase.from('trade_secrets').select('*', { count: 'exact', head: true }),
    supabase.from('timestamp_certifications').select('*', { count: 'exact', head: true }),
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">👋 欢迎回来，管理员</h1>
        <p className="text-blue-100">这里是您的商业秘密保护系统概览</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="📁" label="商业秘密总数" value={secretCount || 0} color="bg-blue-100 text-blue-700" />
        <StatCard icon="🔒" label="已认证数量" value={certCount || 0} color="bg-green-100 text-green-700" />
        <StatCard icon="📋" label="规则总数" value={3} color="bg-purple-100 text-purple-700" />
        <StatCard icon="⚠️" label="待处理事项" value={5} color="bg-orange-100 text-orange-700" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">快捷入口</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href="/secrets/new" className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <span className="text-2xl">➕</span>
              <span className="font-medium text-blue-700">新增秘密</span>
            </a>
            <a href="/rules/import" className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <span className="text-2xl">📥</span>
              <span className="font-medium text-purple-700">导入规则</span>
            </a>
            <a href="/certifications" className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <span className="text-2xl"></span>
              <span className="font-medium text-green-700">查看认证</span>
            </a>
            <a href="/logs" className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <span className="text-2xl">📊</span>
              <span className="font-medium text-orange-700">操作日志</span>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">待办事项</h2>
          <div className="space-y-3">
            <TodoItem text="审核新导入的保护规则" urgent={true} />
            <TodoItem text="更新核心机密分类标准" urgent={true} />
            <TodoItem text="处理 3 个认证申请" urgent={false} />
            <TodoItem text="备份本月认证数据" urgent={false} />
          </div>
        </div>
      </div>

      <TrendChart />

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">最近活动</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span className="text-gray-600">用户 张三 新增了秘密「客户名单 Q1」</span>
            <span className="ml-auto text-gray-400">2 小时前</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-gray-600">秘密「技术方案 V2」完成时间戳认证</span>
            <span className="ml-auto text-gray-400">5 小时前</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span className="text-gray-600">管理员导入了新的保护规则</span>
            <span className="ml-auto text-gray-400">1 天前</span>
          </div>
        </div>
      </div>
    </div>
  );
}

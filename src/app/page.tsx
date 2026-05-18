import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { count: secretsCount } = await supabase.from('trade_secrets').select('*', { count: 'exact', head: true });
  const { count: certsCount } = await supabase.from('timestamp_certifications').select('*', { count: 'exact', head: true });
  const { count: rulesCount } = await supabase.from('certification_rules').select('*', { count: 'exact', head: true });
  const { data: recentActivities } = await supabase.from('timestamp_certifications').select(`created_at, trade_secrets (name)`).order('created_at', { ascending: false }).limit(5);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">欢迎回来，管理员</h1>
        <p className="text-blue-100">今天是 {new Date().toLocaleDateString('zh-CN')}，系统运行正常，所有商业秘密均受时间戳保护。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="商业秘密总数" value={secretsCount || 0} icon="📁" color="blue" />
        <StatCard title="已认证数量" value={certsCount || 0} icon="✅" color="green" />
        <StatCard title="生效规则数" value={rulesCount || 0} icon="📋" color="purple" />
        <StatCard title="待审批" value="0" icon="⏳" color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">快捷功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <QuickLink href="/rules" icon="📋" title="规则管理" desc="导入和管理认证规则" />
            <QuickLink href="/secrets" icon="🔐" title="商业秘密库" desc="查看和管理商业秘密" />
            <QuickLink href="/certifications" icon="✅" title="认证中心" desc="查看认证记录和证书" />
          </div>
        </div>

        {/* 待办事项 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">待办事项</h2>
          <div className="space-y-3">
            <TodoItem text="审核新导入的规则" urgent />
            <TodoItem text="处理 2 个下载申请" />
            <TodoItem text="更新客户名单密级" />
            <TodoItem text="月度合规报告" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">最近活动</h2>
        <div className="space-y-4">
          {recentActivities && recentActivities.length > 0 ? recentActivities.map((a: any, i: number) => (
            <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0"></div>
              <div>
                <p className="text-sm text-gray-800 font-medium">{a.trade_secrets?.name || '未知商业秘密'}</p>
                <p className="text-xs text-gray-400">完成时间戳认证 · {new Date(a.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          )) : <p className="text-gray-400 text-sm">暂无活动</p>}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  const colors: any = { blue: 'bg-blue-50 text-blue-600', green: 'bg-green-50 text-green-600', purple: 'bg-purple-50 text-purple-600', orange: 'bg-orange-50 text-orange-600' };
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div><p className="text-sm text-gray-500 font-medium">{title}</p><h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3></div>
        <div className={`p-3 rounded-lg text-xl ${colors[color]}`}>{icon}</div>
      </div>
    </div>
  );
}

function QuickLink({ href, icon, title, desc }: any) {
  return (
    <Link href={href} className="group flex items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-transparent transition">
      <span className="text-2xl mr-3 group-hover:scale-110 transition">{icon}</span>
      <div><div className="font-bold text-gray-800">{title}</div><div className="text-xs text-gray-500">{desc}</div></div>
    </Link>
  );
}

function TodoItem({ text, urgent }: any) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${urgent ? 'bg-red-50 border border-red-100' : 'bg-gray-50 hover:bg-gray-100'}`}>
      <div className={`w-4 h-4 rounded border-2 ${urgent ? 'border-red-500' : 'border-gray-400'}`}></div>
      <span className={`text-sm ${urgent ? 'text-red-700 font-medium' : 'text-gray-700'}`}>{text}</span>
      {urgent && <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">紧急</span>}
    </div>
  );
}

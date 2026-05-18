import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { count: secretsCount } = await supabase.from('trade_secrets').select('*', { count: 'exact', head: true });
  const { count: certsCount } = await supabase.from('timestamp_certifications').select('*', { count: 'exact', head: true });
  const { count: rulesCount } = await supabase.from('certification_rules').select('*', { count: 'exact', head: true });
  
  // 获取最近 5 条认证记录作为活动
  const { data: recentActivities } = await supabase
    .from('timestamp_certifications')
    .select(`
      created_at,
      trade_secrets (name)
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="space-y-6">
      {/* 顶部欢迎区 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">欢迎回来，管理员</h1>
        <p className="text-blue-100">今天是 2026 年 5 月 18 日，系统运行正常，所有商业秘密均受时间戳保护。</p>
      </div>

      {/* 核心指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">商业秘密总数</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{secretsCount || 0}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600 text-xl">📁</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">已认证数量</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{certsCount || 0}</h3>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-green-600 text-xl">✅</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">生效规则数</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{rulesCount || 0}</h3>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600 text-xl">📋</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">待审批</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">0</h3>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg text-orange-600 text-xl">⏳</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 快捷入口 */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">快捷功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/rules" className="group flex items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-transparent transition">
              <span className="text-2xl mr-3 group-hover:scale-110 transition">📋</span>
              <div>
                <div className="font-bold text-gray-800">规则管理</div>
                <div className="text-xs text-gray-500">导入和管理认证规则</div>
              </div>
            </Link>
            <Link href="/secrets" className="group flex items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-transparent transition">
              <span className="text-2xl mr-3 group-hover:scale-110 transition">🔐</span>
              <div>
                <div className="font-bold text-gray-800">商业秘密库</div>
                <div className="text-xs text-gray-500">查看和管理商业秘密</div>
              </div>
            </Link>
            <Link href="/certifications" className="group flex items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-transparent transition">
              <span className="text-2xl mr-3 group-hover:scale-110 transition">✅</span>
              <div>
                <div className="font-bold text-gray-800">认证中心</div>
                <div className="text-xs text-gray-500">查看认证记录和证书</div>
              </div>
            </Link>
          </div>
        </div>

        {/* 最近活动 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">最近活动</h2>
          <div className="space-y-4">
            {recentActivities && recentActivities.length > 0 ? (
              recentActivities.map((activity: any, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0"></div>
                  <div>
                    <p className="text-sm text-gray-800 font-medium">
                      {activity.trade_secrets?.name || '未知商业秘密'}
                    </p>
                    <p className="text-xs text-gray-400">
                      完成时间戳认证 · {new Date(activity.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">暂无活动记录</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

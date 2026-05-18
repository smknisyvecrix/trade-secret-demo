import { supabase } from '@/lib/supabase';
import Link from 'next/link';

// Next.js Server Component，可以直接读取数据库
export default async function Home() {
  // 1. 获取商业秘密总数
  const { count: secretsCount } = await supabase
    .from('trade_secrets')
    .select('*', { count: 'exact', head: true });

  // 2. 获取已认证数量
  const { count: certsCount } = await supabase
    .from('timestamp_certifications')
    .select('*', { count: 'exact', head: true });

  // 3. 获取生效规则数
  const { count: rulesCount } = await supabase
    .from('certification_rules')
    .select('*', { count: 'exact', head: true });

  return (
    <div>
      {/* 顶部标题栏 */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">仪表盘</h1>
        <div className="text-sm text-gray-500">数据更新时间：{new Date().toLocaleDateString()}</div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-sm text-gray-600">商业秘密总数</div>
          <div className="text-3xl font-bold mt-2 text-blue-600">{secretsCount || 0}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-sm text-gray-600">已认证数量</div>
          <div className="text-3xl font-bold mt-2 text-green-600">{certsCount || 0}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-sm text-gray-600">生效规则数</div>
          <div className="text-3xl font-bold mt-2 text-purple-600">{rulesCount || 0}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-sm text-gray-600">待审批</div>
          <div className="text-3xl font-bold mt-2 text-orange-600">0</div>
        </div>
      </div>

      {/* 快捷入口 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/rules" className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition block group">
          <div className="font-bold text-lg group-hover:text-blue-600">规则管理</div>
          <div className="text-gray-600 text-sm">导入和管理认证规则</div>
        </Link>
        <Link href="/secrets" className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition block group">
          <div className="font-bold text-lg group-hover:text-green-600">商业秘密库</div>
          <div className="text-gray-600 text-sm">查看和管理商业秘密</div>
        </Link>
        <Link href="/certifications" className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition block group">
          <div className="font-bold text-lg group-hover:text-purple-600">认证中心</div>
          <div className="text-gray-600 text-sm">查看认证记录和证书</div>
        </Link>
      </div>
    </div>
  );
}

import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function SecretsPage() {
  const { data: secrets } = await supabase
    .from('trade_secrets')
    .select(`
      *,
      secret_categories (name),
      secret_levels (name, code)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">商业秘密库</h2>
        <Link href="/secrets/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2">
          <span>+</span> 新增秘密
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">编号</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">名称</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">分类</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">级别</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {secrets && secrets.length > 0 ? (
              secrets.map((secret: any) => (
                <tr key={secret.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{secret.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{secret.name}</div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{secret.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {secret.secret_categories?.name || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      secret.secret_levels?.code === 'CORE' ? 'bg-red-100 text-red-800' :
                      secret.secret_levels?.code === 'IMPORTANT' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {secret.secret_levels?.name || '未定级'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-sm text-green-600">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      已认证
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link href={`/secrets/${secret.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                      查看详情
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  <div className="text-4xl mb-2">📂</div>
                  暂无数据，请点击右上角新增
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

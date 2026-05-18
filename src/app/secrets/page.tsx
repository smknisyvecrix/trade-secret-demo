import { supabase } from '@/lib/supabase';
import Link from 'next/link';

// 强制每次访问都重新查询数据库
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">商业秘密库</h2>
        <Link href="/secrets/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + 新增秘密
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-600">编号</th>
              <th className="p-4 font-medium text-gray-600">名称</th>
              <th className="p-4 font-medium text-gray-600">分类</th>
              <th className="p-4 font-medium text-gray-600">级别</th>
              <th className="p-4 font-medium text-gray-600">状态</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {secrets && secrets.length > 0 ? (
              secrets.map((secret: any) => (
                <tr key={secret.id} className="hover:bg-gray-50">
                  <td className="p-4 text-gray-500 font-mono text-sm">{secret.code}</td>
                  <td className="p-4 font-medium">{secret.name}</td>
                  <td className="p-4">{secret.secret_categories?.name || '-'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      secret.secret_levels?.code === 'CORE' ? 'bg-red-100 text-red-800' :
                      secret.secret_levels?.code === 'IMPORTANT' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {secret.secret_levels?.name || '-'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-green-600 text-sm">● 有效</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  暂无商业秘密记录，点击右上角"新增秘密"添加
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

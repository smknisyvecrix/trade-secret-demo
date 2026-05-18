import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function RulesPage() {
  const { data: rules } = await supabase
    .from('certification_rules')
    .select(`
      *,
      secret_categories (name),
      secret_levels (name, code)
    `)
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">规则管理</h2>
        <Link href="/rules/import" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + 导入规则
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-600">规则名称</th>
              <th className="p-4 font-medium text-gray-600">适用分类</th>
              <th className="p-4 font-medium text-gray-600">密级</th>
              <th className="p-4 font-medium text-gray-600">认证方式</th>
              <th className="p-4 font-medium text-gray-600">状态</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rules && rules.length > 0 ? (
              rules.map((rule: any) => (
                <tr key={rule.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">{rule.name}</td>
                  <td className="p-4">{rule.secret_categories?.name || '-'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      rule.secret_levels?.code === 'CORE' ? 'bg-red-100 text-red-800' :
                      rule.secret_levels?.code === 'IMPORTANT' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {rule.secret_levels?.name || '-'}
                    </span>
                  </td>
                  <td className="p-4">{rule.certification_mode === 'auto' ? '自动认证' : '人工审批'}</td>
                  <td className="p-4">
                    <span className="text-green-600 text-sm font-medium">● 启用</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  暂无规则，请点击右上角"导入规则"添加
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

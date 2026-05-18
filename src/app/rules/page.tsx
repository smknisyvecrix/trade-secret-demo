import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">规则管理</h2>
        <Link href="/rules/import" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2">
          <span>+</span> 导入规则
        </Link>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm text-gray-500">生效规则数</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">{rules?.length || 0}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm text-gray-500">覆盖分类</div>
          <div className="text-3xl font-bold text-green-600 mt-2">
            {new Set(rules?.map((r: any) => r.secret_categories?.name).filter(Boolean)).size}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm text-gray-500">自动认证规则</div>
          <div className="text-3xl font-bold text-purple-600 mt-2">
            {rules?.filter((r: any) => r.certification_mode === 'auto').length || 0}
          </div>
        </div>
      </div>

      {/* 规则列表 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-bold text-lg">规则列表</h3>
        </div>
        
        {rules && rules.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {rules.map((rule: any) => (
              <div key={rule.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0 ${
                      rule.secret_levels?.code === 'CORE' ? 'bg-red-100' :
                      rule.secret_levels?.code === 'IMPORTANT' ? 'bg-orange-100' : 'bg-blue-100'
                    }`}>
                      📋
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{rule.name}</h4>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                          分类：{rule.secret_categories?.name || '未分类'}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          rule.secret_levels?.code === 'CORE' ? 'bg-red-100 text-red-800' :
                          rule.secret_levels?.code === 'IMPORTANT' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {rule.secret_levels?.name || '未定级'}
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                          {rule.certification_mode === 'auto' ? '自动认证' : '审批认证'}
                        </span>
                      </div>
                      {rule.description && (
                        <p className="text-sm text-gray-400 mt-2">{rule.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                      ● 启用
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-lg font-medium">暂无规则</p>
            <p className="text-sm mt-2">请点击右上角"导入规则"添加律师制定的保护规则</p>
          </div>
        )}
      </div>
    </div>
  );
}

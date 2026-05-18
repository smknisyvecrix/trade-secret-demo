import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function SecretDetailPage({ params }: { params: { id: string } }) {
  // 获取秘密详情
  const { data: secret } = await supabase
    .from('trade_secrets')
    .select(`
      *,
      secret_categories (name),
      secret_levels (name, code)
    `)
    .eq('id', params.id)
    .single();

  // 获取认证时间线
  const { data: timeline } = await supabase
    .from('timestamp_certifications')
    .select('*')
    .eq('secret_id', params.id)
    .order('created_at', { ascending: false });

  if (!secret) return <div className="p-8 text-center">未找到数据</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/secrets" className="text-gray-500 hover:text-gray-800">← 返回列表</Link>
        <h1 className="text-2xl font-bold text-gray-900">{secret.name}</h1>
        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
          secret.secret_levels?.code === 'CORE' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
        }`}>
          {secret.secret_levels?.name || '未定级'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：基本信息 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <h2 className="font-bold text-lg mb-4">基本信息</h2>
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-gray-500 block">编号</span>
                <span className="font-mono font-medium">{secret.code}</span>
              </div>
              <div>
                <span className="text-gray-500 block">分类</span>
                <span>{secret.secret_categories?.name || '-'}</span>
              </div>
              <div>
                <span className="text-gray-500 block">保管人</span>
                <span>管理员</span>
              </div>
              <div>
                <span className="text-gray-500 block">创建时间</span>
                <span>{new Date(secret.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">下载文件</button>
            </div>
          </div>
        </div>

        {/* 右侧：标签页内容 */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 认证时间线 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-bold text-lg mb-6">认证时间线 (全生命周期记录)</h2>
            <div className="border-l-2 border-blue-100 ml-3 space-y-8">
              {timeline && timeline.length > 0 ? timeline.map((cert: any) => (
                <div key={cert.id} className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white"></div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-gray-900">
                        {cert.cert_type === 'create' ? '📝 创建并认证' : '🔄 更新并认证'}
                      </span>
                      <span className="text-xs text-gray-500">{new Date(cert.created_at).toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>🔒 哈希值：SHA-256 (已固化)</p>
                      <p>📜 证书编号：{cert.id.slice(0, 8)}...</p>
                      <p>✅ 状态：已上链</p>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-gray-500 pl-8">暂无认证记录</p>
              )}
            </div>
          </div>

          {/* 权限管理 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">权限设置</h2>
              <button className="text-blue-600 text-sm hover:underline">+ 添加授权</button>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="p-3">用户/部门</th>
                  <th className="p-3">权限</th>
                  <th className="p-3">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3">研发部 (默认)</td>
                  <td className="p-3"><span className="bg-gray-100 px-2 py-1 rounded text-xs">查看</span></td>
                  <td className="p-3 text-gray-400">系统规则</td>
                </tr>
                <tr>
                  <td className="p-3">张三 (个人)</td>
                  <td className="p-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">查看 + 下载</span></td>
                  <td className="p-3 text-blue-600 cursor-pointer">编辑</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

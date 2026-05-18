import { supabase } from '@/lib/supabase';

export default async function CertificationsPage() {
  const { data: certs } = await supabase
    .from('timestamp_certifications')
    .select(`
      *,
      trade_secrets (name, code)
    `)
    .order('created_at', { ascending: false });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">认证中心</h2>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-600">认证时间</th>
              <th className="p-4 font-medium text-gray-600">关联秘密</th>
              <th className="p-4 font-medium text-gray-600">认证类型</th>
              <th className="p-4 font-medium text-gray-600">状态</th>
              <th className="p-4 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {certs && certs.length > 0 ? (
              certs.map((cert: any) => (
                <tr key={cert.id} className="hover:bg-gray-50">
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(cert.created_at).toLocaleString()}
                  </td>
                  <td className="p-4 font-medium">{cert.trade_secrets?.name || '未知'}</td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {cert.cert_type === 'create' ? '创建认证' : cert.cert_type === 'update' ? '更新认证' : '访问认证'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-green-600 text-sm font-medium">● 成功</span>
                  </td>
                  <td className="p-4">
                    <button className="text-blue-600 hover:underline text-sm">查看证书</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  暂无认证记录
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

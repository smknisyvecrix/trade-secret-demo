'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function SecretDetailClient({ secretId }: { secretId: string }) {
  const [activeTab, setActiveTab] = useState('info');
  const [secret, setSecret] = useState<any>(null);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [secretId]);

  async function loadData() {
    setLoading(true);
    const { data: secretData } = await supabase
      .from('trade_secrets')
      .select(`*, secret_categories(name), secret_levels(name, code)`)
      .eq('id', secretId)
      .single();
    setSecret(secretData);

    const { data: timelineData } = await supabase
      .from('timestamp_certifications')
      .select('*')
      .eq('secret_id', secretId)
      .order('created_at', { ascending: false });
    setTimeline(timelineData || []);
    setLoading(false);
  }

  if (loading) return <div className="p-12 text-center text-gray-500">加载中...</div>;
  if (!secret) return <div className="p-12 text-center text-gray-500">未找到数据</div>;

  return (
    <div className="max-w-6xl mx-auto">
      {/* 头部信息 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/secrets" className="text-gray-400 hover:text-gray-800 text-xl">←</Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{secret.name}</h1>
            <p className="text-sm text-gray-500 font-mono mt-1">{secret.code}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
            secret.secret_levels?.code === 'CORE' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
          }`}>
            {secret.secret_levels?.name || '未定级'}
          </span>
        </div>
        {secret.file_path && (
          <a href={secret.file_path} target="_blank" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md flex items-center gap-2">
            📥 下载源文件
          </a>
        )}
      </div>

      {/* 标签页导航 */}
      <div className="bg-white rounded-t-xl border-b border-gray-200 flex overflow-x-auto">
        {[
          { id: 'info', label: '基本信息' },
          { id: 'cert', label: '认证时间线' },
          { id: 'perm', label: '权限管理' },
          { id: 'logs', label: '访问日志' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-blue-600 text-blue-600 bg-blue-50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 标签页内容 */}
      <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-200 p-8 min-h-[500px]">
        
        {/* 1. 基本信息 */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">属性</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between"><span className="text-gray-500">分类</span><span className="font-medium">{secret.secret_categories?.name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">级别</span><span className="font-medium">{secret.secret_levels?.name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">状态</span><span className="text-green-600 font-medium">● 有效</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">创建时间</span><span>{new Date(secret.created_at).toLocaleString()}</span></div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">描述</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{secret.description || '无描述'}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">文件指纹</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs break-all shadow-inner">
                HASH: {secret.id.replace(/-/g, '')}...<br/>
                ALG: SHA-256<br/>
                SIZE: {secret.file_path ? '2.4 MB' : '0 KB'}
              </div>
            </div>
          </div>
        )}

        {/* 2. 认证时间线 */}
        {activeTab === 'cert' && (
          <div className="max-w-2xl mx-auto">
             {timeline.length > 0 ? (
              <div className="border-l-2 border-blue-200 ml-4 space-y-8 pl-8 relative">
                {timeline.map((cert) => (
                  <div key={cert.id} className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow"></div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-blue-900">
                          {cert.cert_type === 'create' ? '📝 初始存证' : '🔄 变更存证'}
                        </span>
                        <span className="text-xs text-blue-600 font-mono">{new Date(cert.created_at).toLocaleString()}</span>
                      </div>
                      <div className="text-sm text-blue-800 space-y-1">
                        <p>🔒 哈希值已固化</p>
                        <p>📜 证书编号：{cert.id.slice(0, 8)}</p>
                        <p>✅ 联合信任时间戳服务中心认证</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">暂无认证记录</div>
            )}
          </div>
        )}

        {/* 3. 权限管理 (模拟数据) */}
        {activeTab === 'perm' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">授权用户/部门</h3>
              <button className="text-blue-600 text-sm font-medium hover:underline">+ 添加授权</button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-sm">
                <tr><th className="p-4">对象</th><th className="p-4">类型</th><th className="p-4">权限</th><th className="p-4">操作</th></tr>
              </thead>
              <tbody className="divide-y">
                <tr><td className="p-4">研发部</td><td className="p-4 text-gray-500">部门</td><td className="p-4"><span className="bg-gray-100 px-2 py-1 rounded text-xs">查看</span></td><td className="p-4 text-gray-400">默认继承</td></tr>
                <tr><td className="p-4">张三</td><td className="p-4 text-gray-500">个人</td><td className="p-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">查看 + 下载</span></td><td className="p-4 text-blue-600 cursor-pointer">编辑</td></tr>
                <tr><td className="p-4">外部律师</td><td className="p-4 text-gray-500">外部</td><td className="p-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">查看 (限时)</span></td><td className="p-4 text-blue-600 cursor-pointer">编辑</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {/* 4. 访问日志 (模拟数据) */}
        {activeTab === 'logs' && (
          <div>
            <div className="flex gap-4 mb-6">
               <input className="border rounded-lg px-4 py-2 text-sm flex-1" placeholder="搜索用户或 IP..." />
               <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm">导出日志</button>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr><th className="p-4">时间</th><th className="p-4">用户</th><th className="p-4">动作</th><th className="p-4">IP 地址</th></tr>
              </thead>
              <tbody className="divide-y">
                <tr><td className="p-4">2026-05-18 14:30</td><td className="p-4">李四</td><td className="p-4"><span className="text-blue-600">下载</span></td><td className="p-4 text-gray-400">192.168.1.105</td></tr>
                <tr><td className="p-4">2026-05-18 10:15</td><td className="p-4">张三</td><td className="p-4"><span className="text-green-600">查看</span></td><td className="p-4 text-gray-400">192.168.1.102</td></tr>
                <tr><td className="p-4">2026-05-17 16:45</td><td className="p-4">系统</td><td className="p-4"><span className="text-purple-600">自动认证</span></td><td className="p-4 text-gray-400">127.0.0.1</td></tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

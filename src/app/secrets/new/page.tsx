'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function NewSecretPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    level_id: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 生成编号
      const code = 'TS-' + Date.now().toString().slice(-6);

      // 插入数据到 Supabase
      const { error } = await supabase
        .from('trade_secrets')
        .insert({
          code: code,
          name: formData.name,
          description: formData.description,
          category_id: formData.category_id || null,
          level_id: formData.level_id || null,
          status: 'active'
        });

      if (error) throw error;

      // 成功后跳转到列表页
      alert('新增成功！');
      router.push('/secrets');
      router.refresh();
    } catch (error) {
      alert('新增失败：' + (error as any).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">新增商业秘密</h2>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* 名称 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            商业秘密名称 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="例如：XX 产品核心源代码"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        {/* 分类 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.category_id}
            onChange={(e) => setFormData({...formData, category_id: e.target.value})}
          >
            <option value="">请选择分类</option>
            <option value="1">技术信息</option>
            <option value="2">经营信息</option>
          </select>
        </div>

        {/* 级别 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">密级</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.level_id}
            onChange={(e) => setFormData({...formData, level_id: e.target.value})}
          >
            <option value="">请选择级别</option>
            <option value="1">核心</option>
            <option value="2">重要</option>
          </select>
        </div>

        {/* 描述 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">描述</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24"
            placeholder="请描述该商业秘密的内容..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        {/* 提交按钮 */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? '提交中...' : '提交并认证'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
}

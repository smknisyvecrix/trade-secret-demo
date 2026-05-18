'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ImportRulePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category_id: '1',
    level_id: '1',
    certification_mode: 'auto',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('certification_rules')
        .insert({
          name: formData.name,
          category_id: formData.category_id,
          level_id: formData.level_id,
          certification_mode: formData.certification_mode,
          description: formData.description,
          status: 'active'
        });

      if (error) throw error;

      alert('规则导入成功！');
      router.push('/rules');
      router.refresh();
    } catch (error) {
      alert('导入失败：' + (error as any).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">导入认证规则</h2>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-800 text-sm">
          💡 <strong>提示：</strong> 此处模拟律师制定规则后的导入过程。实际生产环境中，支持 Excel 批量导入。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            规则名称 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="例如：源代码保护规则"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">适用分类</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={formData.category_id}
              onChange={(e) => setFormData({...formData, category_id: e.target.value})}
            >
              <option value="1">技术信息</option>
              <option value="2">经营信息</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">保护级别</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={formData.level_id}
              onChange={(e) => setFormData({...formData, level_id: e.target.value})}
            >
              <option value="1">核心</option>
              <option value="2">重要</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">认证方式</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.certification_mode}
            onChange={(e) => setFormData({...formData, certification_mode: e.target.value})}
          >
            <option value="auto">自动认证（无需审批）</option>
            <option value="approval">审批后认证</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">规则描述</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24"
            placeholder="描述该规则的适用范围和注意事项..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
          >
            {loading ? '导入中...' : '确认导入'}
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

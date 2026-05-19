'use client';

import { useState } from 'react';

export default function NewTagPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    color: 'bg-blue-100 text-blue-800',
    description: '',
  });

  const categories = [
    { value: 'tech', label: '技术类' },
    { value: 'business', label: '经营类' },
    { value: 'management', label: '管理类' },
  ];

  const colorOptions = [
    { value: 'bg-blue-100 text-blue-800', label: '蓝色', preview: 'bg-blue-100 text-blue-800' },
    { value: 'bg-green-100 text-green-800', label: '绿色', preview: 'bg-green-100 text-green-800' },
    { value: 'bg-red-100 text-red-800', label: '红色', preview: 'bg-red-100 text-red-800' },
    { value: 'bg-yellow-100 text-yellow-800', label: '黄色', preview: 'bg-yellow-100 text-yellow-800' },
    { value: 'bg-purple-100 text-purple-800', label: '紫色', preview: 'bg-purple-100 text-purple-800' },
    { value: 'bg-pink-100 text-pink-800', label: '粉色', preview: 'bg-pink-100 text-pink-800' },
  ];

  const handleSubmit = () => {
    alert('标签创建成功！');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">新增标签</h1>
        <p className="mt-1 text-sm text-gray-500">创建新的商业秘密标签</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="max-w-2xl space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">标签名称</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="请输入标签名称"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">所属分类</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">请选择分类</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">标签颜色</label>
            <div className="grid grid-cols-6 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  className={`p-2 rounded-lg border-2 transition-all ${formData.color === color.value ? 'border-blue-500' : 'border-gray-200'}`}
                >
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${color.preview}`}>
                    {color.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">标签说明</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="请输入标签说明（选填）"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">取消</button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">创建标签</button>
          </div>
        </div>
      </div>
    </div>
  );
}

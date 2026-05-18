'use client';

import { useState } from 'react';

export default function NewSecretPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', code: '', category: '', level: '', description: '' });

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">新增商业秘密</h1>
          <p className="text-sm text-gray-500 mt-1">填写商业秘密信息并提交认证</p>
        </div>
        <a href="/secrets" className="text-blue-600 hover:underline text-sm">返回列表</a>
      </div>

      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
            {s < 3 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`}></div>}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-500 mb-8">
        <span>填写信息</span><span>确认预览</span><span>完成</span>
      </div>

      {step === 1 && (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">秘密名称 <span className="text-red-500">*</span></label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="请输入商业秘密名称" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">秘密编号 <span className="text-red-500">*</span></label>
            <input type="text" name="code" value={formData.code} onChange={handleChange} placeholder="如：SEC-2026-001" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">请选择</option>
                <option value="tech">技术信息</option>
                <option value="business">经营信息</option>
                <option value="management">管理信息</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">级别</label>
              <select name="level" value={formData.level} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">请选择</option>
                <option value="core">核心机密</option>
                <option value="important">重要机密</option>
                <option value="general">一般机密</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="请输入商业秘密描述" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          <button onClick={() => setStep(2)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">下一步</button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="font-semibold">确认信息</h2>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">名称</span><span className="font-medium">{formData.name || '-'}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">编号</span><span className="font-medium">{formData.code || '-'}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">分类</span><span className="font-medium">{formData.category || '-'}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">级别</span><span className="font-medium">{formData.level || '-'}</span></div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setStep(1)} className="flex-1 bg-white border border-gray-300 py-2 rounded-lg">上一步</button>
            <button onClick={() => setStep(3)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">确认提交</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center space-y-4">
          <span className="text-5xl">✅</span>
          <h2 className="text-2xl font-bold">提交成功！</h2>
          <p className="text-gray-500">商业秘密「{formData.name}」已提交，等待时间戳认证</p>
          <div className="flex gap-4 justify-center pt-4">
            <a href="/secrets" className="bg-blue-600 text-white px-6 py-2 rounded-lg">返回列表</a>
            <a href={`/secrets/1`} className="bg-white border border-gray-300 px-6 py-2 rounded-lg">查看详情</a>
          </div>
        </div>
      )}
    </div>
  );
}

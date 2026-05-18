'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ImportRulePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    level: '',
    mode: 'auto',
    description: ''
  });

  const handleNext = () => {
    if (step === 1 && !formData.name) {
      alert('请输入规则名称');
      return;
    }
    setStep(step + 1);
  };

  const handleImport = async () => {
    setLoading(true);
    try {
      const { data: catData } = await supabase.from('secret_categories').select('id').eq('name', formData.category).single();
      const { data: lvlData } = await supabase.from('secret_levels').select('id').eq('name', formData.level).single();

      const { error } = await supabase.from('certification_rules').insert({
        name: formData.name,
        category_id: catData?.id || null,
        level_id: lvlData?.id || null,
        certification_mode: formData.mode,
        description: formData.description,
        status: 'active'
      });

      if (error) throw error;
      setStep(3);
    } catch (error) {
      alert('导入失败：' + (error as any).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">导入认证规则</h2>
        <p className="text-gray-500">将律师制定的商业秘密保护规则导入系统，系统将自动执行认证。</p>
      </div>

      {/* 进度条 */}
      <div className="flex items-center mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {[
          { num: 1, label: '填写信息' },
          { num: 2, label: '预览确认' },
          { num: 3, label: '导入结果' }
        ].map((item, idx) => (
          <div key={item.num} className="flex-1 flex flex-col items-center relative">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-2 text-lg transition-all ${
              step >= item.num 
                ? 'border-blue-600 bg-blue-600 text-white shadow-lg' 
                : 'border-gray-300 text-gray-400'
            }`}>
              {step > item.num ? '✓' : item.num}
            </div>
            <span className={`mt-3 text-sm font-medium ${step >= item.num ? 'text-blue-600' : 'text-gray-400'}`}>
              {item.label}
            </span>
            {idx < 2 && (
              <div className={`absolute top-6 left-[60%] w-[80%] h-1 ${step > item.num ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📄</span>
                <div>
                  <h4 className="font-bold text-amber-900 mb-1">Excel 批量导入</h4>
                  <p className="text-sm text-amber-800">为方便演示，此处采用单条录入模式。实际生产环境支持 Excel 批量导入。</p>
                  <button className="mt-3 text-amber-700 text-sm font-medium hover:underline">📥 下载 Excel 模板</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">规则名称 <span className="text-red-500">*</span></label>
                <input 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500" 
                  placeholder="例如：核心源代码保护规则" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">适用分类</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500"
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="">请选择</option>
                  <option value="技术信息">技术信息</option>
                  <option value="经营信息">经营信息</option>
                  <option value="管理信息">管理信息</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">保护级别</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500"
                  value={formData.level} 
                  onChange={e => setFormData({...formData, level: e.target.value})}
                >
                  <option value="">请选择</option>
                  <option value="核心">🔴 核心</option>
                  <option value="重要">🟡 重要</option>
                  <option value="一般">🔵 一般</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">认证方式</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500"
                  value={formData.mode} 
                  onChange={e => setFormData({...formData, mode: e.target.value})}
                >
                  <option value="auto">⚡ 自动认证</option>
                  <option value="approval">📋 审批后认证</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">规则描述</label>
                <input 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500" 
                  placeholder="简要说明规则用途" 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                />
              </div>
            </div>
            <div className="flex justify-end pt-6 border-t">
              <button onClick={handleNext} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium shadow-md hover:shadow-lg transition-all">
                下一步：预览 →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="font-bold text-lg mb-6">请确认以下规则信息</h3>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-xl border-2 border-blue-200 mb-8 space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="text-sm text-gray-500 block mb-1">规则名称</span>
                  <span className="font-bold text-gray-900 text-lg">{formData.name}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 block mb-1">适用分类</span>
                  <span className="font-medium text-gray-900">{formData.category}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 block mb-1">保护级别</span>
                  <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                    formData.level === '核心' ? 'bg-red-100 text-red-800' :
                    formData.level === '重要' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>{formData.level}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 block mb-1">认证方式</span>
                  <span className="font-medium text-gray-900">{formData.mode === 'auto' ? '⚡ 自动认证' : '📋 审批认证'}</span>
                </div>
              </div>
              {formData.description && (
                <div className="pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500 block mb-1">规则描述</span>
                  <span className="text-gray-700">{formData.description}</span>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="text-gray-600 hover:text-gray-900 font-medium px-6 py-3">
                ← 返回修改
              </button>
              <button 
                onClick={handleImport} 
                disabled={loading} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 font-bold shadow-lg"
              >
                {loading ? '导入中...' : '确认导入'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-lg animate-bounce">
              ✅
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">导入成功！</h3>
            <p className="text-gray-600 mb-2 text-lg">规则 <span className="font-bold text-blue-600">{formData.name}</span> 已生效</p>
            <p className="text-gray-500 mb-10">系统将自动对符合条件的商业秘密进行时间戳认证</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => router.push('/rules')} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium shadow-md">
                查看规则列表
              </button>
              <button 
                onClick={() => { setStep(1); setFormData({ name: '', category: '', level: '', mode: 'auto', description: '' }); }} 
                className="bg-white border-2 border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 font-medium"
              >
                继续导入
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

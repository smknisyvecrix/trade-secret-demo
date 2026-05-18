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
    mode: 'auto'
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
      // 1. 查找分类 ID
      const { data: catData } = await supabase.from('secret_categories').select('id').eq('name', formData.category).single();
      // 2. 查找级别 ID
      const { data: lvlData } = await supabase.from('secret_levels').select('id').eq('name', formData.level).single();

      // 3. 插入规则
      const { error } = await supabase.from('certification_rules').insert({
        name: formData.name,
        category_id: catData?.id || null,
        level_id: lvlData?.id || null,
        certification_mode: formData.mode,
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
      <h2 className="text-2xl font-bold mb-8">导入认证规则</h2>

      {/* 进度条 */}
      <div className="flex items-center mb-8">
        <div className={`flex-1 flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>1</div>
          <span className="mt-2 text-sm">填写信息</span>
        </div>
        <div className={`flex-1 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`flex-1 flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 2 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>2</div>
          <span className="mt-2 text-sm">预览确认</span>
        </div>
        <div className={`flex-1 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`flex-1 flex flex-col items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 3 ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300'}`}>3</div>
          <span className="mt-2 text-sm">导入结果</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {step === 1 && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
               <p className="text-gray-600 mb-4">此处模拟 Excel 导入，为方便演示，请直接填写单条规则信息：</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">规则名称</label>
                <input className="w-full border rounded-lg px-4 py-2" placeholder="例如：源代码保护规则" 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">适用分类</label>
                <select className="w-full border rounded-lg px-4 py-2"
                  value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="">请选择</option>
                  <option value="技术信息">技术信息</option>
                  <option value="经营信息">经营信息</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">保护级别</label>
                <select className="w-full border rounded-lg px-4 py-2"
                  value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})}>
                  <option value="">请选择</option>
                  <option value="核心">核心</option>
                  <option value="重要">重要</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">认证方式</label>
                <select className="w-full border rounded-lg px-4 py-2"
                  value={formData.mode} onChange={e => setFormData({...formData, mode: e.target.value})}>
                  <option value="auto">自动认证</option>
                  <option value="approval">审批认证</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button onClick={handleNext} className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700">下一步：预览</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="font-bold text-lg mb-4">确认导入以下规则？</h3>
            <div className="bg-gray-50 p-6 rounded-lg border mb-6 space-y-2">
              <p><strong>名称：</strong>{formData.name}</p>
              <p><strong>分类：</strong>{formData.category}</p>
              <p><strong>级别：</strong>{formData.level}</p>
              <p><strong>认证方式：</strong>{formData.mode === 'auto' ? '自动认证' : '审批认证'}</p>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="text-gray-600">← 返回修改</button>
              <button onClick={handleImport} disabled={loading} className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {loading ? '导入中...' : '确认导入'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">导入成功！</h3>
            <p className="text-gray-600 mb-8">规则已生效，系统将自动对符合条件的商业秘密进行认证。</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => router.push('/rules')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">查看规则列表</button>
              <button onClick={() => { setStep(1); setFormData({ name: '', category: '', level: '', mode: 'auto' }); }} className="bg-white border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50">继续导入</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

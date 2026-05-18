'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ImportRulePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // 模拟从 Excel 读取的数据
  const [previewData, setPreviewData] = useState([
    { name: '核心源代码保护规则', category: '技术信息', level: '核心', mode: '自动认证' },
    { name: '客户名单保护规则', category: '经营信息', level: '重要', mode: '审批认证' },
    { name: '财务数据保护规则', category: '管理信息', level: '核心', mode: '自动认证' }
  ]);

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleImport = async () => {
    setLoading(true);
    // 模拟导入过程
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 实际插入一条测试规则到数据库
    await supabase.from('certification_rules').insert({
      name: '导入演示规则',
      certification_mode: 'auto',
      status: 'active'
    });

    setLoading(false);
    setStep(3);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">导入认证规则</h2>

      {/* 进度条 */}
      <div className="flex items-center mb-8">
        <div className={`flex-1 flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>1</div>
          <span className="mt-2 text-sm">上传文件</span>
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
        {/* 步骤 1：上传 */}
        {step === 1 && (
          <div className="text-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:bg-gray-50 transition cursor-pointer">
              <div className="text-4xl mb-4">📁</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">拖拽 Excel 文件到此处</h3>
              <p className="text-gray-500 text-sm mb-4">支持 .xlsx 格式，不超过 10MB</p>
              <button onClick={handleNext} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                选择文件 (模拟)
              </button>
            </div>
            <div className="mt-6 text-left">
              <h4 className="font-medium mb-2">📝 模板下载</h4>
              <button className="text-blue-600 hover:underline text-sm">下载 Excel 模板.xlsx</button>
            </div>
          </div>
        )}

        {/* 步骤 2：预览 */}
        {step === 2 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">预览规则 (共 3 条)</h3>
              <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">检测到 1 条冲突</span>
            </div>
            <table className="w-full text-left border mb-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3">规则名称</th>
                  <th className="p-3">分类</th>
                  <th className="p-3">级别</th>
                  <th className="p-3">认证方式</th>
                  <th className="p-3">冲突处理</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {previewData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{item.level}</td>
                    <td className="p-3">{item.mode}</td>
                    <td className="p-3">
                      <select className="border rounded px-2 py-1 text-sm">
                        <option>覆盖旧规则</option>
                        <option>跳过</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between">
              <button onClick={handlePrev} className="text-gray-600 hover:text-gray-900">← 上一步</button>
              <button onClick={handleImport} disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {loading ? '导入中...' : '确认导入'}
              </button>
            </div>
          </div>
        )}

        {/* 步骤 3：结果 */}
        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">导入成功！</h3>
            <p className="text-gray-600 mb-8">成功导入 3 条规则，覆盖 1 条旧规则。</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => router.push('/rules')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                查看规则列表
              </button>
              <button onClick={() => { setStep(1); }} className="bg-white border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50">
                继续导入
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

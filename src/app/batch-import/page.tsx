'use client';

import { useState } from 'react';

export default function BatchImportPage() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">批量导入秘密</h1>
        <a href="/secrets" className="text-blue-600 hover:underline text-sm">返回列表</a>
      </div>

      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {s}
            </div>
            {s < 3 && (
              <div className={`w-24 h-1 mx-2 transition-all ${
                step > s ? 'bg-blue-600' : 'bg-gray-200'
              }`}></div>
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-blue-500 transition-colors cursor-pointer">
            <span className="text-4xl">📄</span>
            <p className="text-lg font-medium text-gray-700 mt-4">点击或拖拽文件到此处</p>
            <p className="text-sm text-gray-500 mt-2">支持 .xlsx, .csv 格式，最大 10MB</p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              选择文件
            </button>
          </div>
          <button
            onClick={() => setStep(2)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
          >
            下一步
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          <h2 className="text-lg font-semibold">预览导入数据</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="py-2 text-left">编号</th>
                  <th className="py-2 text-left">名称</th>
                  <th className="py-2 text-left">分类</th>
                  <th className="py-2 text-left">级别</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">SEC-001</td>
                  <td className="py-2">客户名单 Q1</td>
                  <td className="py-2">经营信息</td>
                  <td className="py-2"><span className="text-red-600">核心</span></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">SEC-002</td>
                  <td className="py-2">技术方案 V2</td>
                  <td className="py-2">技术信息</td>
                  <td className="py-2"><span className="text-orange-600">重要</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setStep(1)} className="flex-1 bg-white border border-gray-300 py-3 rounded-lg">上一步</button>
            <button onClick={() => setStep(3)} className="flex-1 bg-blue-600 text-white py-3 rounded-lg">确认导入</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center space-y-6">
          <span className="text-6xl">✅</span>
          <h2 className="text-2xl font-bold">导入成功！</h2>
          <p className="text-gray-500">共导入 2 条商业秘密记录</p>
          <a href="/secrets" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg">
            查看列表
          </a>
        </div>
      )}
    </div>
  );
}

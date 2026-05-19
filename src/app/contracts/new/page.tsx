'use client';

import { useState } from 'react';

export default function NewContractPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: 'NDA',
    party: '',
    startDate: '',
    endDate: '',
    description: '',
    secretIds: [] as string[],
  });

  const contractTypes = [
    { value: 'NDA', label: '保密协议 (NDA)' },
    { value: 'tech', label: '技术合作' },
    { value: 'employee', label: '员工保密' },
    { value: 'supplier', label: '供应商协议' },
    { value: 'other', label: '其他' },
  ];

  const availableSecrets = [
    { id: 'SEC-001', name: '客户名单 Q1' },
    { id: 'SEC-002', name: '技术方案 v2' },
    { id: 'SEC-003', name: '财务数据 2026' },
    { id: 'SEC-004', name: '供应商报价单' },
  ];

  const handleSubmit = () => {
    setStep(3);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">新增合同</h1>
        <p className="mt-1 text-sm text-gray-500">创建新的商业秘密保护合同</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-center mb-8">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className={`w-20 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
            <div className={`w-20 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              {step === 1 && '填写合同信息'}
              {step === 2 && '关联商业秘密'}
              {step === 3 && '创建成功'}
            </h3>
          </div>

          {step === 1 && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">合同名称</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="请输入合同名称"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">合同类型</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {contractTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">合作方</label>
                <input
                  type="text"
                  value={formData.party}
                  onChange={(e) => setFormData({ ...formData, party: e.target.value })}
                  placeholder="请输入合作方名称"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">到期日期</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">合同说明</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="请输入合同说明"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">取消</button>
                <button onClick={() => setStep(2)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">下一步</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-sm text-gray-600">选择需要关联的商业秘密（可多选）</p>
              
              <div className="space-y-2">
                {availableSecrets.map((secret) => (
                  <label key={secret.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.secretIds.includes(secret.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, secretIds: [...formData.secretIds, secret.id] });
                        } else {
                          setFormData({ ...formData, secretIds: formData.secretIds.filter(id => id !== secret.id) });
                        }
                      }}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{secret.name}</p>
                      <p className="text-xs text-gray-500">{secret.id}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <button onClick={() => setStep(1)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">上一步</button>
                <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">完成创建</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-2xl mx-auto text-center">
              <div className="text-6xl mb-4"></div>
              <h3 className="text-xl font-medium text-gray-900">合同创建成功</h3>
              <p className="text-gray-500 mt-2">合同编号：CT-2026-006</p>
              <p className="text-gray-500 mt-1">已关联 {formData.secretIds.length} 项商业秘密</p>
              <div className="flex justify-center gap-3 mt-6">
                <button onClick={() => setStep(1)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">继续创建</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">查看合同</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

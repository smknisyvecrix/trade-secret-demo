'use client';

import { useState } from 'react';

export default function RulesPage() {
  const [activeTab, setActiveTab] = useState('list');
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const rules = [
    { id: 'RULE-001', name: '技术信息保护规则', category: 'tech', categoryText: '技术信息', scope: '源代码、设计图纸、技术方案', status: 'active', updated: '2026-05-15', creator: '张律师' },
    { id: 'RULE-002', name: '经营信息保护规则', category: 'business', categoryText: '经营信息', scope: '客户名单、财务报表、合同', status: 'active', updated: '2026-05-10', creator: '李律师' },
    { id: 'RULE-003', name: '管理信息保护规则', category: 'management', categoryText: '管理信息', scope: '人事档案、内部制度、会议纪要', status: 'draft', updated: '2026-05-08', creator: '王律师' },
    { id: 'RULE-004', name: '研发数据保护规则', category: 'tech', categoryText: '技术信息', scope: '实验数据、测试报告、研发日志', status: 'active', updated: '2026-04-20', creator: '张律师' },
  ];

  const categoryClass: any = { tech: 'bg-blue-100 text-blue-700', business: 'bg-green-100 text-green-700', management: 'bg-purple-100 text-purple-700' };
  const statusClass: any = { active: 'bg-green-100 text-green-700', draft: 'bg-yellow-100 text-yellow-700' };
  const statusText: any = { active: '生效中', draft: '草稿' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">规则管理</h1>
          <p className="text-sm text-gray-500 mt-1">律师制定的商业秘密保护规则，驱动自动认证</p>
        </div>
        <a href="/rules/import" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <span>📥</span>
          <span>导入规则</span>
        </a>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">规则总数</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">12</p>
          <p className="text-xs text-green-600 mt-2">↑ 3 条 较上月</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">生效中</p>
          <p className="text-3xl font-bold text-green-600 mt-1">8</p>
          <p className="text-xs text-gray-500 mt-2">覆盖全部类型</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">待审核</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">3</p>
          <p className="text-xs text-yellow-600 mt-2">需尽快审核</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">合作律师</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">5</p>
          <p className="text-xs text-gray-500 mt-2">持续合作中</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6">
          <nav className="flex gap-6">
            <button onClick={() => setActiveTab('list')} className={`py-4 text-sm font-medium border-b-2 ${activeTab === 'list' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>规则列表</button>
            <button onClick={() => setActiveTab('lawyers')} className={`py-4 text-sm font-medium border-b-2 ${activeTab === 'lawyers' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>合作律师</button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'list' && (
            <>
              <div className="flex gap-4 items-center mb-4">
                <div className="flex-1 relative">
                  <input type="text" placeholder="搜索规则名称或编号..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">全部分类</option>
                  <option value="tech">技术信息</option>
                  <option value="business">经营信息</option>
                  <option value="management">管理信息</option>
                </select>
              </div>

              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">规则编号</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">规则名称</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">分类</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">保护范围</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">状态</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">制定律师</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {rules.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-blue-600">{r.id}</td>
                      <td className="px-4 py-3 text-sm font-medium">{r.name}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full ${categoryClass[r.category]}`}>{r.categoryText}</span></td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{r.scope}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full ${statusClass[r.status]}`}>{statusText[r.status]}</span></td>
                      <td className="px-4 py-3 text-sm">{r.creator}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="text-blue-600 text-sm">查看</button>
                          <button className="text-gray-600 text-sm">编辑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {activeTab === 'lawyers' && (
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: '张律师', firm: '某某律师事务所', specialty: '知识产权', rules: 5, status: 'active' },
                { name: '李律师', firm: '某某律师事务所', specialty: '商业秘密', rules: 4, status: 'active' },
                { name: '王律师', firm: '某某律师事务所', specialty: '企业合规', rules: 3, status: 'active' },
              ].map((l, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">{l.name[0]}</div>
                    <div>
                      <p className="font-medium">{l.name}</p>
                      <p className="text-xs text-gray-500">{l.firm}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">专业领域</span><span>{l.specialty}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">制定规则</span><span>{l.rules} 条</span></div>
                  </div>
                  <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg text-sm">联系律师</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

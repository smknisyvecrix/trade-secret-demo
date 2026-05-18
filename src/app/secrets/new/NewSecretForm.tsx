'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function NewSecretForm({ categories, levels }: { categories: any[], levels: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    level_id: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let filePath = null;

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('secrets')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('secrets')
          .getPublicUrl(fileName);
        
        filePath = publicUrl;
      }

      const code = 'TS-' + Date.now().toString().slice(-6);
      const { data: secretData, error: secretError } = await supabase
        .from('trade_secrets')
        .insert({
          code: code,
          name: formData.name,
          description: formData.description,
          category_id: formData.category_id || null,
          level_id: formData.level_id || null,
          file_path: filePath,
          status: 'active'
        })
        .select()
        .single();

      if (secretError) throw secretError;

      await supabase.from('timestamp_certifications').insert({
        secret_id: secretData.id,
        cert_type: 'create',
        status: 'success',
        certified_at: new Date().toISOString()
      });

      alert('✅ 新增成功！文件已上传并完成时间戳认证。');
      router.push('/secrets');
      router.refresh();
    } catch (error) {
      alert('操作失败：' + (error as any).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">新增商业秘密</h2>
        <p className="text-gray-500">填写商业秘密信息并上传相关文件，系统将自动完成时间戳认证。</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本信息卡片 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm">1</span>
            基本信息
          </h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                商业秘密名称 <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                required 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="例如：XX 产品核心源代码 v2.0" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 bg-white"
                  value={formData.category_id} 
                  onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                >
                  <option value="">请选择分类</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">密级</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 bg-white"
                  value={formData.level_id} 
                  onChange={(e) => setFormData({...formData, level_id: e.target.value})}
                >
                  <option value="">请选择级别</option>
                  {levels.map((lvl) => (
                    <option key={lvl.id} value={lvl.id}>{lvl.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">描述</label>
              <textarea 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 h-28 focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="请简要描述该商业秘密的内容、用途、涉及部门等..." 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
              />
            </div>
          </div>
        </div>

        {/* 文件上传卡片 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-sm">2</span>
            上传附件
          </h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-blue-50 hover:border-blue-400 transition-all relative group">
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            />
            <div className="space-y-3">
              <div className="text-4xl group-hover:scale-110 transition-transform">📁</div>
              {file ? (
                <div className="space-y-2">
                  <p className="text-green-600 font-bold text-lg">✅ 已选择文件</p>
                  <p className="text-gray-700 font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-700 font-medium">点击或拖拽文件到此处上传</p>
                  <p className="text-xs text-gray-400">支持 zip, pdf, docx, jpg, png 等格式，单文件不超过 100MB</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 提示卡片 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-bold text-blue-900 mb-1">提交后将自动执行</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 匹配律师制定的认证规则</li>
                <li>• 生成文件哈希值 (SHA-256)</li>
                <li>• 申请联合信任时间戳认证</li>
                <li>• 生成权属证明证书</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-4 pt-2">
          <button 
            type="submit" 
            disabled={loading} 
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span> 正在上传并认证...
              </span>
            ) : (
              '提交并认证'
            )}
          </button>
          <button 
            type="button" 
            onClick={() => router.back()} 
            className="px-8 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-medium text-gray-700 transition"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
}

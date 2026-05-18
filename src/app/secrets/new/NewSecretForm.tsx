'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function NewSecretForm({ categories, levels }: { categories: any[], levels: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
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

      // 1. 如果有文件，先上传到 Supabase Storage
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        // 上传文件
        const { error: uploadError } = await supabase.storage
          .from('secrets')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        // 获取公开访问 URL
        const { data: { publicUrl } } = supabase.storage
          .from('secrets')
          .getPublicUrl(fileName);
        
        filePath = publicUrl;
      }

      // 2. 插入数据到数据库
      const code = 'TS-' + Date.now().toString().slice(-6);
      const { data: secretData, error: secretError } = await supabase
        .from('trade_secrets')
        .insert({
          code: code,
          name: formData.name,
          description: formData.description,
          category_id: formData.category_id || null,
          level_id: formData.level_id || null,
          file_path: filePath, // 保存文件地址
          status: 'active'
        })
        .select()
        .single();

      if (secretError) throw secretError;

      // 3. 自动认证
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
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">商业秘密名称 <span className="text-red-500">*</span></label>
        <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="例如：XX 产品核心源代码" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.category_id} onChange={(e) => setFormData({...formData, category_id: e.target.value})}>
            <option value="">请选择分类</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">密级</label>
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.level_id} onChange={(e) => setFormData({...formData, level_id: e.target.value})}>
            <option value="">请选择级别</option>
            {levels.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>{lvl.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 文件上传区域 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">上传附件</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition relative">
          <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <div className="text-2xl mb-2">📁</div>
          {file ? (
            <p className="text-green-600 font-medium">已选择：{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
          ) : (
            <p className="text-gray-500">点击或拖拽文件到此处上传</p>
          )}
          <p className="text-xs text-gray-400 mt-2">支持 zip, pdf, docx, jpg 等格式</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">描述</label>
        <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24"
          placeholder="请描述内容..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
      </div>

      <div className="bg-blue-50 p-4 rounded text-sm text-blue-800">
        💡 提交后文件将被加密存储在云端，并自动生成时间戳认证记录。
      </div>

      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium">
          {loading ? '正在上传并认证...' : '提交并认证'}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">取消</button>
      </div>
    </form>
  );
}

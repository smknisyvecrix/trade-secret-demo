import { supabase } from '@/lib/supabase';
import NewSecretForm from './NewSecretForm';

// 这是一个服务端组件，可以直接查数据库
export default async function NewSecretPage() {
  // 获取真实的分类列表
  const { data: categories } = await supabase.from('secret_categories').select('id, name');
  // 获取真实的级别列表
  const { data: levels } = await supabase.from('secret_levels').select('id, name');

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">新增商业秘密</h2>
      {/* 把查到的真实数据传给表单 */}
      <NewSecretForm categories={categories || []} levels={levels || []} />
    </div>
  );
}

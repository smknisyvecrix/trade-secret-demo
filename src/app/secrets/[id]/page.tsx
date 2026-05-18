export const dynamic = 'force-dynamic';

import { createClient } from '@supabase/supabase-js';
import SecretDetailClient from './SecretDetailClient';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function SecretDetailPage({ params }: { params: { id: string } }) {
  const { data: secret } = await supabase
    .from('trade_secrets')
    .select(`
      *,
      secret_categories (name),
      secret_levels (name, code)
    `)
    .eq('id', params.id)
    .single();

  const { data: certs } = await supabase
    .from('timestamp_certifications')
    .select('*')
    .eq('secret_id', params.id)
    .order('created_at', { ascending: false });

  if (!secret) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600">未找到该商业秘密</p>
          <a href="/secrets" className="text-blue-600 hover:underline mt-4 inline-block">
            返回列表
          </a>
        </div>
      </div>
    );
  }

  return <SecretDetailClient secret={secret} certs={certs || []} />;
}

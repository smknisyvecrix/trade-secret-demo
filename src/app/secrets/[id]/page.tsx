'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

// 这是一个服务端组件，但为了用 Tab 状态，我们嵌套一个客户端组件
// 这里我们为了简单，直接做成服务端渲染 + 客户端 Tab 切换
import SecretDetailClient from './SecretDetailClient';

export default function SecretDetailPage({ params }: { params: { id: string } }) {
  return <SecretDetailClient secretId={params.id} />;
}

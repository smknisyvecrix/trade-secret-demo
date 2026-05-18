import './globals.css';
export const metadata = { title: '企业商业秘密保护系统', description: 'Demo' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN"><body className="bg-gray-50">{children}</body></html>;
}

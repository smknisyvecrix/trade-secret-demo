export const dynamic = 'force-dynamic';

export default function HelpPage() {
  const faqs = [
    { q: '如何新增商业秘密？', a: '点击左侧导航栏"商业秘密库"，然后点击右上角"+ 新增秘密"按钮，填写相关信息即可。' },
    { q: '时间戳认证是什么？', a: '时间戳认证是由联合信任时间戳服务中心提供的权威认证服务，证明文件在特定时间点的存在性和完整性。' },
    { q: '如何导出证书？', a: '在认证中心页面，找到对应的认证记录，点击"下载证书"按钮即可下载 PDF 格式的证书。' },
    { q: '如何设置用户权限？', a: '在用户管理页面，选择对应用户，点击"编辑"按钮，在权限设置中勾选相应的权限即可。' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-900">帮助中心</h1>

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2"> 需要帮助？</h2>
        <p className="text-blue-100">查看使用指南或联系我们的技术支持团队</p>
        <div className="mt-4 flex gap-4">
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50">
            查看文档
          </button>
          <button className="bg-blue-400 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-300">
            联系客服
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">常见问题</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b pb-4 last:border-0">
              <h3 className="font-medium text-gray-900 mb-2">❓ {faq.q}</h3>
              <p className="text-gray-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <a href="#" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow text-center">
          <span className="text-3xl">📖</span>
          <h3 className="font-medium mt-2">使用手册</h3>
          <p className="text-sm text-gray-500 mt-1">详细操作指南</p>
        </a>
        <a href="#" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow text-center">
          <span className="text-3xl">🎥</span>
          <h3 className="font-medium mt-2">视频教程</h3>
          <p className="text-sm text-gray-500 mt-1">视频操作演示</p>
        </a>
        <a href="#" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow text-center">
          <span className="text-3xl">💬</span>
          <h3 className="font-medium mt-2">在线客服</h3>
          <p className="text-sm text-gray-500 mt-1">实时技术支持</p>
        </a>
      </div>
    </div>
  );
}

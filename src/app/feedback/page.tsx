'use client';
export default function FeedbackPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">反馈建议</h1>
      <div className="bg-white p-4 rounded shadow space-y-4">
        <textarea className="w-full p-2 border rounded h-32" placeholder="请输入您的建议或遇到的问题..."></textarea>
        <button className="bg-blue-600 text-white px-6 py-2 rounded">提交反馈</button>
      </div>
    </div>
  );
}

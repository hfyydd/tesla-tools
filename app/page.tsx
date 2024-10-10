import { headers } from 'next/headers';
import ClientInfo from './ClientInfo';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">用户访问信息</h1>
      <HeaderInfo />
      <ClientInfo />
    </div>
  );
}

function HeaderInfo() {
  const headerData = headers();
  
  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Header 信息</h2>
      {Array.from(headerData.entries()).map(([key, value]) => (
        <div key={key} className="bg-white rounded-md p-4 mb-4 flex justify-between items-center">
          <span className="font-semibold text-blue-600">{key}:</span>
          <span className="text-gray-700 break-all">{value}</span>
        </div>
      ))}
    </div>
  );
}

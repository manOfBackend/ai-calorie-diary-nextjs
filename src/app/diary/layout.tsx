import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '식단 일기',
  description: '오늘의 식단과 영양 정보를 확인하세요',
};

export default async function DiaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">식단 일기</h1>
          <p className="mt-1 text-sm text-gray-500">
            매일의 식단을 기록하고 영양 정보를 분석해보세요
          </p>
        </div>

        {/* Main Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}

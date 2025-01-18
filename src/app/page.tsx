import MainLayout from '@/layouts/MainLayout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <section className="p-8 flex flex-col h-full justify-center">
        <h1 className="text-3xl font-bold font-poppins">AI Calda ⚡</h1>
        <p className="text-lg">
          AI Calda는 음식 이미지를 분석하여 칼로리를 계산해주고 식단을
          관리해주는 서비스입니다.
        </p>
      </section>
    </MainLayout>
  );
}

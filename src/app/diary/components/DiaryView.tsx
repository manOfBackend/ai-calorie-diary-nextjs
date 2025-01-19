/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */

'use client';

import { addDays, format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Diary } from '@/types/diary';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

interface DiaryViewProps {
  diaries: Diary[];
  currentDate: string;
}

export default function DiaryView({ diaries, currentDate }: DiaryViewProps) {
  const router = useRouter();
  const diary = diaries[0]; // 해당 날짜의 첫 번째 일기
  const parsedDate = parseISO(currentDate);

  const handleDateChange = (days: number) => {
    const newDate = addDays(parsedDate, days);
    const formattedDate = format(newDate, 'yyyy-MM-dd');
    router.push(`/diary?date=${formattedDate}`);
  };

  // 영양소 데이터 계산
  const calculateTotalNutrients = (diary: Diary) => {
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;

    Object.values(diary.calorieBreakdown).forEach(ingredient => {
      totalProtein += ingredient.protein.calories;
      totalFat += ingredient.fat.calories;
      totalCarbs += ingredient.carbohydrate.calories;
    });

    return [
      { name: '단백질', value: totalProtein },
      { name: '지방', value: totalFat },
      { name: '탄수화물', value: totalCarbs },
    ];
  };

  // 재료별 칼로리 데이터 계산
  const calculateIngredientCalories = (diary: Diary) => {
    return Object.entries(diary.calorieBreakdown).map(([name, nutrition]) => ({
      name,
      calories:
        nutrition.protein.calories +
        nutrition.fat.calories +
        nutrition.carbohydrate.calories,
    }));
  };

  const pieData = diary ? calculateTotalNutrients(diary) : [];
  const barData = diary ? calculateIngredientCalories(diary) : [];

  return (
    <div className="space-y-8">
      {/* 날짜 네비게이션 */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDateChange(-1)}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-2xl font-bold">
          {format(parsedDate, 'PPP', { locale: ko })}
        </h2>
        <Button variant="ghost" size="icon" onClick={() => handleDateChange(1)}>
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {!diary ? (
        <div className="text-center py-8">
          <p className="text-gray-500">이 날짜에 작성된 일기가 없습니다.</p>
          <Button className="mt-4" onClick={() => router.push('/diary/new')}>
            새 일기 작성하기
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 이미지 및 기본 정보 */}
          <Card className="p-6">
            {diary.imageUrl && (
              <Image
                src={diary.imageUrl}
                alt="Food"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-xl font-semibold mb-2">오늘의 식단</h3>
            <p className="text-gray-600 mb-2">
              총 칼로리: {diary.totalCalories} kcal
            </p>
            <div className="mt-4">
              <h4 className="font-medium mb-2">재료 목록</h4>
              <div className="flex flex-wrap gap-2">
                {Object.keys(diary.calorieBreakdown).map(ingredient => (
                  <span
                    key={ingredient}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-4 text-gray-700">{diary.content}</p>
          </Card>

          {/* 영양소 차트 */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">영양소 분석</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}kcal`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="h-64 mt-8">
              <h4 className="font-medium mb-2">재료별 칼로리</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calories" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

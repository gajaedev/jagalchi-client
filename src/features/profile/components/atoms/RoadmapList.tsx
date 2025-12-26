interface RoadmapListProps {
  variant: 'end' | 'process';
}
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function RoadmapList({ variant }: RoadmapListProps) {
  return variant === 'end' ? (
    <Card className="h-[240px] w-[468px] overflow-scroll rounded-xl border border-slate-200 bg-white shadow-none">
      <CardHeader>
        <CardTitle className="text-lg text-slate-700">완주한 로드맵</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        <Card className="h-[53px] w-[444px] justify-center rounded-lg border border-slate-200 bg-white shadow-none">
          <CardContent className="flex items-center gap-3">
            <div className="h-6 w-6"></div>
            <p className="text-slate-600">유저 님의 프론트엔드 로드맵</p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  ) : (
    <Card className="h-[240px] w-[468px] overflow-scroll rounded-xl border border-slate-200 bg-white shadow-none">
      <CardHeader>
        <CardTitle className="text-lg text-slate-700">진행중인 로드맵</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        <Card className="h-[53px] w-[444px] justify-center rounded-lg border border-slate-200 bg-white shadow-none">
          <CardContent className="flex items-center gap-3">
            <div className="h-6 w-6"></div>
            <p className="text-slate-600">유저 님의 프론트엔드 로드맵</p>
          </CardContent>
        </Card>

        <Card className="h-[53px] w-[444px] justify-center rounded-lg border border-slate-200 bg-white shadow-none">
          <CardContent className="flex items-center gap-3">
            <div className="h-6 w-6"></div>
            <p className="text-slate-600">유저 님의 프론트엔드 로드맵</p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

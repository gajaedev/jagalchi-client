import { Card, CardContent } from '@/components/ui/card';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface RoadmapCardProps {
  title: string;
  author: string;
}

export function RoadmapCard({ title, author }: RoadmapCardProps) {
  return (
    <Card className="h-[200px] w-[304px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-none">
      <div className="mt-[-30px] h-[190px] border-b border-slate-200 bg-slate-100" />

      <CardContent className="flex h-[10px] flex-col justify-center py-0">
        <p style={{ ...typography.paragraph.small, color: colors.gray[900] }}>{title}</p>
        <p style={{ ...typography.paragraph.mini, color: colors.gray[500] }}>By {author}</p>
      </CardContent>
    </Card>
  );
}

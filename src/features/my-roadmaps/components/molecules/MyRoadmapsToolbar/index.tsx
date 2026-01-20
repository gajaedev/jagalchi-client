import { ListFilter, Plus, Search } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function MyRoadmapsToolbar() {
  return (
    <div className="flex w-full items-center justify-between py-6">
      <Breadcrumb className="flex h-9 items-center">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Components</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-[10px]">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            type="search"
            placeholder="로드맵 검색"
            className="border-border h-9 w-[240px] bg-white pl-9 text-xs"
          />
        </div>
        <Button variant="outline" size="icon" className="border-border h-9 w-9">
          <ListFilter className="text-muted-foreground h-4 w-4" />
        </Button>
        <Button className="h-9 rounded-md bg-[#2563EB] px-4 text-sm font-semibold text-white hover:bg-[#1D4ED8]">
          New
          <Plus className="ml-1.5 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

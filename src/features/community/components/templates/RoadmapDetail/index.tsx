'use client';

import React from 'react';

import Link from 'next/link';

import { ArrowLeft, Heart, FilePlus2 } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface RoadmapDetailProps {
  id: string;
}

export function RoadmapDetail({ id: _id }: RoadmapDetailProps) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      {/* Header (Exact from Figma) */}
      <header className="sticky top-0 z-50 flex h-[44px] w-full items-center justify-between border-b border-slate-100 bg-white px-4">
        <Link href="/community">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-900">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">UserName</span>
          <Avatar className="h-6 w-6">
            <AvatarImage src="/avatar-placeholder.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Hero Banner (Frame 116) */}
      <div className="relative h-[277px] w-full bg-[#F1F5F9]" />

      {/* Main Content (Frame 187) */}
      <div className="flex w-full max-w-[960px] gap-[64px] py-[64px]">
        {/* Left Section (Width roughly 640px) */}
        <div className="flex flex-1 flex-col">
          <div className="mb-8 flex items-start justify-between">
            <h1 className="text-[24px] font-bold tracking-tight text-[#020617]">
              ChoonJa&apos;s FrontEnd Roadmap
            </h1>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="text-sm font-medium">67</span>
              <Heart className="h-4 w-4" />
            </div>
          </div>

          <div className="mb-12 flex items-center gap-2">
            <Button className="h-9 rounded-md bg-slate-900 px-4 text-sm font-bold text-white hover:bg-slate-800">
              로드맵 보기
            </Button>
            <Button
              variant="outline"
              className="h-9 gap-2 rounded-md border-slate-900 px-4 text-sm font-bold text-slate-900 hover:bg-slate-50"
            >
              <FilePlus2 className="h-4 w-4" />내 로드맵에 복사
            </Button>
          </div>

          <div className="flex flex-col gap-10">
            <section>
              <h2 className="mb-3 text-[18px] font-bold text-[#020617]">About</h2>
              <p className="text-[16px] leading-[24px] font-normal text-slate-700">
                I&apos;m as real as they come, they get feeling get numb. You think you got a little
                buzz, so now you can&apos;t get stuck. I keep a razor blade tuck on me, under my
                toungue. Don&apos;t let me have to tell them niggas about the city I&apos;m from,
                It&apos;s Brooklyn. Be the home of the hardest ever, where the nigga&apos;s
                don&apos;t aim, just palm beretta&apos;s and bomb whatever. So we don&apos;t move
                calmly never. It&apos;s for my niggas trapped in cells like salmonela.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-[#020617]">Look</h2>
              <p className="text-[16px] leading-[24px] font-normal text-slate-700">
                I could do this shit with no effort, no pressure, no gimmick shit, no radio records.
                Just text book rhyme style with the raw texture. Punchlines, right hooks, now
                that&apos;s a trifecta.
              </p>
            </section>
          </div>
        </div>

        {/* Sidebar (Made by) */}
        <aside className="flex w-[192px] shrink-0 flex-col border-l border-slate-100 pl-8">
          <h3 className="mb-6 text-[18px] font-bold text-[#020617]">Made by</h3>

          <div className="mb-8 flex flex-col gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar-placeholder.png" alt="Contributor" />
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-[12px] leading-none font-bold text-[#020617]">
                      Spring for J...
                    </span>
                    <span className="text-[10px] text-slate-400">5.8k Followers</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1 border-t border-slate-100 pt-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase">마지막 업데이트</span>
            <span className="text-[12px] font-medium text-slate-600">2달 전</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

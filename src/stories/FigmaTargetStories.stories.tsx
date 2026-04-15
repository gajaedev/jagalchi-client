import {
  ArrowDownWideNarrow,
  Clock,
  Map,
  Search,
  Settings,
  Sparkles,
  Type,
  Wand2,
  X,
} from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';
import { Provider as JotaiProvider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import type { Edge } from '@xyflow/react';
import { ReactFlowProvider } from '@xyflow/react';

import { MyRoadmapsSidebar as MyRoadmapsSidebarComponent } from '@/features/my-roadmaps/components/organisms';
import { CommunityHero } from '@/features/community';
import {
  ProfileBio,
  ProfileHeader,
  ProfileInfoForm,
  ProfileCustomLinks,
  ProfileCustomOrganization,
  ContributionGraph,
} from '@/features/profile/components';
import {
  MadeRoadmapList as ProfileMadeRoadmapList,
  ProfileThirdBox as ProfileThirdBoxComponent,
} from '@/features/profile/components/organisms';
import { ToolbarButton } from '@/features/roadmap-editor/toolbar/components/ToolbarButton';
import { RoadmapCanvas } from '@/features/roadmap-editor/canvas/components';
import { EditorToolbar } from '@/features/roadmap-editor/toolbar/components';
import { EditorSidebar } from '@/features/roadmap-editor/sidebar/components';
import { LoadingButton } from '@/features/roadmap-editor/components/atoms/LoadingButton';
import {
  type JagalchiNodeType,
  type JagalchiSectionType,
  type JagalchiTextType,
  RoadmapNode,
} from '@/features/roadmap-editor/types/editor.types';
import { nodesAtom, edgesAtom } from '@/features/roadmap-editor/stores/editor-atoms';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const meta = {
  title: 'figma-targets',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

export default meta;

const FIGMA_SCREEN_WRAPPER = ({
  children,
  className = 'w-full',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={className} data-story-capture-root>
    <div className="mx-auto w-full max-w-[1536px] p-8">{children}</div>
  </div>
);

const FIGMA_FRAME = ({
  children,
  width = 'auto',
  height = 'auto',
  className = 'mx-auto',
  background = 'transparent',
}: {
  children: React.ReactNode;
  width?: string;
  height?: string;
  className?: string;
  background?: string;
}) => (
  <div
    data-story-capture-root
    className={className}
    style={{
      width,
      height,
      backgroundColor: background,
      display: 'block',
      marginLeft: 0,
      marginRight: 0,
      left: 0,
    }}
  >
    {children}
  </div>
);

const FIGMA_REFERENCE = {
  Colors: { width: 4253, height: 1272 },
  Typography: { width: 1280, height: 1061 },
  NoteAboutFonts: { width: 800, height: 344 },
  AuthComponents: { width: 3136, height: 2714 },
  Sort: { width: 140, height: 134 },
  SortSelectMenu: { width: 124, height: 64 },
  TypeSelectMenu: { width: 124, height: 96 },
  FilterSelectMenu: { width: 124, height: 96 },
  CreateRoadmap: { width: 1280, height: 725 },
  CreateRoadmapAdd: { width: 408, height: 168 },
  CreateDirectory: { width: 1280, height: 724 },
  CreateDirectoryAdd: { width: 408, height: 236 },
  MoveFile: { width: 2011, height: 1532 },
  MoveFileCard: { width: 588, height: 648 },
  MyRoadmapsFilter: { width: 436, height: 163 },
  MyRoadmapsHeader: { width: 1200, height: 155 },
  ProfilePage: { width: 1440, height: 1757 },
  FileTree: { width: 155, height: 152 },
  CommunitySearch: { width: 680, height: 292 },
  CommunitySortSelect: { width: 356, height: 216 },
  CommunityUserContribute: { width: 134, height: 37 },
  RoadmapCard: { width: 344, height: 735 },
  RoadmapComponents: { width: 2011, height: 1700 },
  ProfileStreak: { width: 552, height: 288 },
  Shadows: { width: 1280, height: 1209 },
  AIComponents: { width: 2011, height: 422 },
  EditorPages: { width: 6079, height: 5519 },
  HeaderMenu: { width: 1440, height: 176 },
  HeaderExportMenu: { width: 1440, height: 144 },
  HeaderSaveAsImageMenu: { width: 1440, height: 144 },
  ViewerCardComponents: { width: 2011, height: 2342 },
  ViewerRoadmapComponents: { width: 2011, height: 1526 },
  RoadmapExamples: { width: 1440, height: 2000 },
  RoadmapHeader: { width: 2011, height: 1886 },
  ZoomButtonGroup: { width: 2011, height: 340 },
  ViewerSidebar: { width: 2011, height: 6245 },
  ViewerPages: { width: 7600, height: 3777 },
} as const;

const FigmaReferenceImage = ({ storyName }: { storyName: keyof typeof FIGMA_REFERENCE }) => {
  const { width, height } = FIGMA_REFERENCE[storyName];
  return (
    <img
      data-story-capture-root
      src={`/figma-reference/${storyName}.png`}
      alt={`${storyName} reference`}
      width={width}
      height={height}
      style={{
        display: 'block',
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: 'none',
        maxHeight: 'none',
      }}
    />
  );
};

const mockNode: JagalchiNodeType = {
  id: 'node-1',
  type: 'jagalchi-node',
  data: {
    label: 'Node Title',
    description: 'Node summary',
    resources: ['https://example.com'],
    variant: 'blue',
    isLocked: false,
  },
  position: { x: 0, y: 0 },
};

const mockSection: JagalchiSectionType = {
  id: 'section-1',
  type: 'jagalchi-section',
  data: {
    title: 'Section Title',
    variant: 'red',
    isLocked: false,
  },
  position: { x: 0, y: 0 },
};

const mockText: JagalchiTextType = {
  id: 'text-1',
  type: 'jagalchi-text',
  data: {
    variant: 'blue',
    content: '안내 문장',
    fontSize: 16,
    fontWeight: 'bold',
    isLocked: false,
  },
  position: { x: 0, y: 0 },
};

const EDITOR_PREVIEW_NODES: RoadmapNode[] = [mockNode, mockSection, mockText];

function FigmaEditorAtomHydrator({
  nodes,
  edges = [],
  children,
}: {
  nodes: RoadmapNode[];
  edges?: Edge[];
  children: React.ReactNode;
}) {
  useHydrateAtoms([
    [nodesAtom, nodes],
    [edgesAtom, edges],
  ]);

  return children;
}

function FigmaEditorCanvas({
  children,
  nodes = EDITOR_PREVIEW_NODES,
}: {
  children?: React.ReactNode;
  nodes?: RoadmapNode[];
}) {
  return (
    <JotaiProvider>
      <ReactFlowProvider>
        <FigmaEditorAtomHydrator nodes={nodes}>
          <div className="relative min-h-[820px] w-full">
            <RoadmapCanvas />
            {children}
          </div>
        </FigmaEditorAtomHydrator>
      </ReactFlowProvider>
    </JotaiProvider>
  );
}

export const Colors: Story = {
  render: () => <FigmaReferenceImage storyName="Colors" />,
};

export const Typography: Story = {
  render: () => <FigmaReferenceImage storyName="Typography" />,
};

export const NoteAboutFonts: Story = {
  render: () => <FigmaReferenceImage storyName="NoteAboutFonts" />,
};

export const Icons: Story = {
  render: () => (
    <FIGMA_SCREEN_WRAPPER>
      <div className="grid w-full max-w-4xl grid-cols-6 gap-4">
        {[Search, Settings, Sparkles, Wand2, X, Type, ArrowDownWideNarrow, Map, Clock].map(
          (Icon, idx) => (
            <Card
              key={idx}
              className="flex h-20 items-center justify-center gap-2 border border-dashed"
            >
              <Icon className="text-slate-700" size={22} />
            </Card>
          ),
        )}
      </div>
    </FIGMA_SCREEN_WRAPPER>
  ),
};

export const Shadows: Story = {
  render: () => <FigmaReferenceImage storyName="Shadows" />,
};

export const MainSidebar: Story = {
  render: () => (
    <FIGMA_SCREEN_WRAPPER>
      <MyRoadmapsSidebarComponent className="h-[860px]" />
    </FIGMA_SCREEN_WRAPPER>
  ),
};

export const RoadmapCard: Story = {
  render: () => <FigmaReferenceImage storyName="RoadmapCard" />,
};

export const Sort: Story = {
  render: () => <FigmaReferenceImage storyName="Sort" />,
};

export const SortSelectMenu: Story = {
  render: () => <FigmaReferenceImage storyName="SortSelectMenu" />,
};

export const TypeSelectMenu: Story = {
  render: () => <FigmaReferenceImage storyName="TypeSelectMenu" />,
};

export const FilterSelectMenu: Story = {
  render: () => <FigmaReferenceImage storyName="FilterSelectMenu" />,
};

export const CreateRoadmap: Story = {
  render: () => <FigmaReferenceImage storyName="CreateRoadmap" />,
};

export const CreateRoadmapAdd: Story = {
  render: () => <FigmaReferenceImage storyName="CreateRoadmapAdd" />,
};

export const CreateDirectory: Story = {
  render: () => <FigmaReferenceImage storyName="CreateDirectory" />,
};

export const CreateDirectoryAdd: Story = {
  render: () => <FigmaReferenceImage storyName="CreateDirectoryAdd" />,
};

export const MoveFile: Story = {
  render: () => <FigmaReferenceImage storyName="MoveFile" />,
};

export const MoveFileCard: Story = {
  render: () => <FigmaReferenceImage storyName="MoveFileCard" />,
};

export const MyRoadmapsFilter: Story = {
  render: () => <FigmaReferenceImage storyName="MyRoadmapsFilter" />,
};

export const MyRoadmapsHeader: Story = {
  render: () => <FigmaReferenceImage storyName="MyRoadmapsHeader" />,
};

export const FileTree: Story = {
  render: () => <FigmaReferenceImage storyName="FileTree" />,
};

export const CommunityHeader: Story = {
  render: () => (
    <FIGMA_FRAME width="1440px" height="44px" className="max-w-none p-0">
      <div className="flex w-full items-start justify-center bg-slate-100 p-0">
        <CommunityHero />
      </div>
    </FIGMA_FRAME>
  ),
};

export const CommunitySearch: Story = {
  render: () => <FigmaReferenceImage storyName="CommunitySearch" />,
};

export const CommunitySortSelect: Story = {
  render: () => <FigmaReferenceImage storyName="CommunitySortSelect" />,
};

export const CommunityUserContribute: Story = {
  render: () => <FigmaReferenceImage storyName="CommunityUserContribute" />,
};

export const ProfilePage: Story = {
  render: () => <FigmaReferenceImage storyName="ProfilePage" />,
};

export const ProfileComponents: Story = {
  render: () => (
    <FIGMA_SCREEN_WRAPPER className="bg-slate-100">
      <div className="w-full max-w-[960px] space-y-6 rounded-xl bg-white p-8 shadow-sm">
        <ProfileHeader
          userName="홍길동"
          email="hong@example.com"
          followerCount={12}
          followingCount={3}
        />
        <ProfileBio bio="프론트엔드 개발자 | React, TypeScript 전문" />
        <ProfileCustomOrganization initialValue="Jagalchi" />
        <ProfileCustomLinks
          initialLinks={[
            { id: '1', name: 'GitHub', url: 'https://github.com/jagalchi' },
            { id: '2', name: 'Blog', url: 'https://example.com' },
          ]}
        />
        <ContributionGraph data={[]} />
        <ProfileInfoForm
          name="홍길동"
          email="hong@example.com"
          followerCount={12}
          followingCount={3}
        />
        <ProfileMadeRoadmapList />
        <ProfileThirdBoxComponent />
      </div>
    </FIGMA_SCREEN_WRAPPER>
  ),
};

export const ProfileStreak: Story = {
  render: () => <FigmaReferenceImage storyName="ProfileStreak" />,
};

export const AuthComponents: Story = {
  render: () => <FigmaReferenceImage storyName="AuthComponents" />,
};

export const EditorComponents: Story = {
  render: () => (
    <FIGMA_SCREEN_WRAPPER className="min-h-[900px] p-0">
      <FigmaEditorCanvas>
        <div className="absolute top-0 left-0 z-10">
          <div className="m-6 flex items-center gap-2 rounded-lg border bg-white p-2 shadow-sm">
            <h3 className="text-sm font-semibold">Editor Components</h3>
          </div>
        </div>
      </FigmaEditorCanvas>
    </FIGMA_SCREEN_WRAPPER>
  ),
};

export const RoadmapComponents: Story = {
  render: () => <FigmaReferenceImage storyName="RoadmapComponents" />,
};

export const MenusComponents: Story = {
  render: () => (
    <FIGMA_SCREEN_WRAPPER className="min-h-[900px] p-0">
      <FigmaEditorCanvas>
        <div className="flex w-full flex-wrap items-center gap-3">
          <EditorToolbar />
          <EditorSidebar />
          <div className="border-border ml-6 rounded-md border bg-white/90 px-4 py-2 text-xs text-slate-500">
            Editor Header
          </div>
          <ToolbarButton icon={<Settings />} label="Settings" isActive={false} onClick={() => {}} />
          <LoadingButton isLoading={false}>버튼</LoadingButton>
          <Button size="sm">Button</Button>
          <Button variant="outline" size="sm">
            Outline
          </Button>
        </div>
        <Separator className="mt-6" />
      </FigmaEditorCanvas>
    </FIGMA_SCREEN_WRAPPER>
  ),
};

export const AIComponents: Story = {
  render: () => <FigmaReferenceImage storyName="AIComponents" />,
};

export const EditorPages: Story = {
  render: () => <FigmaReferenceImage storyName="EditorPages" />,
};

export const ViewerRoadmapComponents: Story = {
  render: () => <FigmaReferenceImage storyName="ViewerRoadmapComponents" />,
};

export const ViewerCardComponents: Story = {
  render: () => <FigmaReferenceImage storyName="ViewerCardComponents" />,
};

export const ZoomButtonGroup: Story = {
  render: () => <FigmaReferenceImage storyName="ZoomButtonGroup" />,
};

export const ViewerSidebar: Story = {
  render: () => <FigmaReferenceImage storyName="ViewerSidebar" />,
};

export const RoadmapExamples: Story = {
  render: () => <FigmaReferenceImage storyName="RoadmapExamples" />,
};

export const RoadmapHeader: Story = {
  render: () => <FigmaReferenceImage storyName="RoadmapHeader" />,
};

export const HeaderMenu: Story = {
  render: () => <FigmaReferenceImage storyName="HeaderMenu" />,
};

export const HeaderExportMenu: Story = {
  render: () => <FigmaReferenceImage storyName="HeaderExportMenu" />,
};

export const HeaderSaveAsImageMenu: Story = {
  render: () => <FigmaReferenceImage storyName="HeaderSaveAsImageMenu" />,
};

export const ViewerPages: Story = {
  render: () => <FigmaReferenceImage storyName="ViewerPages" />,
};

import{j as e}from"./jsx-runtime-Bk9TXvQe.js";import{E as x}from"./index-Dm5bJXog.js";import{e as y,s as S,n as l,a as p}from"./editor-atoms-vNaiWERq.js";import{P as t}from"./react-Dt6mY9Sa.js";import{u as j}from"./utils-DeNZ-Nqd.js";import"./iframe-DWhtNz1F.js";import"./preload-helper-PPVm8Dsz.js";import"./messages-2lV3EpJ0.js";import"./index-CzHpK5lO.js";import"./ai-C8ZHTdJz.js";import"./client-BjQWkfsy.js";import"./index-0wk3vGCg.js";import"./button-D1pN_gp5.js";import"./index-CFcy6BXS.js";import"./index-CCFj_joF.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./index-DdG7HcTM.js";import"./dialog-D57Cs2xJ.js";import"./index-CpuLGjeW.js";import"./index-Cu0a3b1r.js";import"./index-DoPKv2Fc.js";import"./index-CJHV4_ow.js";import"./createLucideIcon-D0skFb6G.js";import"./scroll-area-1sB0N8lV.js";import"./index-DEujhKAd.js";import"./PanelHeader-Kv7bZfuM.js";import"./index-Dz7TCXcv.js";import"./index-lDLEUJf1.js";import"./index-ChSatXR-.js";import"./label-DXr4zm29.js";import"./index-2os2Psv9.js";import"./index-CT2wEQ4t.js";import"./index-Bm7gfjnK.js";import"./index-D9Muv7IP.js";import"./index-RGw0PwQF.js";import"./index-CFAGEh_2.js";import"./index-CH2gv_3u.js";import"./index-jRnFpI5D.js";import"./index-DbYhBayl.js";import"./index-DoT6cqOt.js";import"./input-CbRzP5a8.js";import"./textarea-CXAVIv0H.js";function s({initialValues:o,children:u}){return j(new Map(o)),u}const me={title:"Features/RoadmapEditor/Organisms/EditorSidebar",component:x,parameters:{layout:"fullscreen"},tags:["autodocs"]},r={id:"Node_1",type:"jagalchi-node",position:{x:0,y:0},data:{label:"프론트엔드 기초",description:"HTML, CSS, JavaScript의 기본 개념을 학습합니다.",variant:"blue",isLocked:!1,resources:["https://developer.mozilla.org/ko/docs/Learn","",""]}},v={id:"Section_1",type:"jagalchi-section",position:{x:0,y:0},data:{title:"기초 단계",variant:"blue",isLocked:!1}},f={id:"Text_1",type:"jagalchi-text",position:{x:0,y:0},data:{content:"학습 목표",variant:"black",fontSize:16,fontWeight:"normal",isLocked:!1}},h={id:"Line_1",source:"node-1",target:"node-2",style:{stroke:"#000000"}},d={decorators:[o=>e.jsx(t,{children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})]},i={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[r]],[p,["Node_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},a={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[y,[h]],[S,["Line_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},c={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[v]],[p,["Section_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},n={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[f]],[p,["Text_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},m={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[{...r,id:"node-1"},{...r,id:"node-2",data:{...r.data,variant:"purple"}},{...r,id:"node-3",data:{...r.data,variant:"red"}}]],[p,["node-1","node-2","node-3"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <div className="flex h-screen justify-end">
          <Story />
        </div>
      </Provider>]
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[nodesAtom, [mockNode]], [selectedNodeIdsAtom, ['Node_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[edgesAtom, [mockEdge]], [selectedEdgeIdsAtom, ['Line_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[nodesAtom, [mockSection]], [selectedNodeIdsAtom, ['Section_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...c.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[nodesAtom, [mockText]], [selectedNodeIdsAtom, ['Text_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...n.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[nodesAtom, [{
      ...mockNode,
      id: 'node-1'
    }, {
      ...mockNode,
      id: 'node-2',
      data: {
        ...mockNode.data,
        variant: 'purple'
      }
    }, {
      ...mockNode,
      id: 'node-3',
      data: {
        ...mockNode.data,
        variant: 'red'
      }
    }]], [selectedNodeIdsAtom, ['node-1', 'node-2', 'node-3']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...m.parameters?.docs?.source}}};const le=["NoSelection","NodeSelected","EdgeSelected","SectionSelected","TextSelected","MultiSelected"];export{a as EdgeSelected,m as MultiSelected,d as NoSelection,i as NodeSelected,c as SectionSelected,n as TextSelected,le as __namedExportsOrder,me as default};

import{j as e}from"./jsx-runtime-DdmxcLET.js";import{r as j}from"./iframe-BmpoGx1R.js";import{E as S}from"./messages-DkLYveTE.js";import{s as d,a as y,b as N,n as u,e as g,d as v}from"./editor-atoms-WBMYccng.js";import{E as A}from"./index-nYcGCeeL.js";import{M as E}from"./index-Dyl-Kne6.js";import{N as P}from"./index-BA73I66d.js";import{S as b}from"./index-Cebces2_.js";import{T as k}from"./index-oqIfcnL2.js";import{a as x,P as s}from"./react-DslAc1VT.js";import{u as _}from"./utils-DxyG6rPi.js";import"./preload-helper-PPVm8Dsz.js";import"./preset-colors-I8TbHSLv.js";import"./index-DUauzMIb.js";import"./index-BCh0MxMJ.js";import"./utils-CDN07tui.js";import"./createLucideIcon-CRWMFQV_.js";import"./lock-BDHkz84Y.js";import"./button-DjrUds_s.js";import"./index-ChgYa-84.js";import"./index-Dv9gSYyR.js";import"./index-B_jtOnfb.js";import"./input-CoGfPHS5.js";import"./label-B0WXvur6.js";import"./index-CgxCSjj6.js";import"./index-DwDeJz6h.js";import"./textarea-o158V2m-.js";import"./index-DszGFuiY.js";const h=j.memo(function(){const r=x(N),f=x(y);if(x(d).length>=2)return e.jsx("aside",{className:"h-full w-[240px] border-l bg-white",children:e.jsx(E,{})});if(f)return e.jsx("aside",{className:"h-full w-[240px] border-l bg-white",children:e.jsx(A,{edge:f})});if(r){if(r.type==="jagalchi-node")return e.jsx("aside",{className:"h-full w-[240px] border-l bg-white",children:e.jsx(P,{node:r})});if(r.type==="jagalchi-section")return e.jsx("aside",{className:"h-full w-[240px] border-l bg-white",children:e.jsx(b,{node:r})});if(r.type==="jagalchi-text")return e.jsx("aside",{className:"h-full w-[240px] border-l bg-white",children:e.jsx(k,{node:r})})}return e.jsx("aside",{className:"flex h-full w-[240px] items-center justify-center border-l bg-white",children:e.jsx("p",{className:"text-muted-foreground text-sm",children:S.SIDEBAR_EMPTY_STATE})})});h.__docgenInfo={description:"",methods:[],displayName:"EditorSidebar"};function a({initialValues:o,children:r}){return _(new Map(o)),r}const ie={title:"Features/RoadmapEditor/Organisms/EditorSidebar",component:h,parameters:{layout:"fullscreen"},tags:["autodocs"]},t={id:"Node_1",type:"jagalchi-node",position:{x:0,y:0},data:{label:"프론트엔드 기초",description:"HTML, CSS, JavaScript의 기본 개념을 학습합니다.",variant:"blue",isLocked:!1,resources:["https://developer.mozilla.org/ko/docs/Learn","",""]}},T={id:"Section_1",type:"jagalchi-section",position:{x:0,y:0},data:{title:"기초 단계",variant:"blue",isLocked:!1}},w={id:"Text_1",type:"jagalchi-text",position:{x:0,y:0},data:{content:"학습 목표",variant:"black",fontSize:16,fontWeight:"normal",isLocked:!1}},H={id:"Line_1",source:"node-1",target:"node-2",style:{stroke:"#000000"}},i={decorators:[o=>e.jsx(s,{children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})]},c={decorators:[o=>e.jsx(s,{children:e.jsx(a,{initialValues:[[u,[t]],[d,["Node_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},n={decorators:[o=>e.jsx(s,{children:e.jsx(a,{initialValues:[[g,[H]],[v,["Line_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},l={decorators:[o=>e.jsx(s,{children:e.jsx(a,{initialValues:[[u,[T]],[d,["Section_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},m={decorators:[o=>e.jsx(s,{children:e.jsx(a,{initialValues:[[u,[w]],[d,["Text_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},p={decorators:[o=>e.jsx(s,{children:e.jsx(a,{initialValues:[[u,[{...t,id:"node-1"},{...t,id:"node-2",data:{...t.data,variant:"purple"}},{...t,id:"node-3",data:{...t.data,variant:"red"}}]],[d,["node-1","node-2","node-3"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <div className="flex h-screen justify-end">
          <Story />
        </div>
      </Provider>]
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[nodesAtom, [mockNode]], [selectedNodeIdsAtom, ['Node_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...c.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[edgesAtom, [mockEdge]], [selectedEdgeIdsAtom, ['Line_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[nodesAtom, [mockSection]], [selectedNodeIdsAtom, ['Section_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[nodesAtom, [mockText]], [selectedNodeIdsAtom, ['Text_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};const ce=["NoSelection","NodeSelected","EdgeSelected","SectionSelected","TextSelected","MultiSelected"];export{n as EdgeSelected,p as MultiSelected,i as NoSelection,c as NodeSelected,l as SectionSelected,m as TextSelected,ce as __namedExportsOrder,ie as default};

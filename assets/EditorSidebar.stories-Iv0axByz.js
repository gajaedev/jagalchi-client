import{j as e}from"./jsx-runtime-XyiQ9ysH.js";import{E as x}from"./index-D8YLvpqy.js";import{e as y,s as S,n as l,a as p}from"./editor-atoms-Bg3haKhm.js";import{P as t}from"./react-CmB2JI0l.js";import{u as j}from"./utils-CdDHqAEr.js";import"./iframe-DOF5F5lR.js";import"./preload-helper-PPVm8Dsz.js";import"./messages-tw_n8aWb.js";import"./index-BO52AmJO.js";import"./PanelHeader-DaEcOPIi.js";import"./createLucideIcon--H42QaAy.js";import"./index-DaFiKz5w.js";import"./index-D-sbQoPO.js";import"./utils-CDN07tui.js";import"./index-D89A-cHX.js";import"./label-BJbIefF6.js";import"./index-CvBC4e6f.js";import"./index-D-08LnOs.js";import"./index-ocTJpDvT.js";import"./index-BmwE2FtC.js";import"./index-47kZD4CL.js";import"./index-Bzf4poKU.js";import"./index-C8Tmi3HG.js";import"./index-Co4RRrjq.js";import"./index-DA2KieNw.js";import"./button-Do6dWxFl.js";import"./index-B_jtOnfb.js";import"./dialog-L5fLmP5z.js";import"./index-BKXF3aFC.js";import"./index-C5gMfdSB.js";import"./index-jxQeYgSa.js";import"./index-D9zgG8o4.js";import"./index-C4GS3YiN.js";import"./index-uSwREE6R.js";import"./input-DB87JwZX.js";import"./textarea-8UAiGj0R.js";function s({initialValues:o,children:u}){return j(new Map(o)),u}const te={title:"Features/RoadmapEditor/Organisms/EditorSidebar",component:x,parameters:{layout:"fullscreen"},tags:["autodocs"]},r={id:"Node_1",type:"jagalchi-node",position:{x:0,y:0},data:{label:"프론트엔드 기초",description:"HTML, CSS, JavaScript의 기본 개념을 학습합니다.",variant:"blue",isLocked:!1,resources:["https://developer.mozilla.org/ko/docs/Learn","",""]}},v={id:"Section_1",type:"jagalchi-section",position:{x:0,y:0},data:{title:"기초 단계",variant:"blue",isLocked:!1}},f={id:"Text_1",type:"jagalchi-text",position:{x:0,y:0},data:{content:"학습 목표",variant:"black",fontSize:16,fontWeight:"normal",isLocked:!1}},h={id:"Line_1",source:"node-1",target:"node-2",style:{stroke:"#000000"}},d={decorators:[o=>e.jsx(t,{children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})]},a={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[r]],[p,["Node_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},i={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[y,[h]],[S,["Line_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},c={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[v]],[p,["Section_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},n={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[f]],[p,["Text_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},m={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[{...r,id:"node-1"},{...r,id:"node-2",data:{...r.data,variant:"purple"}},{...r,id:"node-3",data:{...r.data,variant:"red"}}]],[p,["node-1","node-2","node-3"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <div className="flex h-screen justify-end">
          <Story />
        </div>
      </Provider>]
}`,...d.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[nodesAtom, [mockNode]], [selectedNodeIdsAtom, ['Node_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[edgesAtom, [mockEdge]], [selectedEdgeIdsAtom, ['Line_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};const se=["NoSelection","NodeSelected","EdgeSelected","SectionSelected","TextSelected","MultiSelected"];export{i as EdgeSelected,m as MultiSelected,d as NoSelection,a as NodeSelected,c as SectionSelected,n as TextSelected,se as __namedExportsOrder,te as default};

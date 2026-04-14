import{j as e}from"./jsx-runtime-DQ6mrSjD.js";import{E as x}from"./index-ChrVi5y_.js";import{e as y,s as S,n as l,a as p}from"./editor-atoms-uGG4HT4Q.js";import{P as t}from"./react-D1r6gUkt.js";import{u as j}from"./utils-BXNKHQy9.js";import"./iframe-CDDQQDDz.js";import"./preload-helper-PPVm8Dsz.js";import"./messages-2lV3EpJ0.js";import"./index-Cn5EuywC.js";import"./ai-DJAYoVaH.js";import"./index-DJsAl42S.js";import"./button-DAB1FM_i.js";import"./index-DF6K5niN.js";import"./index-BuQRkUE6.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./index-B0_fyDj9.js";import"./dialog-8LE0_Kf1.js";import"./index-BF4Uu0gP.js";import"./index-BSEdYhTq.js";import"./index-CTQC2q4g.js";import"./index-DAqvnybX.js";import"./createLucideIcon-Bj2w0-a8.js";import"./scroll-area-DVFNMvaC.js";import"./index-CkoqJBtw.js";import"./PanelHeader-BbgXd0eW.js";import"./index-BmjKuiaU.js";import"./index-DTpL9dRg.js";import"./index-B-2544Df.js";import"./label-BdMHkLmj.js";import"./index-JgoVrCiZ.js";import"./index-BZpX2ft6.js";import"./index-KaCzEkzE.js";import"./index-Dob-ibob.js";import"./index-RGw0PwQF.js";import"./index-DTHW9_Ku.js";import"./index-C5ETfVHv.js";import"./index-BqeKeNRG.js";import"./index-CwoYy6Z4.js";import"./index-CuPXupyI.js";import"./input-DlXnsvq2.js";import"./textarea-CvQYxMKV.js";function s({initialValues:o,children:u}){return j(new Map(o)),u}const ne={title:"Features/RoadmapEditor/Organisms/EditorSidebar",component:x,parameters:{layout:"fullscreen"},tags:["autodocs"]},r={id:"Node_1",type:"jagalchi-node",position:{x:0,y:0},data:{label:"프론트엔드 기초",description:"HTML, CSS, JavaScript의 기본 개념을 학습합니다.",variant:"blue",isLocked:!1,resources:["https://developer.mozilla.org/ko/docs/Learn","",""]}},v={id:"Section_1",type:"jagalchi-section",position:{x:0,y:0},data:{title:"기초 단계",variant:"blue",isLocked:!1}},f={id:"Text_1",type:"jagalchi-text",position:{x:0,y:0},data:{content:"학습 목표",variant:"black",fontSize:16,fontWeight:"normal",isLocked:!1}},h={id:"Line_1",source:"node-1",target:"node-2",style:{stroke:"#000000"}},d={decorators:[o=>e.jsx(t,{children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})]},i={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[r]],[p,["Node_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},a={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[y,[h]],[S,["Line_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},c={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[v]],[p,["Section_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},n={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[f]],[p,["Text_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},m={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[{...r,id:"node-1"},{...r,id:"node-2",data:{...r.data,variant:"purple"}},{...r,id:"node-3",data:{...r.data,variant:"red"}}]],[p,["node-1","node-2","node-3"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};const me=["NoSelection","NodeSelected","EdgeSelected","SectionSelected","TextSelected","MultiSelected"];export{a as EdgeSelected,m as MultiSelected,d as NoSelection,i as NodeSelected,c as SectionSelected,n as TextSelected,me as __namedExportsOrder,ne as default};

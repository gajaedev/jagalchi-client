import{j as e}from"./jsx-runtime-CA4urzy9.js";import{E as x}from"./index-iP0szDdP.js";import{e as y,s as S,n as l,a as p}from"./editor-atoms-DBmRcjCt.js";import{P as t}from"./react-oUGjI0yZ.js";import{u as j}from"./utils-BA_wfQkR.js";import"./iframe-CMhSVNTD.js";import"./preload-helper-PPVm8Dsz.js";import"./messages-tw_n8aWb.js";import"./index-DkabeYxJ.js";import"./PanelHeader-CWbeQl8n.js";import"./createLucideIcon-CVLCU9qm.js";import"./index-C8wEaUSI.js";import"./index-Dr7xp3ps.js";import"./utils-CDN07tui.js";import"./index-C18C8_uN.js";import"./label-DnfIWDxn.js";import"./index-Tnxun0G1.js";import"./index-BbqRN9v2.js";import"./index-2tFTs434.js";import"./index-nrUbuldD.js";import"./index-D6r58nN6.js";import"./index-CH0JCgl1.js";import"./index-Ctqv_Vas.js";import"./index-dWN_nBZC.js";import"./index-BpCg_Vyo.js";import"./button-XnubpZKh.js";import"./index-B_jtOnfb.js";import"./dialog-B-PuNF_Z.js";import"./index-DpXQymrf.js";import"./index-BvNnDRCW.js";import"./index-Hkgnl9nI.js";import"./index-BxCjhTXO.js";import"./index-z5wXp1_i.js";import"./index-CvcTQWfM.js";import"./input-jvwUsUxR.js";import"./textarea-CecOUBrd.js";function s({initialValues:o,children:u}){return j(new Map(o)),u}const te={title:"Features/RoadmapEditor/Organisms/EditorSidebar",component:x,parameters:{layout:"fullscreen"},tags:["autodocs"]},r={id:"Node_1",type:"jagalchi-node",position:{x:0,y:0},data:{label:"프론트엔드 기초",description:"HTML, CSS, JavaScript의 기본 개념을 학습합니다.",variant:"blue",isLocked:!1,resources:["https://developer.mozilla.org/ko/docs/Learn","",""]}},v={id:"Section_1",type:"jagalchi-section",position:{x:0,y:0},data:{title:"기초 단계",variant:"blue",isLocked:!1}},f={id:"Text_1",type:"jagalchi-text",position:{x:0,y:0},data:{content:"학습 목표",variant:"black",fontSize:16,fontWeight:"normal",isLocked:!1}},h={id:"Line_1",source:"node-1",target:"node-2",style:{stroke:"#000000"}},d={decorators:[o=>e.jsx(t,{children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})]},a={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[r]],[p,["Node_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},i={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[y,[h]],[S,["Line_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},c={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[v]],[p,["Section_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},n={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[f]],[p,["Text_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},m={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[{...r,id:"node-1"},{...r,id:"node-2",data:{...r.data,variant:"purple"}},{...r,id:"node-3",data:{...r.data,variant:"red"}}]],[p,["node-1","node-2","node-3"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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

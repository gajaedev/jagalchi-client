import{j as e}from"./jsx-runtime-BjVM7qWw.js";import{E as x}from"./index-BgRZVlos.js";import{e as y,s as S,n as l,a as p}from"./editor-atoms-BYr9mIvv.js";import{P as t}from"./react-BztdCoQ5.js";import{u as j}from"./utils-CXRwwdCE.js";import"./iframe-CIyXAdiT.js";import"./preload-helper-PPVm8Dsz.js";import"./messages-2lV3EpJ0.js";import"./index-CCYaMMZe.js";import"./ai-BzegObj1.js";import"./client-Cz9CAgRE.js";import"./index-DyZtHqhw.js";import"./button-DAmsI4E5.js";import"./index-CmVf-IGw.js";import"./index-CMGjT5pJ.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./index-C1QnK0Dc.js";import"./dialog-Bddq7ueP.js";import"./index-CeYrrukA.js";import"./index-BMo2qGt1.js";import"./index-CAw_91Kc.js";import"./index-DeRex8Nr.js";import"./createLucideIcon-C0H-ZbX6.js";import"./scroll-area-DQmsAh0w.js";import"./index-DBbwl_op.js";import"./PanelHeader-BgXSVJxP.js";import"./index-B3Jha_DC.js";import"./index-CsQH0RVp.js";import"./index-CpJnA1Ng.js";import"./label-DltIOTSK.js";import"./index-BcP3U1GI.js";import"./index-D6KSG6d0.js";import"./index-DZt5weXD.js";import"./index-CoFNDOVk.js";import"./index-RGw0PwQF.js";import"./index-3j_HBAam.js";import"./index-CwihUKhn.js";import"./index-DL95m8O3.js";import"./index-37NjwinT.js";import"./index-CeGMdkZr.js";import"./input-NRekzE0G.js";import"./textarea-Dlvslkn6.js";function s({initialValues:o,children:u}){return j(new Map(o)),u}const me={title:"Features/RoadmapEditor/Organisms/EditorSidebar",component:x,parameters:{layout:"fullscreen"},tags:["autodocs"]},r={id:"Node_1",type:"jagalchi-node",position:{x:0,y:0},data:{label:"프론트엔드 기초",description:"HTML, CSS, JavaScript의 기본 개념을 학습합니다.",variant:"blue",isLocked:!1,resources:["https://developer.mozilla.org/ko/docs/Learn","",""]}},v={id:"Section_1",type:"jagalchi-section",position:{x:0,y:0},data:{title:"기초 단계",variant:"blue",isLocked:!1}},f={id:"Text_1",type:"jagalchi-text",position:{x:0,y:0},data:{content:"학습 목표",variant:"black",fontSize:16,fontWeight:"normal",isLocked:!1}},h={id:"Line_1",source:"node-1",target:"node-2",style:{stroke:"#000000"}},d={decorators:[o=>e.jsx(t,{children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})]},i={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[r]],[p,["Node_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},a={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[y,[h]],[S,["Line_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},c={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[v]],[p,["Section_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},n={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[f]],[p,["Text_1"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]},m={decorators:[o=>e.jsx(t,{children:e.jsx(s,{initialValues:[[l,[{...r,id:"node-1"},{...r,id:"node-2",data:{...r.data,variant:"purple"}},{...r,id:"node-3",data:{...r.data,variant:"red"}}]],[p,["node-1","node-2","node-3"]]],children:e.jsx("div",{className:"flex h-screen justify-end",children:e.jsx(o,{})})})})]};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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

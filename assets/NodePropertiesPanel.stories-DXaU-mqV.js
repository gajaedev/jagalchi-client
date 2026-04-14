import{j as r}from"./jsx-runtime-DS3vGEaA.js";import{N as p}from"./index-DIetv4gE.js";import{P as c}from"./react-B5_PeFK-.js";import"./iframe-DUIjR8l5.js";import"./preload-helper-PPVm8Dsz.js";import"./ai-C8ZHTdJz.js";import"./client-BjQWkfsy.js";import"./messages-2lV3EpJ0.js";import"./index-CNsjzG58.js";import"./button-CHV-fKdO.js";import"./index-bQWBMVpa.js";import"./index-C1vqEDLX.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./index-D5_fNEnf.js";import"./dialog-CnlfZtOl.js";import"./index-DWrn5795.js";import"./index-DU8jOZp7.js";import"./index-C0AEmL5N.js";import"./index-BPt0Nb1y.js";import"./createLucideIcon-Dj8KJSml.js";import"./scroll-area-DX-aoOgO.js";import"./index-CnfPYznc.js";import"./PanelHeader-BgJD3__K.js";import"./editor-atoms-D_Sf6SSH.js";import"./index-ByZtaHZn.js";import"./index-ByAmDpUo.js";import"./index-DtCaPLXR.js";import"./label-CS6ksBIQ.js";import"./index-CmaCD02I.js";const J={title:"Features/RoadmapEditor/Organisms/NodePropertiesPanel",component:p,parameters:{layout:"fullscreen"},tags:["autodocs"],decorators:[i=>r.jsx(c,{children:r.jsx("div",{className:"flex h-screen justify-end",children:r.jsx("aside",{className:"h-full w-[272px] border-l bg-white",children:r.jsx(i,{})})})})]},e={id:"Node_1",type:"jagalchi-node",position:{x:0,y:0},data:{label:"프론트엔드 기초",description:"HTML, CSS, JavaScript의 기본 개념을 학습합니다.",variant:"blue",isLocked:!1,resources:["https://developer.mozilla.org/ko/docs/Learn","https://javascript.info/",""]}},a={args:{node:e}},o={args:{node:{...e,data:{...e.data,isLocked:!0}}}},t={args:{node:{id:"Node_2",type:"jagalchi-node",position:{x:0,y:0},data:{label:"",description:"",variant:"white",isLocked:!1,resources:["","",""]}}}},s={args:{node:{...e,id:"Node_3",data:{...e.data,label:"매우 긴 노드 이름입니다 - 이것은 텍스트가 길어질 때 어떻게 보이는지 테스트합니다",description:"이것은 매우 긴 설명입니다. 로드맵에서 노드의 설명이 여러 줄에 걸쳐 표시될 때 UI가 올바르게 동작하는지 확인하기 위한 테스트입니다. 실제 사용 시에는 학습 목표, 주요 개념, 선수 지식 등 다양한 정보가 포함될 수 있습니다.",resources:["https://very-long-url-example.com/documentation/getting-started/introduction","https://another-long-url.com/tutorials/advanced/deep-dive","https://third-resource.com/guides/best-practices"]}}}},n={args:{node:{...e,id:"Node_4",data:{...e.data,variant:"purple"}}}},d={args:{node:{...e,id:"Node_5",data:{...e.data,variant:"red"}}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    node: baseNode
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseNode,
      data: {
        ...baseNode.data,
        isLocked: true
      }
    }
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      id: 'Node_2',
      type: 'jagalchi-node',
      position: {
        x: 0,
        y: 0
      },
      data: {
        label: '',
        description: '',
        variant: 'white',
        isLocked: false,
        resources: ['', '', '']
      }
    }
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseNode,
      id: 'Node_3',
      data: {
        ...baseNode.data,
        label: '매우 긴 노드 이름입니다 - 이것은 텍스트가 길어질 때 어떻게 보이는지 테스트합니다',
        description: '이것은 매우 긴 설명입니다. 로드맵에서 노드의 설명이 여러 줄에 걸쳐 표시될 때 UI가 올바르게 동작하는지 확인하기 위한 테스트입니다. 실제 사용 시에는 학습 목표, 주요 개념, 선수 지식 등 다양한 정보가 포함될 수 있습니다.',
        resources: ['https://very-long-url-example.com/documentation/getting-started/introduction', 'https://another-long-url.com/tutorials/advanced/deep-dive', 'https://third-resource.com/guides/best-practices']
      }
    }
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseNode,
      id: 'Node_4',
      data: {
        ...baseNode.data,
        variant: 'purple'
      }
    }
  }
}`,...n.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseNode,
      id: 'Node_5',
      data: {
        ...baseNode.data,
        variant: 'red'
      }
    }
  }
}`,...d.parameters?.docs?.source}}};const M=["Default","Locked","Empty","WithLongContent","PurpleVariant","RedVariant"];export{a as Default,t as Empty,o as Locked,n as PurpleVariant,d as RedVariant,s as WithLongContent,M as __namedExportsOrder,J as default};

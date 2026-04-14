import{j as r}from"./jsx-runtime-DQ6mrSjD.js";import{N as p}from"./index-Cn5EuywC.js";import{P as c}from"./react-D1r6gUkt.js";import"./iframe-CDDQQDDz.js";import"./preload-helper-PPVm8Dsz.js";import"./ai-DJAYoVaH.js";import"./messages-2lV3EpJ0.js";import"./index-DJsAl42S.js";import"./button-DAB1FM_i.js";import"./index-DF6K5niN.js";import"./index-BuQRkUE6.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./index-B0_fyDj9.js";import"./dialog-8LE0_Kf1.js";import"./index-BF4Uu0gP.js";import"./index-BSEdYhTq.js";import"./index-CTQC2q4g.js";import"./index-DAqvnybX.js";import"./createLucideIcon-Bj2w0-a8.js";import"./scroll-area-DVFNMvaC.js";import"./index-CkoqJBtw.js";import"./PanelHeader-BbgXd0eW.js";import"./editor-atoms-uGG4HT4Q.js";import"./index-BmjKuiaU.js";import"./index-DTpL9dRg.js";import"./index-B-2544Df.js";import"./label-BdMHkLmj.js";import"./index-JgoVrCiZ.js";const H={title:"Features/RoadmapEditor/Organisms/NodePropertiesPanel",component:p,parameters:{layout:"fullscreen"},tags:["autodocs"],decorators:[i=>r.jsx(c,{children:r.jsx("div",{className:"flex h-screen justify-end",children:r.jsx("aside",{className:"h-full w-[272px] border-l bg-white",children:r.jsx(i,{})})})})]},e={id:"Node_1",type:"jagalchi-node",position:{x:0,y:0},data:{label:"프론트엔드 기초",description:"HTML, CSS, JavaScript의 기본 개념을 학습합니다.",variant:"blue",isLocked:!1,resources:["https://developer.mozilla.org/ko/docs/Learn","https://javascript.info/",""]}},a={args:{node:e}},o={args:{node:{...e,data:{...e.data,isLocked:!0}}}},t={args:{node:{id:"Node_2",type:"jagalchi-node",position:{x:0,y:0},data:{label:"",description:"",variant:"white",isLocked:!1,resources:["","",""]}}}},s={args:{node:{...e,id:"Node_3",data:{...e.data,label:"매우 긴 노드 이름입니다 - 이것은 텍스트가 길어질 때 어떻게 보이는지 테스트합니다",description:"이것은 매우 긴 설명입니다. 로드맵에서 노드의 설명이 여러 줄에 걸쳐 표시될 때 UI가 올바르게 동작하는지 확인하기 위한 테스트입니다. 실제 사용 시에는 학습 목표, 주요 개념, 선수 지식 등 다양한 정보가 포함될 수 있습니다.",resources:["https://very-long-url-example.com/documentation/getting-started/introduction","https://another-long-url.com/tutorials/advanced/deep-dive","https://third-resource.com/guides/best-practices"]}}}},n={args:{node:{...e,id:"Node_4",data:{...e.data,variant:"purple"}}}},d={args:{node:{...e,id:"Node_5",data:{...e.data,variant:"red"}}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};const J=["Default","Locked","Empty","WithLongContent","PurpleVariant","RedVariant"];export{a as Default,t as Empty,o as Locked,n as PurpleVariant,d as RedVariant,s as WithLongContent,J as __namedExportsOrder,H as default};

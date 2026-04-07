import{j as a}from"./jsx-runtime-D7LjZs6k.js";import{T as x}from"./index-B8nEkgoa.js";import{P as u}from"./react-CqnLPfOG.js";import"./iframe-CeITVqGo.js";import"./preload-helper-PPVm8Dsz.js";import"./messages-Bkfb5xdm.js";import"./PanelHeader-Br5nZAHM.js";import"./editor-atoms-C2n83qnc.js";import"./createLucideIcon-DHwdAl23.js";import"./index-DzKPTPlT.js";import"./index-DHbDWMD5.js";import"./utils-BQHNewu7.js";import"./index-BiCEIWgA.js";import"./label-CBeUyo8t.js";import"./index-DBAtmxYZ.js";import"./index-Bfaq3Acm.js";import"./index-6_ti19K7.js";import"./index-D-0qgbgt.js";const z={title:"Features/RoadmapEditor/Organisms/TextPropertiesPanel",component:x,parameters:{layout:"fullscreen"},tags:["autodocs"],decorators:[m=>a.jsx(u,{children:a.jsx("div",{className:"flex h-screen justify-end",children:a.jsx("aside",{className:"h-full w-[272px] border-l bg-white",children:a.jsx(m,{})})})})]},e={id:"Text_1",type:"jagalchi-text",position:{x:0,y:0},data:{content:"학습 목표",variant:"black",fontSize:16,fontWeight:"normal",isLocked:!1}},t={args:{node:e}},n={args:{node:{...e,data:{...e.data,isLocked:!0}}}},r={args:{node:{id:"Text_2",type:"jagalchi-text",position:{x:0,y:0},data:{content:"",variant:"white",fontSize:16,fontWeight:"normal",isLocked:!1}}}},o={args:{node:{...e,id:"Text_3",data:{...e.data,content:"이것은 매우 긴 텍스트 내용입니다. 로드맵에서 텍스트 노드가 여러 줄에 걸쳐 표시될 때 UI가 올바르게 동작하는지 확인하기 위한 테스트입니다. 실제 사용 시에는 학습 가이드, 주의사항, 팁 등 다양한 정보가 포함될 수 있습니다."}}}},s={args:{node:{...e,id:"Text_4",data:{...e.data,content:"중요 알림",variant:"blue"}}}},d={args:{node:{...e,id:"Text_5",data:{...e.data,content:"추가 정보",variant:"purple"}}}},c={args:{node:{...e,id:"Text_6",data:{...e.data,content:"경고",variant:"red"}}}},i={args:{node:{...e,id:"Text_7",data:{...e.data,content:"권장사항",variant:"orange"}}}},p={args:{node:{...e,id:"Text_8",data:{...e.data,content:"참고",variant:"white"}}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    node: baseText
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseText,
      data: {
        ...baseText.data,
        isLocked: true
      }
    }
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      id: 'Text_2',
      type: 'jagalchi-text',
      position: {
        x: 0,
        y: 0
      },
      data: {
        content: '',
        variant: 'white',
        fontSize: 16,
        fontWeight: 'normal',
        isLocked: false
      }
    }
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseText,
      id: 'Text_3',
      data: {
        ...baseText.data,
        content: '이것은 매우 긴 텍스트 내용입니다. 로드맵에서 텍스트 노드가 여러 줄에 걸쳐 표시될 때 UI가 올바르게 동작하는지 확인하기 위한 테스트입니다. 실제 사용 시에는 학습 가이드, 주의사항, 팁 등 다양한 정보가 포함될 수 있습니다.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseText,
      id: 'Text_4',
      data: {
        ...baseText.data,
        content: '중요 알림',
        variant: 'blue'
      }
    }
  }
}`,...s.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseText,
      id: 'Text_5',
      data: {
        ...baseText.data,
        content: '추가 정보',
        variant: 'purple'
      }
    }
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseText,
      id: 'Text_6',
      data: {
        ...baseText.data,
        content: '경고',
        variant: 'red'
      }
    }
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseText,
      id: 'Text_7',
      data: {
        ...baseText.data,
        content: '권장사항',
        variant: 'orange'
      }
    }
  }
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseText,
      id: 'Text_8',
      data: {
        ...baseText.data,
        content: '참고',
        variant: 'white'
      }
    }
  }
}`,...p.parameters?.docs?.source}}};const W=["Default","Locked","Empty","LongContent","BlueText","PurpleText","RedText","OrangeText","GrayText"];export{s as BlueText,t as Default,r as Empty,p as GrayText,n as Locked,o as LongContent,i as OrangeText,d as PurpleText,c as RedText,W as __namedExportsOrder,z as default};

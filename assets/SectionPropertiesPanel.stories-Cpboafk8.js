import{j as a}from"./jsx-runtime-D0ZP9ShM.js";import{S as p}from"./index-BDGuZ7pJ.js";import{P as m}from"./react-YYGR1x1a.js";import"./iframe-Dc48HFqB.js";import"./preload-helper-PPVm8Dsz.js";import"./messages-2lV3EpJ0.js";import"./PanelHeader-BsiRIRsS.js";import"./editor-atoms-X1xpa2Ov.js";import"./createLucideIcon-BpyJ6sFd.js";import"./index-CNNipX8U.js";import"./index-Cw9Hy5xH.js";import"./utils-BQHNewu7.js";import"./index-DXo2aFBl.js";import"./label-DLmDwqpG.js";import"./index-BtLnkEmy.js";import"./index-B7GPapSz.js";import"./index-B5OcGX6w.js";import"./index-TBSC8cfB.js";const O={title:"Features/RoadmapEditor/Organisms/SectionPropertiesPanel",component:p,parameters:{layout:"fullscreen"},tags:["autodocs"],decorators:[d=>a.jsx(m,{children:a.jsx("div",{className:"flex h-screen justify-end",children:a.jsx("aside",{className:"h-full w-[272px] border-l bg-white",children:a.jsx(d,{})})})})]},e={id:"Section_1",type:"jagalchi-section",position:{x:0,y:0},data:{title:"기초 단계",variant:"blue",isLocked:!1}},t={args:{node:e}},n={args:{node:{...e,data:{...e.data,isLocked:!0}}}},r={args:{node:{id:"Section_2",type:"jagalchi-section",position:{x:0,y:0},data:{title:"",variant:"white",isLocked:!1}}}},o={args:{node:{...e,id:"Section_3",data:{...e.data,title:"매우 긴 섹션 이름입니다 - 이것은 텍스트가 길어질 때 어떻게 보이는지 테스트합니다"}}}},s={args:{node:{...e,id:"Section_4",data:{...e.data,title:"중급 단계",variant:"purple"}}}},i={args:{node:{...e,id:"Section_5",data:{...e.data,title:"고급 단계",variant:"red"}}}},c={args:{node:{...e,id:"Section_6",data:{...e.data,title:"실전 프로젝트",variant:"orange"}}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    node: baseSection
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseSection,
      data: {
        ...baseSection.data,
        isLocked: true
      }
    }
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      id: 'Section_2',
      type: 'jagalchi-section',
      position: {
        x: 0,
        y: 0
      },
      data: {
        title: '',
        variant: 'white',
        isLocked: false
      }
    }
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseSection,
      id: 'Section_3',
      data: {
        ...baseSection.data,
        title: '매우 긴 섹션 이름입니다 - 이것은 텍스트가 길어질 때 어떻게 보이는지 테스트합니다'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseSection,
      id: 'Section_4',
      data: {
        ...baseSection.data,
        title: '중급 단계',
        variant: 'purple'
      }
    }
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseSection,
      id: 'Section_5',
      data: {
        ...baseSection.data,
        title: '고급 단계',
        variant: 'red'
      }
    }
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    node: {
      ...baseSection,
      id: 'Section_6',
      data: {
        ...baseSection.data,
        title: '실전 프로젝트',
        variant: 'orange'
      }
    }
  }
}`,...c.parameters?.docs?.source}}};const R=["Default","Locked","Empty","LongTitle","PurpleVariant","RedVariant","OrangeVariant"];export{t as Default,r as Empty,n as Locked,o as LongTitle,c as OrangeVariant,s as PurpleVariant,i as RedVariant,R as __namedExportsOrder,O as default};

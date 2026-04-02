import{j as e}from"./jsx-runtime-BxTxgAnk.js";import{T as a,a as l}from"./index-2KJ70QZf.js";import{c as n}from"./createLucideIcon-D4m3DB8i.js";import"./iframe-mBgrSWE4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BWrnska7.js";import"./index-BwYYCGYG.js";import"./index-CbRnTI1G.js";import"./index-CWDPbi-G.js";import"./index-DfeKziRQ.js";import"./utils-BQHNewu7.js";const p=[["path",{d:"M12.586 12.586 19 19",key:"ea5xo7"}],["path",{d:"M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z",key:"277e5u"}]],t=n("mouse-pointer",p);const u=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],d=n("square",u),T={title:"Editor/Atoms/ToolbarButton",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{icon:e.jsx(t,{size:20}),label:"선택",isActive:!1,onClick:()=>console.log("Select clicked")}},s={args:{icon:e.jsx(t,{size:20}),label:"선택",isActive:!0,onClick:()=>console.log("Select clicked")}},c={args:{icon:e.jsx(d,{size:20}),label:"노드",isActive:!1,onClick:()=>console.log("Node clicked")}},r={args:{icon:e.jsx(l,{size:20}),label:"텍스트",isActive:!1,onClick:()=>console.log("Text clicked")}},i={args:{icon:e.jsx(t,{size:20}),label:"선택",isActive:!0,onClick:()=>{}},render:()=>e.jsxs("div",{className:"flex gap-1 rounded-lg border border-slate-200 bg-white p-2",children:[e.jsx(a,{icon:e.jsx(t,{size:20}),label:"선택",isActive:!0,onClick:()=>{}}),e.jsx(a,{icon:e.jsx(d,{size:20}),label:"노드",isActive:!1,onClick:()=>{}}),e.jsx(a,{icon:e.jsx(l,{size:20}),label:"텍스트",isActive:!1,onClick:()=>{}})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    icon: <MousePointer size={20} />,
    label: '선택',
    isActive: false,
    onClick: () => console.log('Select clicked')
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    icon: <MousePointer size={20} />,
    label: '선택',
    isActive: true,
    onClick: () => console.log('Select clicked')
  }
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    icon: <Square size={20} />,
    label: '노드',
    isActive: false,
    onClick: () => console.log('Node clicked')
  }
}`,...c.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    icon: <Type size={20} />,
    label: '텍스트',
    isActive: false,
    onClick: () => console.log('Text clicked')
  }
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    icon: <MousePointer size={20} />,
    label: '선택',
    isActive: true,
    onClick: () => {}
  },
  render: () => <div className="flex gap-1 rounded-lg border border-slate-200 bg-white p-2">
      <ToolbarButton icon={<MousePointer size={20} />} label="선택" isActive onClick={() => {}} />
      <ToolbarButton icon={<Square size={20} />} label="노드" isActive={false} onClick={() => {}} />
      <ToolbarButton icon={<Type size={20} />} label="텍스트" isActive={false} onClick={() => {}} />
    </div>
}`,...i.parameters?.docs?.source}}};const j=["Select","SelectActive","Node","Text","ToolbarGroup"];export{c as Node,o as Select,s as SelectActive,r as Text,i as ToolbarGroup,j as __namedExportsOrder,T as default};

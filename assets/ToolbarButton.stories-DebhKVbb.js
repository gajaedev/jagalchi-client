import{h as e}from"./iframe-B5Kp-Gqb.js";import{t}from"./createLucideIcon-BtQzXBld.js";import{s as n,t as r}from"./ToolbarButton-dgZmtqms.js";var i=t(`mouse-pointer`,[[`path`,{d:`M12.586 12.586 19 19`,key:`ea5xo7`}],[`path`,{d:`M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z`,key:`277e5u`}]]),a=t(`square`,[[`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`,key:`afitv7`}]]),o=e(),s={title:`Editor/Atoms/ToolbarButton`,component:r,parameters:{layout:`centered`},tags:[`autodocs`]},c={args:{icon:(0,o.jsx)(i,{size:20}),label:`선택`,isActive:!1,onClick:()=>console.log(`Select clicked`)}},l={args:{icon:(0,o.jsx)(i,{size:20}),label:`선택`,isActive:!0,onClick:()=>console.log(`Select clicked`)}},u={args:{icon:(0,o.jsx)(a,{size:20}),label:`노드`,isActive:!1,onClick:()=>console.log(`Node clicked`)}},d={args:{icon:(0,o.jsx)(n,{size:20}),label:`텍스트`,isActive:!1,onClick:()=>console.log(`Text clicked`)}},f={args:{icon:(0,o.jsx)(i,{size:20}),label:`선택`,isActive:!0,onClick:()=>{}},render:()=>(0,o.jsxs)(`div`,{className:`flex gap-1 rounded-lg border border-slate-200 bg-white p-2`,children:[(0,o.jsx)(r,{icon:(0,o.jsx)(i,{size:20}),label:`선택`,isActive:!0,onClick:()=>{}}),(0,o.jsx)(r,{icon:(0,o.jsx)(a,{size:20}),label:`노드`,isActive:!1,onClick:()=>{}}),(0,o.jsx)(r,{icon:(0,o.jsx)(n,{size:20}),label:`텍스트`,isActive:!1,onClick:()=>{}})]})};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    icon: <MousePointer size={20} />,
    label: '선택',
    isActive: false,
    onClick: () => console.log('Select clicked')
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    icon: <MousePointer size={20} />,
    label: '선택',
    isActive: true,
    onClick: () => console.log('Select clicked')
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    icon: <Square size={20} />,
    label: '노드',
    isActive: false,
    onClick: () => console.log('Node clicked')
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    icon: <Type size={20} />,
    label: '텍스트',
    isActive: false,
    onClick: () => console.log('Text clicked')
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}};var p=[`Select`,`SelectActive`,`Node`,`Text`,`ToolbarGroup`];export{u as Node,c as Select,l as SelectActive,d as Text,f as ToolbarGroup,p as __namedExportsOrder,s as default};
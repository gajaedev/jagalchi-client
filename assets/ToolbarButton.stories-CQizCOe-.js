import{n as e}from"./chunk-BEldbCjX.js";import{C as t}from"./iframe-yKZ6rMeT.js";import{a as n,l as r,t as i,y as a}from"./lucide-react-DZFFHPCk.js";import{n as o,t as s}from"./ToolbarButton-OGajauLh.js";var c,l,u,d,f,p,m,h;e((()=>{c=t(),i(),o(),l={title:`Editor/Atoms/ToolbarButton`,component:s,parameters:{layout:`centered`},tags:[`autodocs`]},u={args:{icon:(0,c.jsx)(a,{size:20}),label:`선택`,isActive:!1,onClick:()=>console.log(`Select clicked`)}},d={args:{icon:(0,c.jsx)(a,{size:20}),label:`선택`,isActive:!0,onClick:()=>console.log(`Select clicked`)}},f={args:{icon:(0,c.jsx)(r,{size:20}),label:`노드`,isActive:!1,onClick:()=>console.log(`Node clicked`)}},p={args:{icon:(0,c.jsx)(n,{size:20}),label:`텍스트`,isActive:!1,onClick:()=>console.log(`Text clicked`)}},m={args:{icon:(0,c.jsx)(a,{size:20}),label:`선택`,isActive:!0,onClick:()=>{}},render:()=>(0,c.jsxs)(`div`,{className:`flex gap-1 rounded-lg border border-slate-200 bg-white p-2`,children:[(0,c.jsx)(s,{icon:(0,c.jsx)(a,{size:20}),label:`선택`,isActive:!0,onClick:()=>{}}),(0,c.jsx)(s,{icon:(0,c.jsx)(r,{size:20}),label:`노드`,isActive:!1,onClick:()=>{}}),(0,c.jsx)(s,{icon:(0,c.jsx)(n,{size:20}),label:`텍스트`,isActive:!1,onClick:()=>{}})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    icon: <MousePointer size={20} />,
    label: '선택',
    isActive: false,
    onClick: () => console.log('Select clicked')
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    icon: <MousePointer size={20} />,
    label: '선택',
    isActive: true,
    onClick: () => console.log('Select clicked')
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    icon: <Square size={20} />,
    label: '노드',
    isActive: false,
    onClick: () => console.log('Node clicked')
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    icon: <Type size={20} />,
    label: '텍스트',
    isActive: false,
    onClick: () => console.log('Text clicked')
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}},h=[`Select`,`SelectActive`,`Node`,`Text`,`ToolbarGroup`]}))();export{f as Node,u as Select,d as SelectActive,p as Text,m as ToolbarGroup,h as __namedExportsOrder,l as default};
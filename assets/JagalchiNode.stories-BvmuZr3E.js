import{h as e}from"./iframe-jT_-kCp0.js";import{i as t,s as n}from"./esm-Ef2sZ48z.js";import{t as r}from"./react-CrgLIR-9.js";import{t as i}from"./JagalchiNode-6WCF07uF.js";var a=e(),o={title:`Roadmap-Editor/Molecules/JagalchiNode`,component:i,parameters:{layout:`centered`},tags:[`autodocs`],decorators:[(e,o)=>{let{args:s}=o;return(0,a.jsx)(r,{children:(0,a.jsx)(t,{children:(0,a.jsx)(`div`,{style:{width:`400px`,height:`200px`},children:(0,a.jsx)(n,{nodes:[{id:`node-1`,type:`jagalchiNode`,position:{x:0,y:0},data:s.data}],nodeTypes:{jagalchiNode:e=>(0,a.jsx)(i,{...e,selected:s.selected??!1})},fitView:!0})})})})}]},s={label:`Sample Node`,description:`This is a sample node`,variant:`white`,resources:[],isLocked:!1},c={args:{id:`node-1`,data:s,selected:!1}},l={args:{id:`node-2`,data:{...s,label:`Blue Node`,variant:`blue`},selected:!1}},u={args:{id:`node-3`,data:{...s,label:`Purple Node`,variant:`purple`},selected:!1}},d={args:{id:`node-4`,data:{...s,label:`Red Node`,variant:`red`},selected:!1}},f={args:{id:`node-5`,data:{...s,label:`Orange Node`,variant:`orange`},selected:!1}},p={args:{id:`node-6`,data:{...s,label:`Black Node`,variant:`black`},selected:!1}},m={args:{id:`node-7`,data:{...s,label:`Selected Node`},selected:!0}},h={args:{id:`node-8`,data:{...s,label:`Very Long Node Label That Should Be Truncated`},selected:!1}},g={args:{id:`node-9`,data:{...s,label:`Locked Node`,isLocked:!0},selected:!1}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-1',
    data: defaultData,
    selected: false
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-2',
    data: {
      ...defaultData,
      label: 'Blue Node',
      variant: 'blue'
    },
    selected: false
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-3',
    data: {
      ...defaultData,
      label: 'Purple Node',
      variant: 'purple'
    },
    selected: false
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-4',
    data: {
      ...defaultData,
      label: 'Red Node',
      variant: 'red'
    },
    selected: false
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-5',
    data: {
      ...defaultData,
      label: 'Orange Node',
      variant: 'orange'
    },
    selected: false
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-6',
    data: {
      ...defaultData,
      label: 'Black Node',
      variant: 'black'
    },
    selected: false
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-7',
    data: {
      ...defaultData,
      label: 'Selected Node'
    },
    selected: true
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-8',
    data: {
      ...defaultData,
      label: 'Very Long Node Label That Should Be Truncated'
    },
    selected: false
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-9',
    data: {
      ...defaultData,
      label: 'Locked Node',
      isLocked: true
    },
    selected: false
  }
}`,...g.parameters?.docs?.source}}};var _=[`White`,`Blue`,`Purple`,`Red`,`Orange`,`Black`,`Selected`,`LongLabel`,`Locked`];export{p as Black,l as Blue,g as Locked,h as LongLabel,f as Orange,u as Purple,d as Red,m as Selected,c as White,_ as __namedExportsOrder,o as default};
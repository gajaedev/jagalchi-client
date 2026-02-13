import{j as a}from"./jsx-runtime-DdmxcLET.js";import{R as b,i as N}from"./index-bG9o3_EY.js";import{J as m}from"./index-B-RuOhAo.js";import{P as h}from"./react-DslAc1VT.js";import"./iframe-BmpoGx1R.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CzBaN5My.js";import"./index-g0L6Z6Rh.js";import"./index-DwDeJz6h.js";import"./index-LTsCejL_.js";import"./index-Crf-Vw0Z.js";import"./utils-CDN07tui.js";import"./index-BCh0MxMJ.js";import"./index-x1k0dM5P.js";import"./index-DszGFuiY.js";import"./label-B0WXvur6.js";import"./index-CgxCSjj6.js";import"./index-ChgYa-84.js";import"./index-Dv9gSYyR.js";import"./index-Cg9ymrs1.js";import"./button-DjrUds_s.js";import"./index-B_jtOnfb.js";import"./index-BkaLuOda.js";import"./createLucideIcon-CRWMFQV_.js";import"./index-CrlUwogJ.js";import"./index-C7gse5mp.js";import"./index-CwnMz2et.js";import"./index-BISvjkvE.js";import"./node-colors-CF7U7wL7.js";import"./editor-atoms-WBMYccng.js";import"./node-factory-HJuXkfLy.js";import"./messages-DkLYveTE.js";const Z={title:"Roadmap-Editor/Molecules/JagalchiNode",component:m,parameters:{layout:"centered"},tags:["autodocs"],decorators:[(S,u)=>{const{args:p}=u,g=[{id:"node-1",type:"jagalchiNode",position:{x:0,y:0},data:p.data}];return a.jsx(h,{children:a.jsx(b,{children:a.jsx("div",{style:{width:"400px",height:"200px"},children:a.jsx(N,{nodes:g,nodeTypes:{jagalchiNode:f=>a.jsx(m,{...f,selected:p.selected??!1})},fitView:!0})})})})}]},e={label:"Sample Node",description:"This is a sample node",variant:"white",resources:[],isLocked:!1},r={args:{id:"node-1",data:e,selected:!1}},t={args:{id:"node-2",data:{...e,label:"Blue Node",variant:"blue"},selected:!1}},o={args:{id:"node-3",data:{...e,label:"Purple Node",variant:"purple"},selected:!1}},s={args:{id:"node-4",data:{...e,label:"Red Node",variant:"red"},selected:!1}},d={args:{id:"node-5",data:{...e,label:"Orange Node",variant:"orange"},selected:!1}},n={args:{id:"node-6",data:{...e,label:"Black Node",variant:"black"},selected:!1}},l={args:{id:"node-7",data:{...e,label:"Selected Node"},selected:!0}},c={args:{id:"node-8",data:{...e,label:"Very Long Node Label That Should Be Truncated"},selected:!1}},i={args:{id:"node-9",data:{...e,label:"Locked Node",isLocked:!0},selected:!1}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-1',
    data: defaultData,
    selected: false
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-2',
    data: {
      ...defaultData,
      label: 'Blue Node',
      variant: 'blue'
    },
    selected: false
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-3',
    data: {
      ...defaultData,
      label: 'Purple Node',
      variant: 'purple'
    },
    selected: false
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-4',
    data: {
      ...defaultData,
      label: 'Red Node',
      variant: 'red'
    },
    selected: false
  }
}`,...s.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-5',
    data: {
      ...defaultData,
      label: 'Orange Node',
      variant: 'orange'
    },
    selected: false
  }
}`,...d.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-6',
    data: {
      ...defaultData,
      label: 'Black Node',
      variant: 'black'
    },
    selected: false
  }
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-7',
    data: {
      ...defaultData,
      label: 'Selected Node'
    },
    selected: true
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-8',
    data: {
      ...defaultData,
      label: 'Very Long Node Label That Should Be Truncated'
    },
    selected: false
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-9',
    data: {
      ...defaultData,
      label: 'Locked Node',
      isLocked: true
    },
    selected: false
  }
}`,...i.parameters?.docs?.source}}};const $=["White","Blue","Purple","Red","Orange","Black","Selected","LongLabel","Locked"];export{n as Black,t as Blue,i as Locked,c as LongLabel,d as Orange,o as Purple,s as Red,l as Selected,r as White,$ as __namedExportsOrder,Z as default};

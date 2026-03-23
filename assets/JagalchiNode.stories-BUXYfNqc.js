import{j as a}from"./jsx-runtime-BBR6ms_g.js";import{R as b,i as N}from"./index-DRRP8GG2.js";import{J as u}from"./index-D7GQ0VH0.js";import{P as h}from"./react-DAKf4R_E.js";import"./iframe-Fx57lQSV.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CrkxoCl0.js";import"./index-ZOKbkZfw.js";import"./index-BlBtciZ0.js";import"./node-colors-qExhWIBq.js";import"./utils-CDN07tui.js";import"./editor-atoms-AJ4HKDD7.js";import"./node-factory-CQS32woI.js";import"./messages-tw_n8aWb.js";import"./index-Dl6EJsjj.js";import"./createLucideIcon-DQ-B4vTp.js";const W={title:"Roadmap-Editor/Molecules/JagalchiNode",component:u,parameters:{layout:"centered"},tags:["autodocs"],decorators:[(S,m)=>{const{args:p}=m,g=[{id:"node-1",type:"jagalchiNode",position:{x:0,y:0},data:p.data}];return a.jsx(h,{children:a.jsx(b,{children:a.jsx("div",{style:{width:"400px",height:"200px"},children:a.jsx(N,{nodes:g,nodeTypes:{jagalchiNode:f=>a.jsx(u,{...f,selected:p.selected??!1})},fitView:!0})})})})}]},e={label:"Sample Node",description:"This is a sample node",variant:"white",resources:[],isLocked:!1},r={args:{id:"node-1",data:e,selected:!1}},s={args:{id:"node-2",data:{...e,label:"Blue Node",variant:"blue"},selected:!1}},t={args:{id:"node-3",data:{...e,label:"Purple Node",variant:"purple"},selected:!1}},d={args:{id:"node-4",data:{...e,label:"Red Node",variant:"red"},selected:!1}},o={args:{id:"node-5",data:{...e,label:"Orange Node",variant:"orange"},selected:!1}},n={args:{id:"node-6",data:{...e,label:"Black Node",variant:"black"},selected:!1}},l={args:{id:"node-7",data:{...e,label:"Selected Node"},selected:!0}},c={args:{id:"node-8",data:{...e,label:"Very Long Node Label That Should Be Truncated"},selected:!1}},i={args:{id:"node-9",data:{...e,label:"Locked Node",isLocked:!0},selected:!1}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-1',
    data: defaultData,
    selected: false
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-2',
    data: {
      ...defaultData,
      label: 'Blue Node',
      variant: 'blue'
    },
    selected: false
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-3',
    data: {
      ...defaultData,
      label: 'Purple Node',
      variant: 'purple'
    },
    selected: false
  }
}`,...t.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-4',
    data: {
      ...defaultData,
      label: 'Red Node',
      variant: 'red'
    },
    selected: false
  }
}`,...d.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'node-5',
    data: {
      ...defaultData,
      label: 'Orange Node',
      variant: 'orange'
    },
    selected: false
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};const _=["White","Blue","Purple","Red","Orange","Black","Selected","LongLabel","Locked"];export{n as Black,s as Blue,i as Locked,c as LongLabel,o as Orange,t as Purple,d as Red,l as Selected,r as White,_ as __namedExportsOrder,W as default};

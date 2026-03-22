import{j as e}from"./jsx-runtime-D3OVLXPq.js";import{r as a}from"./iframe-BJu3r5RO.js";import{B as p}from"./button-Cmpwa8eV.js";import{R as n}from"./index-C6IOvDgV.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BsL2QRss.js";import"./index-D2DTSZqx.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-BvKwLA4m.js";import"./index-CpM8M1_U.js";import"./index-BONt3i4I.js";import"./index-BARZCLoR.js";import"./index-CzUYsmLo.js";import"./createLucideIcon-9Ii3YprA.js";import"./messages-tw_n8aWb.js";import"./index-BttwpheB.js";import"./textarea-HJV5WPtq.js";import"./index-pqxrrDwD.js";import"./index-DnBxYRlM.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    onClose: () => {},
    mode: 'generate'
  },
  render: () => <GenerateModeWrapper />
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    onClose: () => {},
    mode: 'modify'
  },
  render: () => <ModifyModeWrapper />
}`,...s.parameters?.docs?.source}}};const F=["GenerateMode","ModifyMode"];export{o as GenerateMode,s as ModifyMode,F as __namedExportsOrder,B as default};

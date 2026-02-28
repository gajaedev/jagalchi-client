import{j as e}from"./jsx-runtime-M55VZtkB.js";import{r as a}from"./iframe-BVpH2qiX.js";import{B as p}from"./button-BksZF21V.js";import{R as n}from"./index-CSJ-BBmV.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D9VEBznz.js";import"./index-agfR_ojh.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-BB2mlF8q.js";import"./index-CjRPKBfv.js";import"./index-DZm9V5o6.js";import"./index-C5blpfcd.js";import"./index-BaGZKxn6.js";import"./createLucideIcon-mTEV7xYY.js";import"./messages-tw_n8aWb.js";import"./index-BYzTOOa0.js";import"./textarea-m_hB1s72.js";import"./index-B2oh2pNS.js";import"./index-DDKKqQJt.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

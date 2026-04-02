import{j as e}from"./jsx-runtime-BxTxgAnk.js";import{r as a}from"./iframe-mBgrSWE4.js";import{B as p}from"./button-BWee1DZp.js";import{R as n}from"./index-bo1h-aXm.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CH94L4Bs.js";import"./index-CbRnTI1G.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./dialog-Cg9XpnCw.js";import"./index-BWrnska7.js";import"./index-BwYYCGYG.js";import"./index-CWDPbi-G.js";import"./index-DfeKziRQ.js";import"./createLucideIcon-D4m3DB8i.js";import"./messages-tw_n8aWb.js";import"./index-DiaIAYPG.js";import"./textarea-Bk7FuyRD.js";import"./index-BUiJQ9Gw.js";import"./index-X7S4Iwmn.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

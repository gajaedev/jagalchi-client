import{j as e}from"./jsx-runtime-NR5HSwzz.js";import{r as a}from"./iframe-CHkYBSRy.js";import{B as p}from"./button-CHCXwLUV.js";import{R as n}from"./index-Dk20fOdX.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B0L1LgLn.js";import"./index-CWv-Fqa_.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./dialog-BVHy4N5s.js";import"./index-BPpQCjtB.js";import"./index-pPNbnXTd.js";import"./index-3EoVDEtW.js";import"./index-DSH6U5Ce.js";import"./createLucideIcon-D_gRcKza.js";import"./messages-CH4G1w8F.js";import"./index-B1LGoDMV.js";import"./textarea-CvrMWPgs.js";import"./index-7SgLRIXN.js";import"./index-CCgYvIk1.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

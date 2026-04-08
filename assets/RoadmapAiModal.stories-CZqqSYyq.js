import{j as e}from"./jsx-runtime-ChlkMjr7.js";import{r as a}from"./iframe-B5H_Qswt.js";import{B as p}from"./button-DD7LpR_p.js";import{R as n}from"./index-I41fTiXe.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DFubHdRc.js";import"./index-BmcskHKw.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./ai-XawrdZA0.js";import"./dialog-DkwwBr6t.js";import"./index-BTPOFcaC.js";import"./index-BGwm6vHy.js";import"./index-dSMQilUS.js";import"./index-CR7JQl4Y.js";import"./createLucideIcon-BQ42xVli.js";import"./messages-BHrjcws9.js";import"./editor-atoms-B_eVTJyO.js";import"./react-BQ3pGQuH.js";import"./node-factory-BQRHBsXb.js";import"./index-BN1egI6m.js";import"./textarea-BkoW9RY5.js";import"./index-BtHNNiLV.js";import"./index-Dx211u_5.js";const b={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};const q=["GenerateMode","ModifyMode"];export{o as GenerateMode,s as ModifyMode,q as __namedExportsOrder,b as default};

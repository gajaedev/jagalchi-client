import{j as e}from"./jsx-runtime-D7LjZs6k.js";import{r as a}from"./iframe-CeITVqGo.js";import{B as p}from"./button-Mtk7U4HY.js";import{R as n}from"./index-CXalOZ4s.js";import"./preload-helper-PPVm8Dsz.js";import"./index-6_ti19K7.js";import"./index-D-0qgbgt.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./dialog-DmUNMP6V.js";import"./index-CBLNXE8t.js";import"./index-Bfaq3Acm.js";import"./index-hRepRnPA.js";import"./index-ChFYdR4O.js";import"./createLucideIcon-DHwdAl23.js";import"./messages-Bkfb5xdm.js";import"./index-mAO_fRzL.js";import"./textarea-BOqfclzi.js";import"./index-PTL5h5jS.js";import"./index-DoNC99Pp.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

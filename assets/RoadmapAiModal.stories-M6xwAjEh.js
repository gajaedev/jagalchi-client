import{j as e}from"./jsx-runtime-Bk9TXvQe.js";import{r as a}from"./iframe-DWhtNz1F.js";import{B as p}from"./button-D1pN_gp5.js";import{R as n}from"./index-D9NnFnlQ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CFcy6BXS.js";import"./index-CCFj_joF.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./ai-C8ZHTdJz.js";import"./client-BjQWkfsy.js";import"./dialog-D57Cs2xJ.js";import"./index-CpuLGjeW.js";import"./index-Cu0a3b1r.js";import"./index-DoPKv2Fc.js";import"./index-CJHV4_ow.js";import"./createLucideIcon-D0skFb6G.js";import"./messages-2lV3EpJ0.js";import"./editor-atoms-vNaiWERq.js";import"./react-Dt6mY9Sa.js";import"./node-factory-CWzZfoMc.js";import"./index-BlqPpKjZ.js";import"./textarea-CXAVIv0H.js";import"./index-0wk3vGCg.js";import"./index-DbcnFujv.js";const q={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[s,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:s,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[s,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:s,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},t={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    onClose: () => {},
    mode: 'generate'
  },
  render: () => <GenerateModeWrapper />
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    onClose: () => {},
    mode: 'modify'
  },
  render: () => <ModifyModeWrapper />
}`,...t.parameters?.docs?.source}}};const v=["GenerateMode","ModifyMode"];export{o as GenerateMode,t as ModifyMode,v as __namedExportsOrder,q as default};

import{j as e}from"./jsx-runtime-alyatgjF.js";import{r as a}from"./iframe-yPl1f3yL.js";import{B as p}from"./button-DgjFqk_n.js";import{R as n}from"./index-Y2M6A69F.js";import"./preload-helper-PPVm8Dsz.js";import"./index-TKd_NEvh.js";import"./index-DEumoyAd.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./ai-UuAHRgI8.js";import"./client-DyJ3uALU.js";import"./dialog-Bm_N3LQn.js";import"./index-Dg6rglX3.js";import"./index-CkKxJy4C.js";import"./index-CAhvmywE.js";import"./index-C1WU7dbM.js";import"./createLucideIcon-B8D3SxyK.js";import"./messages-2lV3EpJ0.js";import"./editor-atoms-h_QDShGA.js";import"./react-COQLWZmI.js";import"./node-factory-CWzZfoMc.js";import"./index-DgBCrahH.js";import"./textarea-DvI2cTLO.js";import"./index-CeKW6wct.js";import"./index-DJce-Oan.js";const q={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[s,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:s,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[s,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:s,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},t={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

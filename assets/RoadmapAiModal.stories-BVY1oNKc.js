import{j as e}from"./jsx-runtime-BmOk0bVY.js";import{r as a}from"./iframe-0OvX-p8O.js";import{B as p}from"./button-Dxus8snA.js";import{R as n}from"./index-C9h_74-7.js";import"./preload-helper-PPVm8Dsz.js";import"./index-bcbK0Eb8.js";import"./index-B3sPHhIA.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./ai-XawrdZA0.js";import"./dialog-DoFtIs5t.js";import"./index-CmTQ-zt1.js";import"./index-c6ERBIw6.js";import"./index-CHOcBuWf.js";import"./index-DSj1fMot.js";import"./createLucideIcon-KlrUXF2v.js";import"./messages-BHrjcws9.js";import"./editor-atoms-DhWqw-av.js";import"./react-C1DlBLtm.js";import"./node-factory-BQRHBsXb.js";import"./index-bCwegEz7.js";import"./textarea-DKeF-h73.js";import"./index-3jPtRF3J.js";import"./index-D7sGXBkB.js";const b={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

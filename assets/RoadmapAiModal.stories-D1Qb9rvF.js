import{j as e}from"./jsx-runtime-DS3vGEaA.js";import{r as a}from"./iframe-DUIjR8l5.js";import{B as p}from"./button-CHV-fKdO.js";import{R as n}from"./index-dedjNWlD.js";import"./preload-helper-PPVm8Dsz.js";import"./index-bQWBMVpa.js";import"./index-C1vqEDLX.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./ai-C8ZHTdJz.js";import"./client-BjQWkfsy.js";import"./dialog-CnlfZtOl.js";import"./index-DWrn5795.js";import"./index-DU8jOZp7.js";import"./index-C0AEmL5N.js";import"./index-BPt0Nb1y.js";import"./createLucideIcon-Dj8KJSml.js";import"./messages-2lV3EpJ0.js";import"./editor-atoms-D_Sf6SSH.js";import"./react-B5_PeFK-.js";import"./node-factory-CWzZfoMc.js";import"./index-CDJnnXmN.js";import"./textarea-C9VggEVT.js";import"./index-CNsjzG58.js";import"./index-DEMXLXnh.js";const q={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[s,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:s,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[s,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:s,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},t={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

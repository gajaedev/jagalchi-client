import{j as e}from"./jsx-runtime-CIGZEGtD.js";import{r as a}from"./iframe-BNBJMGN3.js";import{B as p}from"./button-77TQ33M3.js";import{R as n}from"./index-xxSZOUEj.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DgVionB1.js";import"./index-A0WP3gae.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./ai-CUwej2nH.js";import"./dialog-CHwqWlno.js";import"./index-CLDws9YK.js";import"./index-HxcAYnDu.js";import"./index-CpW9VjuP.js";import"./index-C2GaV9mw.js";import"./createLucideIcon-G6vjaI0_.js";import"./messages-2lV3EpJ0.js";import"./editor-atoms-CIQT0SAI.js";import"./react-CS-oEpkl.js";import"./node-factory-CWzZfoMc.js";import"./index-RpbVm0Ux.js";import"./textarea-BgpXORru.js";import"./index-BpYmFYZr.js";import"./index-BKz1UAlV.js";const b={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

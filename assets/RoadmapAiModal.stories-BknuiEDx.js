import{j as e}from"./jsx-runtime-B6z0GcaH.js";import{r as a}from"./iframe-Bg4dHgy3.js";import{B as p}from"./button-Hr06p1oo.js";import{R as n}from"./index-BPHnoOh3.js";import"./preload-helper-PPVm8Dsz.js";import"./index-TRL40uGk.js";import"./index-CbrrYdDf.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./dialog-BDambdea.js";import"./index-a-wfjUPB.js";import"./index-Cuq5Vuq8.js";import"./index-DLtfgtSo.js";import"./index-BrDovPPI.js";import"./createLucideIcon-PFukn4Qq.js";import"./messages-DjGyE838.js";import"./index-YoKB18VN.js";import"./textarea-DoI0Uif_.js";import"./index-CXnRjH8B.js";import"./index-B0Q_5WK7.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

import{j as e}from"./jsx-runtime-BjVM7qWw.js";import{r as a}from"./iframe-CIyXAdiT.js";import{B as p}from"./button-DAmsI4E5.js";import{R as n}from"./index-CAOUHQpq.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CmVf-IGw.js";import"./index-CMGjT5pJ.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./ai-BzegObj1.js";import"./client-Cz9CAgRE.js";import"./dialog-Bddq7ueP.js";import"./index-CeYrrukA.js";import"./index-BMo2qGt1.js";import"./index-CAw_91Kc.js";import"./index-DeRex8Nr.js";import"./createLucideIcon-C0H-ZbX6.js";import"./messages-2lV3EpJ0.js";import"./editor-atoms-BYr9mIvv.js";import"./react-BztdCoQ5.js";import"./node-factory-CWzZfoMc.js";import"./index-9jF4_uIv.js";import"./textarea-Dlvslkn6.js";import"./index-DyZtHqhw.js";import"./index-CQTkuk94.js";const q={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[s,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:s,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[s,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:s,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},t={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

import{j as e}from"./jsx-runtime-CImd0PQU.js";import{r as a}from"./iframe-ZYk7C0JA.js";import{B as p}from"./button-CRnZ55wM.js";import{R as n}from"./index-CSX6Y76s.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B1LeaSaG.js";import"./index-D3QTKoje.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./dialog-BxgMQ9bf.js";import"./index-BS2p4VJC.js";import"./index-BsHL4KfI.js";import"./index-DzUwrPmA.js";import"./index-B0k-D2_O.js";import"./createLucideIcon-CK0x9mOM.js";import"./messages-DAe6dRr0.js";import"./index-BGkOV3_8.js";import"./textarea-BEUKmJ1N.js";import"./index-DIfYqNrp.js";import"./index-CIjeF3cK.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

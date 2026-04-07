import{j as e}from"./jsx-runtime-BNEg3zb6.js";import{r as a}from"./iframe-DAei-zyE.js";import{B as p}from"./button-C3wRHub-.js";import{R as n}from"./index-YQ9HWlVZ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-F30oWZVB.js";import"./index-PXicZGIM.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./dialog-DTAqE-O3.js";import"./index-Mgi4jW45.js";import"./index-D4Lm_GC5.js";import"./index-B0zaw3yz.js";import"./index-B9ypU5lH.js";import"./createLucideIcon-BEM08JA9.js";import"./messages-Bkfb5xdm.js";import"./index-EutoMCSG.js";import"./textarea-DeQ6nwm8.js";import"./index-BlQUdXYM.js";import"./index-Bwtmggcm.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

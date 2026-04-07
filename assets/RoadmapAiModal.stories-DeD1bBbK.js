import{j as e}from"./jsx-runtime-DTnbwV_X.js";import{r as a}from"./iframe-DWm5vz6l.js";import{B as p}from"./button-CoIm_4f1.js";import{R as n}from"./index-CfOJ5O6X.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CDKmNuCa.js";import"./index-CHB2PLBQ.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./dialog-DxoAz_R1.js";import"./index-Cs-fqkHw.js";import"./index-Mes-a1AC.js";import"./index-D20iPAYj.js";import"./index-CZWmPldl.js";import"./createLucideIcon-CYKK4DbQ.js";import"./messages-CH4G1w8F.js";import"./index-3lEbOX37.js";import"./textarea-T_-tUwXq.js";import"./index-lt-a8LaA.js";import"./index-XfKk9bPZ.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

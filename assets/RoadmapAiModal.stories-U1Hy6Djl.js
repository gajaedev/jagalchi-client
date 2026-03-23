import{j as e}from"./jsx-runtime-BBR6ms_g.js";import{r as a}from"./iframe-Fx57lQSV.js";import{B as p}from"./button-DkPZmFFH.js";import{R as n}from"./index-BOiPn4QC.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DqTZlAxq.js";import"./index-BD6cpXTW.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-UwL6ItFS.js";import"./index-kyG_jeKe.js";import"./index-BlBtciZ0.js";import"./index-C82ejYtk.js";import"./index-C2VXMJI2.js";import"./createLucideIcon-DQ-B4vTp.js";import"./messages-tw_n8aWb.js";import"./index-CXUSOeUX.js";import"./textarea-C7oMX2hB.js";import"./index-DU0n-BqY.js";import"./index-DJo8gARr.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

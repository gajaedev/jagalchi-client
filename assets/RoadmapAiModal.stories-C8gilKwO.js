import{j as e}from"./jsx-runtime-BdxklVOD.js";import{r as a}from"./iframe-CtmJqIds.js";import{B as p}from"./button-DQY2JnhI.js";import{R as n}from"./index-D99yHXS8.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CvJ4UriV.js";import"./index-ZbEVssPF.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./dialog-DN-2vkZz.js";import"./index-DipaQZHM.js";import"./index-B2kTbXl8.js";import"./index-XHGgNw24.js";import"./index-Di7Ax66p.js";import"./createLucideIcon-CtUHiGXv.js";import"./messages-Bkfb5xdm.js";import"./index-DfYtGpF8.js";import"./textarea-DK3eS70Y.js";import"./index-BInwX0mS.js";import"./index-D8gtqhv9.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

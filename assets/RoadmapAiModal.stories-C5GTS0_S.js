import{j as e}from"./jsx-runtime-BEqmdTfa.js";import{r as a}from"./iframe-CvCQzbQ1.js";import{B as p}from"./button-By2y3iRt.js";import{R as n}from"./index-BYhtdzXE.js";import"./preload-helper-PPVm8Dsz.js";import"./index-4LaE-wf4.js";import"./index-C1va87JV.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-pJ2VX9Mk.js";import"./index-mHWDIXTO.js";import"./index-DoUzl7Z1.js";import"./index-Dx-8DjyV.js";import"./index-MDtNVUMk.js";import"./createLucideIcon-YcNgLmPt.js";import"./messages-tw_n8aWb.js";import"./index-iOnhCW0-.js";import"./textarea-DFVy6rSf.js";import"./index-Cd6dcAaS.js";import"./index-CdYDgkZu.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

import{j as e}from"./jsx-runtime-XyiQ9ysH.js";import{r as a}from"./iframe-DOF5F5lR.js";import{B as p}from"./button-Do6dWxFl.js";import{R as n}from"./index-Mpxfwyqb.js";import"./preload-helper-PPVm8Dsz.js";import"./index-ocTJpDvT.js";import"./index-BmwE2FtC.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-L5fLmP5z.js";import"./index-BKXF3aFC.js";import"./index-D-08LnOs.js";import"./index-C5gMfdSB.js";import"./index-jxQeYgSa.js";import"./createLucideIcon--H42QaAy.js";import"./messages-tw_n8aWb.js";import"./index-CCe6-gBq.js";import"./textarea-8UAiGj0R.js";import"./index-BVs1h-bN.js";import"./index-DQhXlcft.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

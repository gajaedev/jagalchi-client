import{j as e}from"./jsx-runtime-Cxzz85lI.js";import{r as a}from"./iframe-SctQ3zmA.js";import{B as p}from"./button-iIF-bU3q.js";import{R as n}from"./index-DSVRjlEr.js";import"./preload-helper-PPVm8Dsz.js";import"./index-N1wJpAX6.js";import"./index-DRnjLPOD.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-CuBRGuko.js";import"./index-c33YQWQW.js";import"./index-uHSfXH61.js";import"./index-ULR0ADsP.js";import"./index-DTlS8LLi.js";import"./createLucideIcon-BQybxFyc.js";import"./messages-DkLYveTE.js";import"./index-5_OzgzJA.js";import"./textarea-CN0PqT0K.js";import"./index-D5lXhLov.js";import"./index-CdD-3Prw.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

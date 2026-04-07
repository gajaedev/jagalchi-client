import{j as e}from"./jsx-runtime-CujvsigE.js";import{r as a}from"./iframe-DB83Vc0b.js";import{B as p}from"./button-JychSIOV.js";import{R as n}from"./index-DggXACxr.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CwWRRZiP.js";import"./index-DQOEezFz.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./ai-XawrdZA0.js";import"./dialog-DQeri3_k.js";import"./index-DXml_VXF.js";import"./index-fBrCm9wV.js";import"./index-76WfHrsx.js";import"./index-BHEmZ68k.js";import"./createLucideIcon-D0HM8CQq.js";import"./messages-BHrjcws9.js";import"./editor-atoms-BoZ6z2bn.js";import"./react-CJpjU2nU.js";import"./index-DLaM3u0A.js";import"./textarea-Bc28Jh92.js";import"./index-MA_PJCPb.js";import"./index-CYYPVOh5.js";const _={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};const b=["GenerateMode","ModifyMode"];export{o as GenerateMode,s as ModifyMode,b as __namedExportsOrder,_ as default};

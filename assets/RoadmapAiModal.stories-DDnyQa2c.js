import{j as e}from"./jsx-runtime-CX6gKgts.js";import{r as a}from"./iframe-Cv-ihnrn.js";import{B as p}from"./button-BW62iU5D.js";import{R as n}from"./index-CmOjf6XN.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DxFlkh3O.js";import"./index-CA6k5RnG.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-CGJjWsUC.js";import"./index-P-av95NS.js";import"./index-D_RimEal.js";import"./index-CjwuNtzZ.js";import"./index-CtGAUIUP.js";import"./createLucideIcon-BiwUQI9z.js";import"./messages-tw_n8aWb.js";import"./index-DFMsf0ES.js";import"./textarea-fbJ1C8cW.js";import"./index-BALHRddQ.js";import"./index-G-fY_1ZZ.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

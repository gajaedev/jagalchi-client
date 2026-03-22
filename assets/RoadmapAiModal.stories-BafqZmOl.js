import{j as e}from"./jsx-runtime-CCaZ3Xqs.js";import{r as a}from"./iframe-P3gPBkhb.js";import{B as p}from"./button-BdW2YrJv.js";import{R as n}from"./index-CiinpUf8.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D6poOmaW.js";import"./index-DDRDqzXw.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-DQLxU1w8.js";import"./index-B2QeMahN.js";import"./index-JN8nqcUi.js";import"./index-BOf2L7Qp.js";import"./index-CBcwq8nr.js";import"./createLucideIcon-CI3tj4m4.js";import"./messages-tw_n8aWb.js";import"./index-BpPCn6Lo.js";import"./textarea-8hX6IvAe.js";import"./index-BTY5aeI2.js";import"./index-BWBFkcsy.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

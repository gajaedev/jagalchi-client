import{j as e}from"./jsx-runtime-C4xS7gjl.js";import{r as a}from"./iframe-CE93TRsj.js";import{B as p}from"./button-D7lkkUql.js";import{R as n}from"./index-DMSTutQL.js";import"./preload-helper-PPVm8Dsz.js";import"./index-i2_P0iWE.js";import"./index-BqdCeBAm.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./dialog-4zTZsL6Z.js";import"./index-B59GIXHw.js";import"./index-DNrydUEP.js";import"./index-CVNNN5ln.js";import"./index-CWMyhJ-U.js";import"./createLucideIcon-BR7LPvay.js";import"./messages-CH4G1w8F.js";import"./index-qL0I6IIO.js";import"./textarea-a0e5mpVO.js";import"./index-DMLchs6I.js";import"./index-C_5c8UOY.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

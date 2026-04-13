import{j as e}from"./jsx-runtime-D0ZP9ShM.js";import{r as a}from"./iframe-Dc48HFqB.js";import{B as p}from"./button-Bjg-JJEp.js";import{R as n}from"./index-Bh3CrcxW.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B5OcGX6w.js";import"./index-TBSC8cfB.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./ai-XawrdZA0.js";import"./dialog-BRivNKk8.js";import"./index-D86zs0wJ.js";import"./index-B7GPapSz.js";import"./index-BEJysVQu.js";import"./index-DUciMzjo.js";import"./createLucideIcon-BpyJ6sFd.js";import"./messages-2lV3EpJ0.js";import"./editor-atoms-X1xpa2Ov.js";import"./react-YYGR1x1a.js";import"./node-factory-CWzZfoMc.js";import"./index-Brprys4d.js";import"./textarea-DQLFRMGj.js";import"./index-DeEpC8gs.js";import"./index-CCIVnIUi.js";const b={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};const q=["GenerateMode","ModifyMode"];export{o as GenerateMode,s as ModifyMode,q as __namedExportsOrder,b as default};

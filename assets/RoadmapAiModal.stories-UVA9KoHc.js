import{j as e}from"./jsx-runtime-BCDARHuB.js";import{r as a}from"./iframe-CGOFGZ74.js";import{B as p}from"./button-BiEFd3xI.js";import{R as n}from"./index-TTHXbsGl.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CyqZYS1i.js";import"./index-Q5z864Kg.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./ai-DJAYoVaH.js";import"./dialog-DmFJJ-9z.js";import"./index-DarwbZGg.js";import"./index-Dretjtct.js";import"./index-C183bjhn.js";import"./index-DweZlhMv.js";import"./createLucideIcon-BdlawEv3.js";import"./messages-2lV3EpJ0.js";import"./editor-atoms-Dk85813q.js";import"./react-CAaZ48Jc.js";import"./node-factory-CWzZfoMc.js";import"./index-B8o_XUvD.js";import"./textarea-CPoKp-bJ.js";import"./index-Nc9k47Ev.js";import"./index-B_EbsAlZ.js";const b={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

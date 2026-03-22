import{j as e}from"./jsx-runtime-8KF9VQbz.js";import{r as a}from"./iframe-D6nuwmyy.js";import{B as p}from"./button-CzM-aqcq.js";import{R as n}from"./index-et9XhJLM.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BmBJNSeQ.js";import"./index-CKqL_VQS.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-BjS0OAHQ.js";import"./index-Dm0_gsK7.js";import"./index-BriNDUMn.js";import"./index-E0tW8qt3.js";import"./index-C11LxUir.js";import"./createLucideIcon-BuKpZMjk.js";import"./messages-tw_n8aWb.js";import"./index-DXub0RZz.js";import"./textarea-CGd1ICmI.js";import"./index-hpZ7hyEM.js";import"./index-DANZuFPO.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

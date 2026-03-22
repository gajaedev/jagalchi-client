import{j as e}from"./jsx-runtime-C4D34j97.js";import{r as a}from"./iframe-pvCh4FhF.js";import{B as p}from"./button-DoqahZrr.js";import{R as n}from"./index-BAe0nPTY.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Do54Nb08.js";import"./index-BZFkRgpu.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-D_sj3qCO.js";import"./index-BdGBjCxE.js";import"./index-Bmbebtvz.js";import"./index-Bd-lpUeq.js";import"./index-Cc0w69bs.js";import"./createLucideIcon-UOdY7UsX.js";import"./messages-tw_n8aWb.js";import"./index-DFThwTAz.js";import"./textarea-CSbjpZUO.js";import"./index-CymPY60Z.js";import"./index-Dvb_4pq_.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

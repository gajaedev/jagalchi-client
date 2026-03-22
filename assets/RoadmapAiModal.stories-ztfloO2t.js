import{j as e}from"./jsx-runtime-BDgSbgkY.js";import{r as a}from"./iframe-osWvdCVA.js";import{B as p}from"./button-DMdZjQos.js";import{R as n}from"./index-BakaRWsO.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B9pUGwSj.js";import"./index-4iflbfGh.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-xGPmTjaO.js";import"./index-Ct1dQziz.js";import"./index-yv72MhYD.js";import"./index-D2kbmr77.js";import"./index-Bq-EI4XE.js";import"./createLucideIcon-B0UXS6j5.js";import"./messages-tw_n8aWb.js";import"./index-Cu1wLFfV.js";import"./textarea-Fvj673Vy.js";import"./index-D4wytxJC.js";import"./index-C_NuRdc4.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

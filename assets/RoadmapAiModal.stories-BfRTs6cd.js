import{j as e}from"./jsx-runtime-DzmlkZa1.js";import{r as a}from"./iframe-Ca-YxJOr.js";import{B as p}from"./button-DIC14KoC.js";import{R as n}from"./index-Bu6bDEvb.js";import"./preload-helper-PPVm8Dsz.js";import"./index-G9H5bQaU.js";import"./index-Cylo4i7r.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./dialog-CusBzU8D.js";import"./index-6QOnQ3Ip.js";import"./index-BJGjkQA7.js";import"./index-xfPD5mvF.js";import"./index-B8lTaKL6.js";import"./createLucideIcon-BilLd6_P.js";import"./messages-tw_n8aWb.js";import"./index-C-8mnpJr.js";import"./textarea-CiSc9RJy.js";import"./index-C52ojKBY.js";import"./index-Bx9p8MVR.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

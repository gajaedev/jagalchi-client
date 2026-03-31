import{j as e}from"./jsx-runtime-CKc7U6XQ.js";import{r as a}from"./iframe-CucAqyq3.js";import{B as p}from"./button-C6avzqQ5.js";import{R as n}from"./index-CQNkTZUd.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BvZMuoGR.js";import"./index-1pqMqqqI.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./dialog-DJ7GwTrZ.js";import"./index-Bn6PS67y.js";import"./index-Cuw5oT5e.js";import"./index-B0608EAK.js";import"./index-D-x4XFJd.js";import"./createLucideIcon-C8LcKO5w.js";import"./messages-tw_n8aWb.js";import"./index-CN6h67Nx.js";import"./textarea-zAXtdJ0B.js";import"./index-DXJeP5JW.js";import"./index-D2rT9nAp.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

import{j as e}from"./jsx-runtime-DQ6mrSjD.js";import{r as a}from"./iframe-CDDQQDDz.js";import{B as p}from"./button-DAB1FM_i.js";import{R as n}from"./index-_M2H8X1A.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DF6K5niN.js";import"./index-BuQRkUE6.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./ai-DJAYoVaH.js";import"./dialog-8LE0_Kf1.js";import"./index-BF4Uu0gP.js";import"./index-BSEdYhTq.js";import"./index-CTQC2q4g.js";import"./index-DAqvnybX.js";import"./createLucideIcon-Bj2w0-a8.js";import"./messages-2lV3EpJ0.js";import"./editor-atoms-uGG4HT4Q.js";import"./react-D1r6gUkt.js";import"./node-factory-CWzZfoMc.js";import"./index-D8laZ_5D.js";import"./textarea-CvQYxMKV.js";import"./index-DJsAl42S.js";import"./index-HItNwhdw.js";const b={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

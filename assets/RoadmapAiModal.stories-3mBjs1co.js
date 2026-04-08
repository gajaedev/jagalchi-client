import{j as e}from"./jsx-runtime-UTUg8foo.js";import{r as a}from"./iframe-DaqhFCqF.js";import{B as p}from"./button-CH5Pia53.js";import{R as n}from"./index-JAaYxJXa.js";import"./preload-helper-PPVm8Dsz.js";import"./index-TTiC7miE.js";import"./index-uteaynj3.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./ai-XawrdZA0.js";import"./dialog-CeYEwtG-.js";import"./index-BbgCWMN3.js";import"./index-oMYo13tD.js";import"./index-CqzrBQ9C.js";import"./index-DCF9kAJm.js";import"./createLucideIcon-DMXnJ0Cx.js";import"./messages-BHrjcws9.js";import"./editor-atoms-C4em64Uz.js";import"./react-DJKVvApM.js";import"./node-factory-BQRHBsXb.js";import"./index-BUTmEqXm.js";import"./textarea-BRgGZfD8.js";import"./index-e4VTNAe8.js";import"./index-pXFZZvNr.js";const b={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

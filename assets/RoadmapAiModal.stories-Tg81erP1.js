import{j as e}from"./jsx-runtime-aX5MvExf.js";import{r as a}from"./iframe-DvS0hAEM.js";import{B as p}from"./button-BLLC2g74.js";import{R as n}from"./index-B4oJTJob.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CG08QkUq.js";import"./index-DpIOW7F_.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-CEOCdg4C.js";import"./index-CPEeYVS4.js";import"./index-VtDvO7w6.js";import"./index-CBniY4ec.js";import"./index-DxogBunP.js";import"./createLucideIcon-B13dzE8L.js";import"./messages-tw_n8aWb.js";import"./index-qe_sUD5i.js";import"./textarea-llhsyrFJ.js";import"./index-CWVFaixz.js";import"./index-BrnPza3s.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

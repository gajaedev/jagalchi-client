import{j as e}from"./jsx-runtime-CPdMdD9n.js";import{r as a}from"./iframe-4df5BIMp.js";import{B as p}from"./button-D_gdXrGu.js";import{R as n}from"./index-C-WZbbdv.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C9VQtP49.js";import"./index-CTuGr3p9.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-DhBOQ-D4.js";import"./index-CV1n_s2X.js";import"./index-CCE_33g9.js";import"./index-B57qP7HY.js";import"./index-BlkGPXOj.js";import"./createLucideIcon-iek7SpHG.js";import"./messages-tw_n8aWb.js";import"./index-DRj8aOD1.js";import"./textarea-Cx3WohAs.js";import"./index-BB_EFaqu.js";import"./index-CgsJtUFM.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

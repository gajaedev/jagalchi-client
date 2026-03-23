import{j as e}from"./jsx-runtime-DgpJom-r.js";import{r as a}from"./iframe-DnfOKhIP.js";import{B as p}from"./button-BHU1OHnS.js";import{R as n}from"./index-C18BT3lr.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DaXlp8IE.js";import"./index-vRESLaZs.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-S2xmrLM6.js";import"./index-Bm1skVHv.js";import"./index-DLC0NMqK.js";import"./index-IJLVWs5U.js";import"./index-DwhKD2Ay.js";import"./createLucideIcon-DntPXVNg.js";import"./messages-tw_n8aWb.js";import"./index-B-1PMRyB.js";import"./textarea-BfJcnLWu.js";import"./index-GEilZPc1.js";import"./index-D2PrPInG.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

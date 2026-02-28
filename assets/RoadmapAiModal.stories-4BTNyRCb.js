import{j as e}from"./jsx-runtime-D39_KJa-.js";import{r as a}from"./iframe-BI6vm0ZH.js";import{B as p}from"./button-JQAKt4FE.js";import{R as n}from"./index-B5Eh_tdZ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DE98NmtS.js";import"./index-B8_pLKYu.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-MGVUsn5g.js";import"./index-CMHEVa3e.js";import"./index-DgbppV2Z.js";import"./index-CWNVaN0m.js";import"./index-DGZIE4pr.js";import"./createLucideIcon-BUQ5OFIb.js";import"./messages-tw_n8aWb.js";import"./index-C5fwV_Qx.js";import"./textarea-C41rtuK2.js";import"./index-BeI-ufBc.js";import"./index-BKKtAgqy.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

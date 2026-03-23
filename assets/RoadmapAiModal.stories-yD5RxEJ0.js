import{j as e}from"./jsx-runtime-CA4urzy9.js";import{r as a}from"./iframe-CMhSVNTD.js";import{B as p}from"./button-XnubpZKh.js";import{R as n}from"./index-BAokuZD2.js";import"./preload-helper-PPVm8Dsz.js";import"./index-2tFTs434.js";import"./index-nrUbuldD.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-B-PuNF_Z.js";import"./index-DpXQymrf.js";import"./index-BbqRN9v2.js";import"./index-BvNnDRCW.js";import"./index-Hkgnl9nI.js";import"./createLucideIcon-CVLCU9qm.js";import"./messages-tw_n8aWb.js";import"./index-BI6DlGgr.js";import"./textarea-CecOUBrd.js";import"./index-DmAq0u8U.js";import"./index-sRspamMM.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

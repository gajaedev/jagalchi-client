import{j as e}from"./jsx-runtime-z2zEYQyt.js";import{r as a}from"./iframe-CjPr2G2Y.js";import{B as p}from"./button-BSkmYWpy.js";import{R as n}from"./index-t6-Zoc8X.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DocN_GDi.js";import"./index-C6kXiWpW.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-OOJxuZzl.js";import"./index-CKdROaZO.js";import"./index-CEQx_Z02.js";import"./index-ByAkxchn.js";import"./index-aJQs2Ehi.js";import"./createLucideIcon-C_j0nG6d.js";import"./messages-tw_n8aWb.js";import"./index-YGvtwSua.js";import"./textarea-KqJIOSvV.js";import"./index-DXqahXQz.js";import"./index-ChG7qprr.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

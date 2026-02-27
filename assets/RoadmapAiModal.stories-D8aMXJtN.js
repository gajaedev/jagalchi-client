import{j as e}from"./jsx-runtime-DtzCM18y.js";import{r as a}from"./iframe-BY0TrE16.js";import{B as p}from"./button-CIQepC7X.js";import{R as n}from"./index-4M0Xsghd.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DRjnCd_H.js";import"./index-Dj1EL8Bq.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-DEaX682x.js";import"./index-C03J0qzv.js";import"./index-CR-8GSgu.js";import"./index-CHYLfTyx.js";import"./index-CFbx0zi8.js";import"./createLucideIcon-Cra6ocEu.js";import"./messages-tw_n8aWb.js";import"./index-QhmvkIuY.js";import"./textarea-DODC1LyF.js";import"./index-IS3N3H8F.js";import"./index-vqRwtBO6.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

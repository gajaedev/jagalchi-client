import{j as e}from"./jsx-runtime-DdmxcLET.js";import{r as a}from"./iframe-BmpoGx1R.js";import{B as p}from"./button-DjrUds_s.js";import{R as n}from"./index-B7IVUNcz.js";import"./preload-helper-PPVm8Dsz.js";import"./index-ChgYa-84.js";import"./index-Dv9gSYyR.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-CTFmchQt.js";import"./index-C7gse5mp.js";import"./index-DwDeJz6h.js";import"./index-CwnMz2et.js";import"./index-BISvjkvE.js";import"./createLucideIcon-CRWMFQV_.js";import"./messages-DkLYveTE.js";import"./index-Bdg1CkGo.js";import"./textarea-o158V2m-.js";import"./index-Cg9ymrs1.js";import"./index-BWlt7IzU.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

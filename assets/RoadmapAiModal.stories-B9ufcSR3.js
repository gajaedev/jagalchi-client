import{j as e}from"./jsx-runtime-CzdoZzdv.js";import{r as a}from"./iframe-DAi1w4Di.js";import{B as p}from"./button-C7XtNtzq.js";import{R as n}from"./index-BAFu3xaD.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D5Y9Tksh.js";import"./index-C4hkHrHT.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-Am3gyvgL.js";import"./index-D8nYKNEl.js";import"./index-CzpIf3X5.js";import"./index-DDXKoHwn.js";import"./index-B2rqc7qh.js";import"./createLucideIcon-BymggnQN.js";import"./messages-tw_n8aWb.js";import"./index-BpQxOjFp.js";import"./textarea-BoWTvaFN.js";import"./index-Cw6zcojV.js";import"./index-Cx3yWS_L.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

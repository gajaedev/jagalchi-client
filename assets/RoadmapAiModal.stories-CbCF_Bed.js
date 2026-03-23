import{j as e}from"./jsx-runtime-Bh_cePIx.js";import{r as a}from"./iframe-nWJMQWTs.js";import{B as p}from"./button-Ce2Qi6z-.js";import{R as n}from"./index-Dfz7FywZ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DYBz8lvl.js";import"./index-BQvYm2TS.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-m2sCmWlJ.js";import"./index-nMMotL-A.js";import"./index-vp8ItEZW.js";import"./index-LfjvSwJC.js";import"./index-B_EwBO-j.js";import"./createLucideIcon-Dbd7uBsB.js";import"./messages-tw_n8aWb.js";import"./index-CB08g2zF.js";import"./textarea-DbPZwgr_.js";import"./index-DQnXWdQN.js";import"./index-DqW7TYhw.js";const B={title:"Organisms/RoadmapAiModal",component:n,parameters:{layout:"centered"},tags:["autodocs"]};function i(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Generate Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"generate"})]})}function m(){const[t,r]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>r(!0),children:"Open Modify Modal"}),e.jsx(n,{isOpen:t,onClose:()=>r(!1),mode:"modify"})]})}const o={args:{isOpen:!1,onClose:()=>{},mode:"generate"},render:()=>e.jsx(i,{})},s={args:{isOpen:!1,onClose:()=>{},mode:"modify"},render:()=>e.jsx(m,{})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

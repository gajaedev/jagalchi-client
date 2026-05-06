import{n as e,o as t}from"./chunk-BEldbCjX.js";import{C as n,J as r}from"./iframe-CVXxN-RE.js";import{n as i,t as a}from"./button-B42-vmHz.js";import{n as o,t as s}from"./RoadmapAiModal-D2RgSvUK.js";function c(){let[e,t]=(0,d.useState)(!1);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(a,{onClick:()=>t(!0),children:`Open Generate Modal`}),(0,u.jsx)(s,{isOpen:e,onClose:()=>t(!1),mode:`generate`})]})}function l(){let[e,t]=(0,d.useState)(!1);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(a,{onClick:()=>t(!0),children:`Open Modify Modal`}),(0,u.jsx)(s,{isOpen:e,onClose:()=>t(!1),mode:`modify`})]})}var u,d,f,p,m,h;e((()=>{u=n(),d=t(r()),i(),o(),f={title:`Organisms/RoadmapAiModal`,component:s,parameters:{layout:`centered`},tags:[`autodocs`]},p={args:{isOpen:!1,onClose:()=>{},mode:`generate`},render:()=>(0,u.jsx)(c,{})},m={args:{isOpen:!1,onClose:()=>{},mode:`modify`},render:()=>(0,u.jsx)(l,{})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    onClose: () => {},
    mode: 'generate'
  },
  render: () => <GenerateModeWrapper />
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    onClose: () => {},
    mode: 'modify'
  },
  render: () => <ModifyModeWrapper />
}`,...m.parameters?.docs?.source}}},h=[`GenerateMode`,`ModifyMode`]}))();export{p as GenerateMode,m as ModifyMode,h as __namedExportsOrder,f as default};
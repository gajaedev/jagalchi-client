import{a as e}from"./chunk-gsjJvkCQ.js";import{t}from"./react-aNIrFo1u.js";import{h as n}from"./iframe-B_zw0CBJ.js";import{t as r}from"./button-De1slYAv.js";import{t as i}from"./RoadmapAiModal-DwH4R74Q.js";var a=n(),o=e(t()),s={title:`Organisms/RoadmapAiModal`,component:i,parameters:{layout:`centered`},tags:[`autodocs`]};function c(){let[e,t]=(0,o.useState)(!1);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r,{onClick:()=>t(!0),children:`Open Generate Modal`}),(0,a.jsx)(i,{isOpen:e,onClose:()=>t(!1),mode:`generate`})]})}function l(){let[e,t]=(0,o.useState)(!1);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r,{onClick:()=>t(!0),children:`Open Modify Modal`}),(0,a.jsx)(i,{isOpen:e,onClose:()=>t(!1),mode:`modify`})]})}var u={args:{isOpen:!1,onClose:()=>{},mode:`generate`},render:()=>(0,a.jsx)(c,{})},d={args:{isOpen:!1,onClose:()=>{},mode:`modify`},render:()=>(0,a.jsx)(l,{})};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    onClose: () => {},
    mode: 'generate'
  },
  render: () => <GenerateModeWrapper />
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    onClose: () => {},
    mode: 'modify'
  },
  render: () => <ModifyModeWrapper />
}`,...d.parameters?.docs?.source}}};var f=[`GenerateMode`,`ModifyMode`];export{u as GenerateMode,d as ModifyMode,f as __namedExportsOrder,s as default};
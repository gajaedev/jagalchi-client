import{R as t}from"./index-CCgYvIk1.js";import"./jsx-runtime-NR5HSwzz.js";import"./iframe-CHkYBSRy.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-CvrMWPgs.js";import"./utils-BQHNewu7.js";import"./messages-CH4G1w8F.js";import"./index-7SgLRIXN.js";import"./button-CHCXwLUV.js";import"./index-B0L1LgLn.js";import"./index-CWv-Fqa_.js";import"./index-LHNt3CwB.js";const L={title:"Organisms/RoadmapModificationForm",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onModify:r=>{console.log("Modify roadmap with prompt:",r)},onCancel:()=>{console.log("Cancel modification")},isLoading:!1}},a={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    onModify: (prompt: string) => {
      console.log('Modify roadmap with prompt:', prompt);
    },
    onCancel: () => {
      console.log('Cancel modification');
    },
    isLoading: false
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    isLoading: true
  }
}`,...a.parameters?.docs?.source}}};const M=["Default","Loading"];export{o as Default,a as Loading,M as __namedExportsOrder,L as default};

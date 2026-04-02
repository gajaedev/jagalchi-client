import{R as t}from"./index-X7S4Iwmn.js";import"./jsx-runtime-BxTxgAnk.js";import"./iframe-mBgrSWE4.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-Bk7FuyRD.js";import"./utils-BQHNewu7.js";import"./messages-tw_n8aWb.js";import"./index-BUiJQ9Gw.js";import"./button-BWee1DZp.js";import"./index-CH94L4Bs.js";import"./index-CbRnTI1G.js";import"./index-LHNt3CwB.js";const L={title:"Organisms/RoadmapModificationForm",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onModify:r=>{console.log("Modify roadmap with prompt:",r)},onCancel:()=>{console.log("Cancel modification")},isLoading:!1}},a={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

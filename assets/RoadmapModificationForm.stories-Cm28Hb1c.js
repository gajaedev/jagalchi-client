import{R as t}from"./index-C_5c8UOY.js";import"./jsx-runtime-C4xS7gjl.js";import"./iframe-CE93TRsj.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-a0e5mpVO.js";import"./utils-BQHNewu7.js";import"./messages-CH4G1w8F.js";import"./index-DMLchs6I.js";import"./button-D7lkkUql.js";import"./index-i2_P0iWE.js";import"./index-BqdCeBAm.js";import"./index-LHNt3CwB.js";const L={title:"Organisms/RoadmapModificationForm",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onModify:r=>{console.log("Modify roadmap with prompt:",r)},onCancel:()=>{console.log("Cancel modification")},isLoading:!1}},a={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

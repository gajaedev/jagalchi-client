import{R as t}from"./index-CQTkuk94.js";import"./jsx-runtime-BjVM7qWw.js";import"./iframe-CIyXAdiT.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-Dlvslkn6.js";import"./utils-BQHNewu7.js";import"./messages-2lV3EpJ0.js";import"./index-DyZtHqhw.js";import"./button-DAmsI4E5.js";import"./index-CmVf-IGw.js";import"./index-CMGjT5pJ.js";import"./index-LHNt3CwB.js";const L={title:"Organisms/RoadmapModificationForm",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onModify:r=>{console.log("Modify roadmap with prompt:",r)},onCancel:()=>{console.log("Cancel modification")},isLoading:!1}},a={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

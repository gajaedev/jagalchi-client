import{R as t}from"./index-B0Q_5WK7.js";import"./jsx-runtime-B6z0GcaH.js";import"./iframe-Bg4dHgy3.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-DoI0Uif_.js";import"./utils-BQHNewu7.js";import"./messages-DjGyE838.js";import"./index-CXnRjH8B.js";import"./button-Hr06p1oo.js";import"./index-TRL40uGk.js";import"./index-CbrrYdDf.js";import"./index-LHNt3CwB.js";const L={title:"Organisms/RoadmapModificationForm",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onModify:r=>{console.log("Modify roadmap with prompt:",r)},onCancel:()=>{console.log("Cancel modification")},isLoading:!1}},a={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

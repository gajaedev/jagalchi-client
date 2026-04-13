import{R as t}from"./index-BKz1UAlV.js";import"./jsx-runtime-CIGZEGtD.js";import"./iframe-BNBJMGN3.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-BgpXORru.js";import"./utils-BQHNewu7.js";import"./messages-2lV3EpJ0.js";import"./index-BpYmFYZr.js";import"./button-77TQ33M3.js";import"./index-DgVionB1.js";import"./index-A0WP3gae.js";import"./index-LHNt3CwB.js";const L={title:"Organisms/RoadmapModificationForm",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onModify:r=>{console.log("Modify roadmap with prompt:",r)},onCancel:()=>{console.log("Cancel modification")},isLoading:!1}},a={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

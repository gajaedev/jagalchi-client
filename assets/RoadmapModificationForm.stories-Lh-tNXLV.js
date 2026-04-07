import{R as t}from"./index-DoNC99Pp.js";import"./jsx-runtime-D7LjZs6k.js";import"./iframe-CeITVqGo.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-BOqfclzi.js";import"./utils-BQHNewu7.js";import"./messages-Bkfb5xdm.js";import"./index-PTL5h5jS.js";import"./button-Mtk7U4HY.js";import"./index-6_ti19K7.js";import"./index-D-0qgbgt.js";import"./index-LHNt3CwB.js";const L={title:"Organisms/RoadmapModificationForm",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onModify:r=>{console.log("Modify roadmap with prompt:",r)},onCancel:()=>{console.log("Cancel modification")},isLoading:!1}},a={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

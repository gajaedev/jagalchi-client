import{R as t}from"./index-C_NuRdc4.js";import"./jsx-runtime-BDgSbgkY.js";import"./iframe-osWvdCVA.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-Fvj673Vy.js";import"./utils-CDN07tui.js";import"./messages-tw_n8aWb.js";import"./index-D4wytxJC.js";import"./button-DMdZjQos.js";import"./index-B9pUGwSj.js";import"./index-4iflbfGh.js";import"./index-B_jtOnfb.js";const L={title:"Organisms/RoadmapModificationForm",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onModify:r=>{console.log("Modify roadmap with prompt:",r)},onCancel:()=>{console.log("Cancel modification")},isLoading:!1}},a={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

import{R as t}from"./index-BWBFkcsy.js";import"./jsx-runtime-CCaZ3Xqs.js";import"./iframe-P3gPBkhb.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-8hX6IvAe.js";import"./utils-CDN07tui.js";import"./messages-tw_n8aWb.js";import"./index-BTY5aeI2.js";import"./button-BdW2YrJv.js";import"./index-D6poOmaW.js";import"./index-DDRDqzXw.js";import"./index-B_jtOnfb.js";const L={title:"Organisms/RoadmapModificationForm",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onModify:r=>{console.log("Modify roadmap with prompt:",r)},onCancel:()=>{console.log("Cancel modification")},isLoading:!1}},a={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

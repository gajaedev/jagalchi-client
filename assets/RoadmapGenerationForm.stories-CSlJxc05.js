import{R as a}from"./index-mAO_fRzL.js";import"./jsx-runtime-D7LjZs6k.js";import"./iframe-CeITVqGo.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-BOqfclzi.js";import"./utils-BQHNewu7.js";import"./messages-Bkfb5xdm.js";import"./index-PTL5h5jS.js";import"./button-Mtk7U4HY.js";import"./index-6_ti19K7.js";import"./index-D-0qgbgt.js";import"./index-LHNt3CwB.js";const G={title:"Organisms/RoadmapGenerationForm",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onGenerate:e=>{console.log("Generate roadmap with prompt:",e)},onCancel:()=>{console.log("Cancel generation")},isLoading:!1}},r={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    onGenerate: (prompt: string) => {
      console.log('Generate roadmap with prompt:', prompt);
    },
    onCancel: () => {
      console.log('Cancel generation');
    },
    isLoading: false
  }
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    isLoading: true
  }
}`,...r.parameters?.docs?.source}}};const L=["Default","Loading"];export{o as Default,r as Loading,L as __namedExportsOrder,G as default};

import{R as a}from"./index-BlqPpKjZ.js";import"./jsx-runtime-Bk9TXvQe.js";import"./iframe-DWhtNz1F.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-CXAVIv0H.js";import"./utils-BQHNewu7.js";import"./messages-2lV3EpJ0.js";import"./index-0wk3vGCg.js";import"./button-D1pN_gp5.js";import"./index-CFcy6BXS.js";import"./index-CCFj_joF.js";import"./index-LHNt3CwB.js";const G={title:"Organisms/RoadmapGenerationForm",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onGenerate:e=>{console.log("Generate roadmap with prompt:",e)},onCancel:()=>{console.log("Cancel generation")},isLoading:!1}},r={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

import{R as a}from"./index-RpbVm0Ux.js";import"./jsx-runtime-CIGZEGtD.js";import"./iframe-BNBJMGN3.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-BgpXORru.js";import"./utils-BQHNewu7.js";import"./messages-2lV3EpJ0.js";import"./index-BpYmFYZr.js";import"./button-77TQ33M3.js";import"./index-DgVionB1.js";import"./index-A0WP3gae.js";import"./index-LHNt3CwB.js";const G={title:"Organisms/RoadmapGenerationForm",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onGenerate:e=>{console.log("Generate roadmap with prompt:",e)},onCancel:()=>{console.log("Cancel generation")},isLoading:!1}},r={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

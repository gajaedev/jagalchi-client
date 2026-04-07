import{R as a}from"./index-bCwegEz7.js";import"./jsx-runtime-BmOk0bVY.js";import"./iframe-0OvX-p8O.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-DKeF-h73.js";import"./utils-BQHNewu7.js";import"./messages-BHrjcws9.js";import"./index-3jPtRF3J.js";import"./button-Dxus8snA.js";import"./index-bcbK0Eb8.js";import"./index-B3sPHhIA.js";import"./index-LHNt3CwB.js";const G={title:"Organisms/RoadmapGenerationForm",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onGenerate:e=>{console.log("Generate roadmap with prompt:",e)},onCancel:()=>{console.log("Cancel generation")},isLoading:!1}},r={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

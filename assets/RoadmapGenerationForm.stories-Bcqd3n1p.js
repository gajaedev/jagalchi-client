import{R as a}from"./index-BGkOV3_8.js";import"./jsx-runtime-CImd0PQU.js";import"./iframe-ZYk7C0JA.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-BEUKmJ1N.js";import"./utils-BQHNewu7.js";import"./messages-DAe6dRr0.js";import"./index-DIfYqNrp.js";import"./button-CRnZ55wM.js";import"./index-B1LeaSaG.js";import"./index-D3QTKoje.js";import"./index-LHNt3CwB.js";const G={title:"Organisms/RoadmapGenerationForm",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onGenerate:e=>{console.log("Generate roadmap with prompt:",e)},onCancel:()=>{console.log("Cancel generation")},isLoading:!1}},r={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

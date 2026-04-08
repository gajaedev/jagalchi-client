import{R as a}from"./index-BN1egI6m.js";import"./jsx-runtime-ChlkMjr7.js";import"./iframe-B5H_Qswt.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-BkoW9RY5.js";import"./utils-BQHNewu7.js";import"./messages-BHrjcws9.js";import"./index-BtHNNiLV.js";import"./button-DD7LpR_p.js";import"./index-DFubHdRc.js";import"./index-BmcskHKw.js";import"./index-LHNt3CwB.js";const G={title:"Organisms/RoadmapGenerationForm",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onGenerate:e=>{console.log("Generate roadmap with prompt:",e)},onCancel:()=>{console.log("Cancel generation")},isLoading:!1}},r={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

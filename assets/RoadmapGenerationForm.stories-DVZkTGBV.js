import{R as a}from"./index-YoKB18VN.js";import"./jsx-runtime-B6z0GcaH.js";import"./iframe-Bg4dHgy3.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-DoI0Uif_.js";import"./utils-BQHNewu7.js";import"./messages-DjGyE838.js";import"./index-CXnRjH8B.js";import"./button-Hr06p1oo.js";import"./index-TRL40uGk.js";import"./index-CbrrYdDf.js";import"./index-LHNt3CwB.js";const G={title:"Organisms/RoadmapGenerationForm",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onGenerate:e=>{console.log("Generate roadmap with prompt:",e)},onCancel:()=>{console.log("Cancel generation")},isLoading:!1}},r={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

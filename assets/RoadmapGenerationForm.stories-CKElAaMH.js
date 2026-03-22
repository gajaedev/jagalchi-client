import{R as a}from"./index-iOnhCW0-.js";import"./jsx-runtime-BEqmdTfa.js";import"./iframe-CvCQzbQ1.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-DFVy6rSf.js";import"./utils-CDN07tui.js";import"./messages-tw_n8aWb.js";import"./index-Cd6dcAaS.js";import"./button-By2y3iRt.js";import"./index-4LaE-wf4.js";import"./index-C1va87JV.js";import"./index-B_jtOnfb.js";const G={title:"Organisms/RoadmapGenerationForm",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onGenerate:e=>{console.log("Generate roadmap with prompt:",e)},onCancel:()=>{console.log("Cancel generation")},isLoading:!1}},r={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

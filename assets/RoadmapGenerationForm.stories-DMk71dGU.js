import{R as a}from"./index-B1LGoDMV.js";import"./jsx-runtime-NR5HSwzz.js";import"./iframe-CHkYBSRy.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-CvrMWPgs.js";import"./utils-BQHNewu7.js";import"./messages-CH4G1w8F.js";import"./index-7SgLRIXN.js";import"./button-CHCXwLUV.js";import"./index-B0L1LgLn.js";import"./index-CWv-Fqa_.js";import"./index-LHNt3CwB.js";const G={title:"Organisms/RoadmapGenerationForm",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onGenerate:e=>{console.log("Generate roadmap with prompt:",e)},onCancel:()=>{console.log("Cancel generation")},isLoading:!1}},r={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

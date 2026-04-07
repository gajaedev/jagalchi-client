import{R as a}from"./index-qL0I6IIO.js";import"./jsx-runtime-C4xS7gjl.js";import"./iframe-CE93TRsj.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-a0e5mpVO.js";import"./utils-BQHNewu7.js";import"./messages-CH4G1w8F.js";import"./index-DMLchs6I.js";import"./button-D7lkkUql.js";import"./index-i2_P0iWE.js";import"./index-BqdCeBAm.js";import"./index-LHNt3CwB.js";const G={title:"Organisms/RoadmapGenerationForm",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onGenerate:e=>{console.log("Generate roadmap with prompt:",e)},onCancel:()=>{console.log("Cancel generation")},isLoading:!1}},r={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

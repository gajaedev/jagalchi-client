import{R as a}from"./index-Brprys4d.js";import"./jsx-runtime-D0ZP9ShM.js";import"./iframe-Dc48HFqB.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-DQLFRMGj.js";import"./utils-BQHNewu7.js";import"./messages-2lV3EpJ0.js";import"./index-DeEpC8gs.js";import"./button-Bjg-JJEp.js";import"./index-B5OcGX6w.js";import"./index-TBSC8cfB.js";import"./index-LHNt3CwB.js";const G={title:"Organisms/RoadmapGenerationForm",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onGenerate:e=>{console.log("Generate roadmap with prompt:",e)},onCancel:()=>{console.log("Cancel generation")},isLoading:!1}},r={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

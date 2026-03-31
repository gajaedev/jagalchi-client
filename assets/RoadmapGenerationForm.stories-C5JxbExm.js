import{R as a}from"./index-CN6h67Nx.js";import"./jsx-runtime-CKc7U6XQ.js";import"./iframe-CucAqyq3.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-zAXtdJ0B.js";import"./utils-BQHNewu7.js";import"./messages-tw_n8aWb.js";import"./index-DXJeP5JW.js";import"./button-C6avzqQ5.js";import"./index-BvZMuoGR.js";import"./index-1pqMqqqI.js";import"./index-LHNt3CwB.js";const G={title:"Organisms/RoadmapGenerationForm",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onGenerate:e=>{console.log("Generate roadmap with prompt:",e)},onCancel:()=>{console.log("Cancel generation")},isLoading:!1}},r={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

import{R as a}from"./index-C-8mnpJr.js";import"./jsx-runtime-DzmlkZa1.js";import"./iframe-Ca-YxJOr.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-CiSc9RJy.js";import"./utils-BQHNewu7.js";import"./messages-tw_n8aWb.js";import"./index-C52ojKBY.js";import"./button-DIC14KoC.js";import"./index-G9H5bQaU.js";import"./index-Cylo4i7r.js";import"./index-LHNt3CwB.js";const G={title:"Organisms/RoadmapGenerationForm",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onGenerate:e=>{console.log("Generate roadmap with prompt:",e)},onCancel:()=>{console.log("Cancel generation")},isLoading:!1}},r={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

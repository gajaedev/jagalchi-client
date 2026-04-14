import{R as a}from"./index-D8laZ_5D.js";import"./jsx-runtime-DQ6mrSjD.js";import"./iframe-CDDQQDDz.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-CvQYxMKV.js";import"./utils-BQHNewu7.js";import"./messages-2lV3EpJ0.js";import"./index-DJsAl42S.js";import"./button-DAB1FM_i.js";import"./index-DF6K5niN.js";import"./index-BuQRkUE6.js";import"./index-LHNt3CwB.js";const G={title:"Organisms/RoadmapGenerationForm",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onGenerate:e=>{console.log("Generate roadmap with prompt:",e)},onCancel:()=>{console.log("Cancel generation")},isLoading:!1}},r={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

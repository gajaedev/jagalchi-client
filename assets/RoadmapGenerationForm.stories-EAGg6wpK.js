import{R as a}from"./index-B-1PMRyB.js";import"./jsx-runtime-DgpJom-r.js";import"./iframe-DnfOKhIP.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-BfJcnLWu.js";import"./utils-CDN07tui.js";import"./messages-tw_n8aWb.js";import"./index-GEilZPc1.js";import"./button-BHU1OHnS.js";import"./index-DaXlp8IE.js";import"./index-vRESLaZs.js";import"./index-B_jtOnfb.js";const G={title:"Organisms/RoadmapGenerationForm",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onGenerate:e=>{console.log("Generate roadmap with prompt:",e)},onCancel:()=>{console.log("Cancel generation")},isLoading:!1}},r={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

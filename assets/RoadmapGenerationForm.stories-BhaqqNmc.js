import{R as a}from"./index-BI6DlGgr.js";import"./jsx-runtime-CA4urzy9.js";import"./iframe-CMhSVNTD.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-CecOUBrd.js";import"./utils-CDN07tui.js";import"./messages-tw_n8aWb.js";import"./index-DmAq0u8U.js";import"./button-XnubpZKh.js";import"./index-2tFTs434.js";import"./index-nrUbuldD.js";import"./index-B_jtOnfb.js";const G={title:"Organisms/RoadmapGenerationForm",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onGenerate:e=>{console.log("Generate roadmap with prompt:",e)},onCancel:()=>{console.log("Cancel generation")},isLoading:!1}},r={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

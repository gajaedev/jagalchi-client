import{R as a}from"./index-YGvtwSua.js";import"./jsx-runtime-z2zEYQyt.js";import"./iframe-CjPr2G2Y.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-KqJIOSvV.js";import"./utils-CDN07tui.js";import"./messages-tw_n8aWb.js";import"./index-DXqahXQz.js";import"./button-BSkmYWpy.js";import"./index-DocN_GDi.js";import"./index-C6kXiWpW.js";import"./index-B_jtOnfb.js";const G={title:"Organisms/RoadmapGenerationForm",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onGenerate:e=>{console.log("Generate roadmap with prompt:",e)},onCancel:()=>{console.log("Cancel generation")},isLoading:!1}},r={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

import{R as t}from"./index-sRspamMM.js";import"./jsx-runtime-CA4urzy9.js";import"./iframe-CMhSVNTD.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-CecOUBrd.js";import"./utils-CDN07tui.js";import"./messages-tw_n8aWb.js";import"./index-DmAq0u8U.js";import"./button-XnubpZKh.js";import"./index-2tFTs434.js";import"./index-nrUbuldD.js";import"./index-B_jtOnfb.js";const L={title:"Organisms/RoadmapModificationForm",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onModify:r=>{console.log("Modify roadmap with prompt:",r)},onCancel:()=>{console.log("Cancel modification")},isLoading:!1}},a={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    onModify: (prompt: string) => {
      console.log('Modify roadmap with prompt:', prompt);
    },
    onCancel: () => {
      console.log('Cancel modification');
    },
    isLoading: false
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    isLoading: true
  }
}`,...a.parameters?.docs?.source}}};const M=["Default","Loading"];export{o as Default,a as Loading,M as __namedExportsOrder,L as default};

import{R as t}from"./index-DDKKqQJt.js";import"./jsx-runtime-M55VZtkB.js";import"./iframe-BVpH2qiX.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-m_hB1s72.js";import"./utils-CDN07tui.js";import"./messages-tw_n8aWb.js";import"./index-B2oh2pNS.js";import"./button-BksZF21V.js";import"./index-D9VEBznz.js";import"./index-agfR_ojh.js";import"./index-B_jtOnfb.js";const L={title:"Organisms/RoadmapModificationForm",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onModify:r=>{console.log("Modify roadmap with prompt:",r)},onCancel:()=>{console.log("Cancel modification")},isLoading:!1}},a={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

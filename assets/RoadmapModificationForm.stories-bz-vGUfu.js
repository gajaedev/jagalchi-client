import{R as t}from"./index-vqRwtBO6.js";import"./jsx-runtime-DtzCM18y.js";import"./iframe-BY0TrE16.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-DODC1LyF.js";import"./utils-CDN07tui.js";import"./messages-tw_n8aWb.js";import"./index-IS3N3H8F.js";import"./button-CIQepC7X.js";import"./index-DRjnCd_H.js";import"./index-Dj1EL8Bq.js";import"./index-B_jtOnfb.js";const L={title:"Organisms/RoadmapModificationForm",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onModify:r=>{console.log("Modify roadmap with prompt:",r)},onCancel:()=>{console.log("Cancel modification")},isLoading:!1}},a={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

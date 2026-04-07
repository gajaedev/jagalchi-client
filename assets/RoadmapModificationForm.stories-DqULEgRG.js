import{R as t}from"./index-CYYPVOh5.js";import"./jsx-runtime-CujvsigE.js";import"./iframe-DB83Vc0b.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-Bc28Jh92.js";import"./utils-BQHNewu7.js";import"./messages-BHrjcws9.js";import"./index-MA_PJCPb.js";import"./button-JychSIOV.js";import"./index-CwWRRZiP.js";import"./index-DQOEezFz.js";import"./index-LHNt3CwB.js";const L={title:"Organisms/RoadmapModificationForm",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onModify:r=>{console.log("Modify roadmap with prompt:",r)},onCancel:()=>{console.log("Cancel modification")},isLoading:!1}},a={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

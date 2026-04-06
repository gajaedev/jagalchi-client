import{R as t}from"./index-CIjeF3cK.js";import"./jsx-runtime-CImd0PQU.js";import"./iframe-ZYk7C0JA.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-BEUKmJ1N.js";import"./utils-BQHNewu7.js";import"./messages-DAe6dRr0.js";import"./index-DIfYqNrp.js";import"./button-CRnZ55wM.js";import"./index-B1LeaSaG.js";import"./index-D3QTKoje.js";import"./index-LHNt3CwB.js";const L={title:"Organisms/RoadmapModificationForm",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onModify:r=>{console.log("Modify roadmap with prompt:",r)},onCancel:()=>{console.log("Cancel modification")},isLoading:!1}},a={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

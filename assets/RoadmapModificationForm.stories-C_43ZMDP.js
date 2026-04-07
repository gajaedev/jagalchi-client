import{R as t}from"./index-D7sGXBkB.js";import"./jsx-runtime-BmOk0bVY.js";import"./iframe-0OvX-p8O.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-DKeF-h73.js";import"./utils-BQHNewu7.js";import"./messages-BHrjcws9.js";import"./index-3jPtRF3J.js";import"./button-Dxus8snA.js";import"./index-bcbK0Eb8.js";import"./index-B3sPHhIA.js";import"./index-LHNt3CwB.js";const L={title:"Organisms/RoadmapModificationForm",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onModify:r=>{console.log("Modify roadmap with prompt:",r)},onCancel:()=>{console.log("Cancel modification")},isLoading:!1}},a={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

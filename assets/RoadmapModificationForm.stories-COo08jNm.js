import{R as t}from"./index-B_EbsAlZ.js";import"./jsx-runtime-BCDARHuB.js";import"./iframe-CGOFGZ74.js";import"./preload-helper-PPVm8Dsz.js";import"./textarea-CPoKp-bJ.js";import"./utils-BQHNewu7.js";import"./messages-2lV3EpJ0.js";import"./index-Nc9k47Ev.js";import"./button-BiEFd3xI.js";import"./index-CyqZYS1i.js";import"./index-Q5z864Kg.js";import"./index-LHNt3CwB.js";const L={title:"Organisms/RoadmapModificationForm",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{onModify:r=>{console.log("Modify roadmap with prompt:",r)},onCancel:()=>{console.log("Cancel modification")},isLoading:!1}},a={args:{...o.args,isLoading:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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

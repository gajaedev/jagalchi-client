import{n as e}from"./chunk-BEldbCjX.js";import{n as t,t as n}from"./RoadmapModificationForm-0wzkFFnY.js";var r,i,a,o;e((()=>{t(),r={title:`Organisms/RoadmapModificationForm`,component:n,parameters:{layout:`centered`},tags:[`autodocs`]},i={args:{onModify:e=>{console.log(`Modify roadmap with prompt:`,e)},onCancel:()=>{console.log(`Cancel modification`)},isLoading:!1}},a={args:{...i.args,isLoading:!0}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    onModify: (prompt: string) => {
      console.log('Modify roadmap with prompt:', prompt);
    },
    onCancel: () => {
      console.log('Cancel modification');
    },
    isLoading: false
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    isLoading: true
  }
}`,...a.parameters?.docs?.source}}},o=[`Default`,`Loading`]}))();export{i as Default,a as Loading,o as __namedExportsOrder,r as default};
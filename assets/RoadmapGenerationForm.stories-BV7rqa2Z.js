import{t as e}from"./RoadmapGenerationForm-RH9TDUKu.js";var t={title:`Organisms/RoadmapGenerationForm`,component:e,parameters:{layout:`centered`},tags:[`autodocs`]},n={args:{onGenerate:e=>{console.log(`Generate roadmap with prompt:`,e)},onCancel:()=>{console.log(`Cancel generation`)},isLoading:!1}},r={args:{...n.args,isLoading:!0}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    onGenerate: (prompt: string) => {
      console.log('Generate roadmap with prompt:', prompt);
    },
    onCancel: () => {
      console.log('Cancel generation');
    },
    isLoading: false
  }
}`,...n.parameters?.docs?.source}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    isLoading: true
  }
}`,...r.parameters?.docs?.source}}};var i=[`Default`,`Loading`];export{n as Default,r as Loading,i as __namedExportsOrder,t as default};
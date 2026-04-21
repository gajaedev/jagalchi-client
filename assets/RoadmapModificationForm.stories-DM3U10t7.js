import{t as e}from"./RoadmapModificationForm-CYi2iWej.js";var t={title:`Organisms/RoadmapModificationForm`,component:e,parameters:{layout:`centered`},tags:[`autodocs`]},n={args:{onModify:e=>{console.log(`Modify roadmap with prompt:`,e)},onCancel:()=>{console.log(`Cancel modification`)},isLoading:!1}},r={args:{...n.args,isLoading:!0}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    onModify: (prompt: string) => {
      console.log('Modify roadmap with prompt:', prompt);
    },
    onCancel: () => {
      console.log('Cancel modification');
    },
    isLoading: false
  }
}`,...n.parameters?.docs?.source}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    isLoading: true
  }
}`,...r.parameters?.docs?.source}}};var i=[`Default`,`Loading`];export{n as Default,r as Loading,i as __namedExportsOrder,t as default};
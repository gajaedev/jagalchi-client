import{n as e,o as t}from"./chunk-BEldbCjX.js";import{C as n,J as r}from"./iframe-BW17Ef0A.js";import{n as i,t as a}from"./esm-BhyKhyTW.js";import{n as o,t as s}from"./ColorSelector-fivYP-8K.js";function c(e){let[t,n]=(0,d.useState)(`blue`);return(0,u.jsx)(s,{...e,currentVariant:t,onPresetSelect:e=>{n(e),console.log(`Selected preset:`,e)}})}function l(e){let[t,n]=(0,d.useState)(`white`);return(0,u.jsx)(s,{...e,currentVariant:t,onPresetSelect:e=>{n(e),console.log(`Selected preset:`,e)}})}var u,d,f,p,m,h,g,_,v,y,b,x,S,C;e((()=>{u=n(),a(),d=t(r()),o(),f={title:`Features/RoadmapEditor/Molecules/ColorSelector`,component:s,parameters:{layout:`padded`},tags:[`autodocs`],decorators:[e=>(0,u.jsx)(i,{children:(0,u.jsx)(`div`,{className:`w-[300px]`,children:(0,u.jsx)(e,{})})})]},p=[{variant:`white`,hex:`#ffffff`,label:`White`},{variant:`black`,hex:`#000000`,label:`Black`},{variant:`blue`,hex:`#155dfc`,label:`Blue`},{variant:`purple`,hex:`#9810fa`,label:`Purple`},{variant:`red`,hex:`#ec003f`,label:`Red`},{variant:`orange`,hex:`#e17100`,label:`Orange`}],m=[{variant:`white`,hex:`#ffffff`,label:`White`},{variant:`black`,hex:`#000000`,label:`Black`},{variant:`blue`,hex:`#155dfc`,label:`Blue`},{variant:`purple`,hex:`#9810fa`,label:`Purple`},{variant:`red`,hex:`#ec003f`,label:`Red`},{variant:`orange`,hex:`#e17100`,label:`Orange`}],h={args:{type:`node`,nodeId:`node-1`,currentVariant:`blue`,presets:p,onPresetSelect:e=>console.log(`Selected preset:`,e)}},g={args:{type:`node`,nodeId:`node-1`,currentVariant:`white`,presets:p,onPresetSelect:e=>console.log(`Selected preset:`,e)}},_={args:{type:`node`,nodeId:`node-1`,currentVariant:`black`,presets:p,onPresetSelect:e=>console.log(`Selected preset:`,e)}},v={args:{type:`node`,nodeId:`node-1`,currentVariant:`purple`,presets:p,onPresetSelect:e=>console.log(`Selected preset:`,e)}},y={args:{type:`text`,nodeId:`text-1`,currentVariant:`white`,presets:m,onPresetSelect:e=>console.log(`Selected preset:`,e)}},b={args:{type:`text`,nodeId:`text-1`,currentVariant:`red`,presets:m,onPresetSelect:e=>console.log(`Selected preset:`,e)}},x={render:e=>(0,u.jsx)(c,{...e}),args:{type:`node`,nodeId:`node-1`,currentVariant:`blue`,presets:p,onPresetSelect:e=>console.log(`Selected preset:`,e)}},S={render:e=>(0,u.jsx)(l,{...e}),args:{type:`text`,nodeId:`text-1`,currentVariant:`white`,presets:m,onPresetSelect:e=>console.log(`Selected preset:`,e)}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'blue',
    presets: nodeColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'white',
    presets: nodeColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'black',
    presets: nodeColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'purple',
    presets: nodeColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'text',
    nodeId: 'text-1',
    currentVariant: 'white',
    presets: textColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'text',
    nodeId: 'text-1',
    currentVariant: 'red',
    presets: textColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => <InteractiveColorSelector {...args} />,
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'blue',
    presets: nodeColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => <InteractiveTextColorSelector {...args} />,
  args: {
    type: 'text',
    nodeId: 'text-1',
    currentVariant: 'white',
    presets: textColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...S.parameters?.docs?.source}}},C=[`Default`,`NodeWhite`,`NodeBlack`,`NodePurple`,`TextWhite`,`TextRed`,`Interactive`,`InteractiveText`]}))();export{h as Default,x as Interactive,S as InteractiveText,_ as NodeBlack,v as NodePurple,g as NodeWhite,b as TextRed,y as TextWhite,C as __namedExportsOrder,f as default};
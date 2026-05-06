import{a as e}from"./chunk-gsjJvkCQ.js";import{t}from"./react-aNIrFo1u.js";import{h as n}from"./iframe-B5Kp-Gqb.js";import{t as r}from"./react-DWIWHWNb.js";import{t as i}from"./ColorSelector-DUEVgdtd.js";var a=n(),o=e(t()),s={title:`Features/RoadmapEditor/Molecules/ColorSelector`,component:i,parameters:{layout:`padded`},tags:[`autodocs`],decorators:[e=>(0,a.jsx)(r,{children:(0,a.jsx)(`div`,{className:`w-[300px]`,children:(0,a.jsx)(e,{})})})]},c=[{variant:`white`,hex:`#ffffff`,label:`White`},{variant:`black`,hex:`#000000`,label:`Black`},{variant:`blue`,hex:`#155dfc`,label:`Blue`},{variant:`purple`,hex:`#9810fa`,label:`Purple`},{variant:`red`,hex:`#ec003f`,label:`Red`},{variant:`orange`,hex:`#e17100`,label:`Orange`}],l=[{variant:`white`,hex:`#ffffff`,label:`White`},{variant:`black`,hex:`#000000`,label:`Black`},{variant:`blue`,hex:`#155dfc`,label:`Blue`},{variant:`purple`,hex:`#9810fa`,label:`Purple`},{variant:`red`,hex:`#ec003f`,label:`Red`},{variant:`orange`,hex:`#e17100`,label:`Orange`}],u={args:{type:`node`,nodeId:`node-1`,currentVariant:`blue`,presets:c,onPresetSelect:e=>console.log(`Selected preset:`,e)}},d={args:{type:`node`,nodeId:`node-1`,currentVariant:`white`,presets:c,onPresetSelect:e=>console.log(`Selected preset:`,e)}},f={args:{type:`node`,nodeId:`node-1`,currentVariant:`black`,presets:c,onPresetSelect:e=>console.log(`Selected preset:`,e)}},p={args:{type:`node`,nodeId:`node-1`,currentVariant:`purple`,presets:c,onPresetSelect:e=>console.log(`Selected preset:`,e)}},m={args:{type:`text`,nodeId:`text-1`,currentVariant:`white`,presets:l,onPresetSelect:e=>console.log(`Selected preset:`,e)}},h={args:{type:`text`,nodeId:`text-1`,currentVariant:`red`,presets:l,onPresetSelect:e=>console.log(`Selected preset:`,e)}};function g(e){let[t,n]=(0,o.useState)(`blue`);return(0,a.jsx)(i,{...e,currentVariant:t,onPresetSelect:e=>{n(e),console.log(`Selected preset:`,e)}})}var _={render:e=>(0,a.jsx)(g,{...e}),args:{type:`node`,nodeId:`node-1`,currentVariant:`blue`,presets:c,onPresetSelect:e=>console.log(`Selected preset:`,e)}};function v(e){let[t,n]=(0,o.useState)(`white`);return(0,a.jsx)(i,{...e,currentVariant:t,onPresetSelect:e=>{n(e),console.log(`Selected preset:`,e)}})}var y={render:e=>(0,a.jsx)(v,{...e}),args:{type:`text`,nodeId:`text-1`,currentVariant:`white`,presets:l,onPresetSelect:e=>console.log(`Selected preset:`,e)}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'blue',
    presets: nodeColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'white',
    presets: nodeColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'black',
    presets: nodeColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'purple',
    presets: nodeColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'text',
    nodeId: 'text-1',
    currentVariant: 'white',
    presets: textColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'text',
    nodeId: 'text-1',
    currentVariant: 'red',
    presets: textColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...h.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => <InteractiveColorSelector {...args} />,
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'blue',
    presets: nodeColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,..._.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => <InteractiveTextColorSelector {...args} />,
  args: {
    type: 'text',
    nodeId: 'text-1',
    currentVariant: 'white',
    presets: textColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...y.parameters?.docs?.source}}};var b=[`Default`,`NodeWhite`,`NodeBlack`,`NodePurple`,`TextWhite`,`TextRed`,`Interactive`,`InteractiveText`];export{u as Default,_ as Interactive,y as InteractiveText,f as NodeBlack,p as NodePurple,d as NodeWhite,h as TextRed,m as TextWhite,b as __namedExportsOrder,s as default};
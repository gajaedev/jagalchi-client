import{j as r}from"./jsx-runtime-D0ZP9ShM.js";import{r as x}from"./iframe-Dc48HFqB.js";import{C as S}from"./index-CNNipX8U.js";import{P as v}from"./react-YYGR1x1a.js";import"./preload-helper-PPVm8Dsz.js";import"./messages-2lV3EpJ0.js";import"./editor-atoms-X1xpa2Ov.js";import"./index-Cw9Hy5xH.js";import"./utils-BQHNewu7.js";import"./createLucideIcon-BpyJ6sFd.js";const N={title:"Features/RoadmapEditor/Molecules/ColorSelector",component:S,parameters:{layout:"padded"},tags:["autodocs"],decorators:[e=>r.jsx(v,{children:r.jsx("div",{className:"w-[300px]",children:r.jsx(e,{})})})]},o=[{variant:"white",hex:"#ffffff",label:"White"},{variant:"black",hex:"#000000",label:"Black"},{variant:"blue",hex:"#155dfc",label:"Blue"},{variant:"purple",hex:"#9810fa",label:"Purple"},{variant:"red",hex:"#ec003f",label:"Red"},{variant:"orange",hex:"#e17100",label:"Orange"}],g=[{variant:"white",hex:"#ffffff",label:"White"},{variant:"black",hex:"#000000",label:"Black"},{variant:"blue",hex:"#155dfc",label:"Blue"},{variant:"purple",hex:"#9810fa",label:"Purple"},{variant:"red",hex:"#ec003f",label:"Red"},{variant:"orange",hex:"#e17100",label:"Orange"}],n={args:{type:"node",nodeId:"node-1",currentVariant:"blue",presets:o,onPresetSelect:e=>console.log("Selected preset:",e)}},a={args:{type:"node",nodeId:"node-1",currentVariant:"white",presets:o,onPresetSelect:e=>console.log("Selected preset:",e)}},s={args:{type:"node",nodeId:"node-1",currentVariant:"black",presets:o,onPresetSelect:e=>console.log("Selected preset:",e)}},c={args:{type:"node",nodeId:"node-1",currentVariant:"purple",presets:o,onPresetSelect:e=>console.log("Selected preset:",e)}},l={args:{type:"text",nodeId:"text-1",currentVariant:"white",presets:g,onPresetSelect:e=>console.log("Selected preset:",e)}},d={args:{type:"text",nodeId:"text-1",currentVariant:"red",presets:g,onPresetSelect:e=>console.log("Selected preset:",e)}};function P(e){const[u,m]=x.useState("blue");return r.jsx(S,{...e,currentVariant:u,onPresetSelect:t=>{m(t),console.log("Selected preset:",t)}})}const p={render:e=>r.jsx(P,{...e}),args:{type:"node",nodeId:"node-1",currentVariant:"blue",presets:o,onPresetSelect:e=>console.log("Selected preset:",e)}};function h(e){const[u,m]=x.useState("white");return r.jsx(S,{...e,currentVariant:u,onPresetSelect:t=>{m(t),console.log("Selected preset:",t)}})}const i={render:e=>r.jsx(h,{...e}),args:{type:"text",nodeId:"text-1",currentVariant:"white",presets:g,onPresetSelect:e=>console.log("Selected preset:",e)}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'blue',
    presets: nodeColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'white',
    presets: nodeColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'black',
    presets: nodeColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'purple',
    presets: nodeColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'text',
    nodeId: 'text-1',
    currentVariant: 'white',
    presets: textColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'text',
    nodeId: 'text-1',
    currentVariant: 'red',
    presets: textColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => <InteractiveColorSelector {...args} />,
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'blue',
    presets: nodeColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => <InteractiveTextColorSelector {...args} />,
  args: {
    type: 'text',
    nodeId: 'text-1',
    currentVariant: 'white',
    presets: textColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...i.parameters?.docs?.source}}};const B=["Default","NodeWhite","NodeBlack","NodePurple","TextWhite","TextRed","Interactive","InteractiveText"];export{n as Default,p as Interactive,i as InteractiveText,s as NodeBlack,c as NodePurple,a as NodeWhite,d as TextRed,l as TextWhite,B as __namedExportsOrder,N as default};

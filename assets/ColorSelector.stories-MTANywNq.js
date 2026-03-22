import{j as r}from"./jsx-runtime-D3OVLXPq.js";import{r as x}from"./iframe-BJu3r5RO.js";import{C as m}from"./index-BLhzRv1T.js";import{P as v}from"./react-BqY0U7aR.js";import"./preload-helper-PPVm8Dsz.js";import"./messages-tw_n8aWb.js";import"./editor-atoms-BmOb1dGV.js";import"./index-ztWJvzgb.js";import"./utils-CDN07tui.js";import"./createLucideIcon-9Ii3YprA.js";const B={title:"Features/RoadmapEditor/Molecules/ColorSelector",component:m,parameters:{layout:"padded"},tags:["autodocs"],decorators:[e=>r.jsx(v,{children:r.jsx("div",{className:"w-[300px]",children:r.jsx(e,{})})})]},o=[{variant:"white",hex:"#ffffff",label:"White"},{variant:"black",hex:"#000000",label:"Black"},{variant:"blue",hex:"#155dfc",label:"Blue"},{variant:"purple",hex:"#9810fa",label:"Purple"},{variant:"red",hex:"#ec003f",label:"Red"},{variant:"orange",hex:"#e17100",label:"Orange"}],S=[{variant:"gray",hex:"#64748b",label:"Gray"},{variant:"black",hex:"#000000",label:"Black"},{variant:"blue",hex:"#155dfc",label:"Blue"},{variant:"purple",hex:"#9810fa",label:"Purple"},{variant:"red",hex:"#ec003f",label:"Red"},{variant:"orange",hex:"#e17100",label:"Orange"}],n={args:{type:"node",nodeId:"node-1",currentVariant:"blue",presets:o,onPresetSelect:e=>console.log("Selected preset:",e)}},a={args:{type:"node",nodeId:"node-1",currentVariant:"white",presets:o,onPresetSelect:e=>console.log("Selected preset:",e)}},s={args:{type:"node",nodeId:"node-1",currentVariant:"black",presets:o,onPresetSelect:e=>console.log("Selected preset:",e)}},c={args:{type:"node",nodeId:"node-1",currentVariant:"purple",presets:o,onPresetSelect:e=>console.log("Selected preset:",e)}},l={args:{type:"text",nodeId:"text-1",currentVariant:"gray",presets:S,onPresetSelect:e=>console.log("Selected preset:",e)}},d={args:{type:"text",nodeId:"text-1",currentVariant:"red",presets:S,onPresetSelect:e=>console.log("Selected preset:",e)}};function P(e){const[u,g]=x.useState("blue");return r.jsx(m,{...e,currentVariant:u,onPresetSelect:t=>{g(t),console.log("Selected preset:",t)}})}const p={render:e=>r.jsx(P,{...e}),args:{type:"node",nodeId:"node-1",currentVariant:"blue",presets:o,onPresetSelect:e=>console.log("Selected preset:",e)}};function y(e){const[u,g]=x.useState("gray");return r.jsx(m,{...e,currentVariant:u,onPresetSelect:t=>{g(t),console.log("Selected preset:",t)}})}const i={render:e=>r.jsx(y,{...e}),args:{type:"text",nodeId:"text-1",currentVariant:"gray",presets:S,onPresetSelect:e=>console.log("Selected preset:",e)}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
    currentVariant: 'gray',
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
    currentVariant: 'gray',
    presets: textColorPresets,
    onPresetSelect: variant => console.log('Selected preset:', variant)
  }
}`,...i.parameters?.docs?.source}}};const R=["Default","NodeWhite","NodeBlack","NodePurple","TextGray","TextRed","Interactive","InteractiveText"];export{n as Default,p as Interactive,i as InteractiveText,s as NodeBlack,c as NodePurple,a as NodeWhite,l as TextGray,d as TextRed,R as __namedExportsOrder,B as default};

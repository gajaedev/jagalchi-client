import{j as r}from"./jsx-runtime-NR5HSwzz.js";import{C as s}from"./index-DjgIcaFv.js";import"./iframe-CHkYBSRy.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-BQHNewu7.js";const u={title:"Editor/Atoms/ColorPresetButton",component:s,parameters:{layout:"centered"},tags:["autodocs"]},e={WHITE:"#ffffff",BLACK:"#000000",BLUE:"#155dfc",PURPLE:"#9810fa",RED:"#ec003f",ORANGE:"#e17100"},o={args:{color:e.WHITE,isSelected:!1}},a={args:{color:e.BLACK,isSelected:!1}},c={args:{color:e.BLUE,isSelected:!1}},t={args:{color:e.BLUE,isSelected:!0}},l={args:{color:e.PURPLE,isSelected:!1}},n={args:{color:e.RED,isSelected:!1}},E={args:{color:e.ORANGE,isSelected:!1}},d={args:{color:e.WHITE,isSelected:!1},render:()=>r.jsxs("div",{className:"flex w-[240px] gap-1",children:[r.jsx(s,{color:e.WHITE}),r.jsx(s,{color:e.BLACK}),r.jsx(s,{color:e.BLUE,isSelected:!0}),r.jsx(s,{color:e.PURPLE}),r.jsx(s,{color:e.RED}),r.jsx(s,{color:e.ORANGE})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    color: PRESET_COLORS.WHITE,
    isSelected: false
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    color: PRESET_COLORS.BLACK,
    isSelected: false
  }
}`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    color: PRESET_COLORS.BLUE,
    isSelected: false
  }
}`,...c.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    color: PRESET_COLORS.BLUE,
    isSelected: true
  }
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    color: PRESET_COLORS.PURPLE,
    isSelected: false
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    color: PRESET_COLORS.RED,
    isSelected: false
  }
}`,...n.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    color: PRESET_COLORS.ORANGE,
    isSelected: false
  }
}`,...E.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    color: PRESET_COLORS.WHITE,
    isSelected: false
  },
  render: () => <div className="flex w-[240px] gap-1">
      <ColorPresetButton color={PRESET_COLORS.WHITE} />
      <ColorPresetButton color={PRESET_COLORS.BLACK} />
      <ColorPresetButton color={PRESET_COLORS.BLUE} isSelected />
      <ColorPresetButton color={PRESET_COLORS.PURPLE} />
      <ColorPresetButton color={PRESET_COLORS.RED} />
      <ColorPresetButton color={PRESET_COLORS.ORANGE} />
    </div>
}`,...d.parameters?.docs?.source}}};const O=["White","Black","Blue","BlueSelected","Purple","Red","Orange","AllPresets"];export{d as AllPresets,a as Black,c as Blue,t as BlueSelected,E as Orange,l as Purple,n as Red,o as White,O as __namedExportsOrder,u as default};

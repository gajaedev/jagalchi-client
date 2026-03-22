import{j as r}from"./jsx-runtime-BDgSbgkY.js";import{C as p}from"./index-Bc1NicYR.js";import{i as t,c as s}from"./editor-atoms-DpppLl8U.js";import{P as o}from"./react-DzDX814S.js";import{u}from"./utils-D6jOgdgv.js";import"./iframe-osWvdCVA.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Do2x555C.js";import"./button-DMdZjQos.js";import"./index-B9pUGwSj.js";import"./index-4iflbfGh.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-xGPmTjaO.js";import"./index-Ct1dQziz.js";import"./index-yv72MhYD.js";import"./index-D2kbmr77.js";import"./index-Bq-EI4XE.js";import"./createLucideIcon-B0UXS6j5.js";import"./messages-tw_n8aWb.js";const R={title:"Roadmap-Editor/Molecules/ColorPicker",component:p,parameters:{layout:"centered"},tags:["autodocs"],decorators:[e=>r.jsx(o,{children:r.jsx(e,{})})]};function a({initialValues:e,children:l}){return u(e),r.jsx(r.Fragment,{children:l})}const n={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!1],[s,null]],children:r.jsx(e,{})})})]},i={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"node",nodeId:"Node_1"}]],children:r.jsx(e,{})})})]},d={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"text",nodeId:"Text_1"}]],children:r.jsx(e,{})})})]},c={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"node",nodeId:"Node_1"}]],children:r.jsx(e,{})})})]},m={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"node",nodeId:"Node_2"}]],children:r.jsx(e,{})})})]};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[isColorPickerOpenAtom, false], [colorPickerTargetAtom, null]]}>
          <Story />
        </HydrateAtoms>
      </Provider>]
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[isColorPickerOpenAtom, true], [colorPickerTargetAtom, {
      type: 'node',
      nodeId: 'Node_1'
    }]]}>
          <Story />
        </HydrateAtoms>
      </Provider>]
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[isColorPickerOpenAtom, true], [colorPickerTargetAtom, {
      type: 'text',
      nodeId: 'Text_1'
    }]]}>
          <Story />
        </HydrateAtoms>
      </Provider>]
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[isColorPickerOpenAtom, true], [colorPickerTargetAtom, {
      type: 'node',
      nodeId: 'Node_1'
    }]]}>
          <Story />
        </HydrateAtoms>
      </Provider>]
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[isColorPickerOpenAtom, true], [colorPickerTargetAtom, {
      type: 'node',
      nodeId: 'Node_2'
    }]]}>
          <Story />
        </HydrateAtoms>
      </Provider>]
}`,...m.parameters?.docs?.source}}};const W=["Closed","OpenForNode","OpenForText","OpenWithBlueColor","OpenWithRedColor"];export{n as Closed,i as OpenForNode,d as OpenForText,c as OpenWithBlueColor,m as OpenWithRedColor,W as __namedExportsOrder,R as default};

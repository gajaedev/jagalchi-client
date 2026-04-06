import{j as r}from"./jsx-runtime-CImd0PQU.js";import{C as p}from"./index-B5Eb1Iua.js";import{i as t,c as s}from"./editor-atoms-VZUgavbP.js";import{P as o}from"./react-Bw9KH65i.js";import{u}from"./utils-e0AnrA__.js";import"./iframe-ZYk7C0JA.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Hsoz9MWM.js";import"./button-CRnZ55wM.js";import"./index-B1LeaSaG.js";import"./index-D3QTKoje.js";import"./index-LHNt3CwB.js";import"./utils-BQHNewu7.js";import"./dialog-BxgMQ9bf.js";import"./index-BS2p4VJC.js";import"./index-BsHL4KfI.js";import"./index-DzUwrPmA.js";import"./index-B0k-D2_O.js";import"./createLucideIcon-CK0x9mOM.js";import"./messages-DAe6dRr0.js";const R={title:"Roadmap-Editor/Molecules/ColorPicker",component:p,parameters:{layout:"centered"},tags:["autodocs"],decorators:[e=>r.jsx(o,{children:r.jsx(e,{})})]};function a({initialValues:e,children:l}){return u(e),r.jsx(r.Fragment,{children:l})}const n={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!1],[s,null]],children:r.jsx(e,{})})})]},i={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"node",nodeId:"Node_1"}]],children:r.jsx(e,{})})})]},d={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"text",nodeId:"Text_1"}]],children:r.jsx(e,{})})})]},c={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"node",nodeId:"Node_1"}]],children:r.jsx(e,{})})})]},m={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"node",nodeId:"Node_2"}]],children:r.jsx(e,{})})})]};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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

import{j as r}from"./jsx-runtime-CzdoZzdv.js";import{C as p}from"./index-B3um0dqn.js";import{i as t,c as s}from"./editor-atoms-D9a6shUJ.js";import{P as o}from"./react-4o2hLSFD.js";import{u}from"./utils-iUcsjEgX.js";import"./iframe-DAi1w4Di.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BA2pXZEw.js";import"./button-C7XtNtzq.js";import"./index-D5Y9Tksh.js";import"./index-C4hkHrHT.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-Am3gyvgL.js";import"./index-D8nYKNEl.js";import"./index-CzpIf3X5.js";import"./index-DDXKoHwn.js";import"./index-B2rqc7qh.js";import"./createLucideIcon-BymggnQN.js";import"./messages-tw_n8aWb.js";const R={title:"Roadmap-Editor/Molecules/ColorPicker",component:p,parameters:{layout:"centered"},tags:["autodocs"],decorators:[e=>r.jsx(o,{children:r.jsx(e,{})})]};function a({initialValues:e,children:l}){return u(e),r.jsx(r.Fragment,{children:l})}const n={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!1],[s,null]],children:r.jsx(e,{})})})]},i={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"node",nodeId:"Node_1"}]],children:r.jsx(e,{})})})]},d={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"text",nodeId:"Text_1"}]],children:r.jsx(e,{})})})]},c={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"node",nodeId:"Node_1"}]],children:r.jsx(e,{})})})]},m={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"node",nodeId:"Node_2"}]],children:r.jsx(e,{})})})]};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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

import{j as r}from"./jsx-runtime-D39_KJa-.js";import{C as p}from"./index-4ATTxj-k.js";import{i as t,c as s}from"./editor-atoms-gHCQ2R3K.js";import{P as o}from"./react-Kd3FdksL.js";import{u}from"./utils-Cndkbxdk.js";import"./iframe-BI6vm0ZH.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BFEfeEr1.js";import"./button-JQAKt4FE.js";import"./index-DE98NmtS.js";import"./index-B8_pLKYu.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-MGVUsn5g.js";import"./index-CMHEVa3e.js";import"./index-DgbppV2Z.js";import"./index-CWNVaN0m.js";import"./index-DGZIE4pr.js";import"./createLucideIcon-BUQ5OFIb.js";import"./messages-tw_n8aWb.js";const R={title:"Roadmap-Editor/Molecules/ColorPicker",component:p,parameters:{layout:"centered"},tags:["autodocs"],decorators:[e=>r.jsx(o,{children:r.jsx(e,{})})]};function a({initialValues:e,children:l}){return u(e),r.jsx(r.Fragment,{children:l})}const n={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!1],[s,null]],children:r.jsx(e,{})})})]},i={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"node",nodeId:"Node_1"}]],children:r.jsx(e,{})})})]},d={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"text",nodeId:"Text_1"}]],children:r.jsx(e,{})})})]},c={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"node",nodeId:"Node_1"}]],children:r.jsx(e,{})})})]},m={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"node",nodeId:"Node_2"}]],children:r.jsx(e,{})})})]};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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

import{j as r}from"./jsx-runtime-BEqmdTfa.js";import{C as p}from"./index-kOESuprT.js";import{i as t,c as s}from"./editor-atoms-BxKR_p-d.js";import{P as o}from"./react-CQQ_HU7J.js";import{u}from"./utils-DfAK31jd.js";import"./iframe-CvCQzbQ1.js";import"./preload-helper-PPVm8Dsz.js";import"./index-mU4_lS7r.js";import"./button-By2y3iRt.js";import"./index-4LaE-wf4.js";import"./index-C1va87JV.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./dialog-pJ2VX9Mk.js";import"./index-mHWDIXTO.js";import"./index-DoUzl7Z1.js";import"./index-Dx-8DjyV.js";import"./index-MDtNVUMk.js";import"./createLucideIcon-YcNgLmPt.js";import"./messages-tw_n8aWb.js";const R={title:"Roadmap-Editor/Molecules/ColorPicker",component:p,parameters:{layout:"centered"},tags:["autodocs"],decorators:[e=>r.jsx(o,{children:r.jsx(e,{})})]};function a({initialValues:e,children:l}){return u(e),r.jsx(r.Fragment,{children:l})}const n={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!1],[s,null]],children:r.jsx(e,{})})})]},i={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"node",nodeId:"Node_1"}]],children:r.jsx(e,{})})})]},d={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"text",nodeId:"Text_1"}]],children:r.jsx(e,{})})})]},c={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"node",nodeId:"Node_1"}]],children:r.jsx(e,{})})})]},m={decorators:[e=>r.jsx(o,{children:r.jsx(a,{initialValues:[[t,!0],[s,{type:"node",nodeId:"Node_2"}]],children:r.jsx(e,{})})})]};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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

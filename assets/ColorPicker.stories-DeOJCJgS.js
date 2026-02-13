import{j as e}from"./jsx-runtime-DdmxcLET.js";import{r as h}from"./iframe-BmpoGx1R.js";import{Z as S}from"./index-Crf-Vw0Z.js";import{B as P}from"./button-DjrUds_s.js";import{D as _,a as T,b as v,c as I,d as N}from"./dialog-CTFmchQt.js";import{E as x}from"./messages-DkLYveTE.js";import{i as r,c as t}from"./editor-atoms-WBMYccng.js";import{u as j,P as s}from"./react-DslAc1VT.js";import{u as E}from"./utils-DxyG6rPi.js";import"./preload-helper-PPVm8Dsz.js";import"./index-ChgYa-84.js";import"./index-Dv9gSYyR.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./index-C7gse5mp.js";import"./index-DwDeJz6h.js";import"./index-CwnMz2et.js";import"./index-BISvjkvE.js";import"./createLucideIcon-CRWMFQV_.js";const A=h.memo(function(){const[m,y]=j(r),[,g]=j(t),[p,O]=h.useState("#3b82f6"),f=()=>{u()},u=()=>{y(!1),g(null)},k=C=>{C?y(C):u()};return e.jsx(_,{open:m,onOpenChange:k,children:e.jsxs(T,{className:"sm:max-w-md",children:[e.jsx(v,{children:e.jsx(I,{children:x.COLOR_PICKER_TITLE})}),e.jsxs("div",{className:"flex flex-col gap-4 py-4",children:[e.jsx(S,{color:p,onChange:O}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"h-8 w-8 rounded border",style:{backgroundColor:p}}),e.jsx("span",{className:"font-mono text-sm",children:p})]})]}),e.jsxs(N,{children:[e.jsx(P,{variant:"outline",onClick:u,children:x.COLOR_PICKER_CANCEL}),e.jsx(P,{onClick:f,children:x.COLOR_PICKER_APPLY})]})]})})});A.__docgenInfo={description:"",methods:[],displayName:"ColorPicker"};const U={title:"Roadmap-Editor/Molecules/ColorPicker",component:A,parameters:{layout:"centered"},tags:["autodocs"],decorators:[o=>e.jsx(s,{children:e.jsx(o,{})})]};function n({initialValues:o,children:m}){return E(o),e.jsx(e.Fragment,{children:m})}const a={decorators:[o=>e.jsx(s,{children:e.jsx(n,{initialValues:[[r,!1],[t,null]],children:e.jsx(o,{})})})]},i={decorators:[o=>e.jsx(s,{children:e.jsx(n,{initialValues:[[r,!0],[t,{type:"node",nodeId:"Node_1"}]],children:e.jsx(o,{})})})]},d={decorators:[o=>e.jsx(s,{children:e.jsx(n,{initialValues:[[r,!0],[t,{type:"text",nodeId:"Text_1"}]],children:e.jsx(o,{})})})]},c={decorators:[o=>e.jsx(s,{children:e.jsx(n,{initialValues:[[r,!0],[t,{type:"node",nodeId:"Node_1"}]],children:e.jsx(o,{})})})]},l={decorators:[o=>e.jsx(s,{children:e.jsx(n,{initialValues:[[r,!0],[t,{type:"node",nodeId:"Node_2"}]],children:e.jsx(o,{})})})]};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[isColorPickerOpenAtom, false], [colorPickerTargetAtom, null]]}>
          <Story />
        </HydrateAtoms>
      </Provider>]
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[isColorPickerOpenAtom, true], [colorPickerTargetAtom, {
      type: 'node',
      nodeId: 'Node_2'
    }]]}>
          <Story />
        </HydrateAtoms>
      </Provider>]
}`,...l.parameters?.docs?.source}}};const X=["Closed","OpenForNode","OpenForText","OpenWithBlueColor","OpenWithRedColor"];export{a as Closed,i as OpenForNode,d as OpenForText,c as OpenWithBlueColor,l as OpenWithRedColor,X as __namedExportsOrder,U as default};

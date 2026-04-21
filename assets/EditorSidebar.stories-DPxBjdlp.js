import{h as e}from"./iframe-KS2JIGtR.js";import{t}from"./react-CrgLIR-9.js";import{d as n,o as r,r as i,u as a}from"./editor-atoms-y0Nl63eb.js";import{t as o}from"./EditorSidebar-DLQ5bP1G.js";import{t as s}from"./utils-XfxUJhRJ.js";var c=e();function l({initialValues:e,children:t}){return s(new Map(e)),t}var u={title:`Features/RoadmapEditor/Organisms/EditorSidebar`,component:o,parameters:{layout:`fullscreen`},tags:[`autodocs`]},d={id:`Node_1`,type:`jagalchi-node`,position:{x:0,y:0},data:{label:`프론트엔드 기초`,description:`HTML, CSS, JavaScript의 기본 개념을 학습합니다.`,variant:`blue`,isLocked:!1,resources:[`https://developer.mozilla.org/ko/docs/Learn`,``,``]}},f={id:`Section_1`,type:`jagalchi-section`,position:{x:0,y:0},data:{title:`기초 단계`,variant:`blue`,isLocked:!1}},p={id:`Text_1`,type:`jagalchi-text`,position:{x:0,y:0},data:{content:`학습 목표`,variant:`black`,fontSize:16,fontWeight:`normal`,isLocked:!1}},m={id:`Line_1`,source:`node-1`,target:`node-2`,style:{stroke:`#000000`}},h={decorators:[e=>(0,c.jsx)(t,{children:(0,c.jsx)(`div`,{className:`flex h-screen justify-end`,children:(0,c.jsx)(e,{})})})]},g={decorators:[e=>(0,c.jsx)(t,{children:(0,c.jsx)(l,{initialValues:[[r,[d]],[n,[`Node_1`]]],children:(0,c.jsx)(`div`,{className:`flex h-screen justify-end`,children:(0,c.jsx)(e,{})})})})]},_={decorators:[e=>(0,c.jsx)(t,{children:(0,c.jsx)(l,{initialValues:[[i,[m]],[a,[`Line_1`]]],children:(0,c.jsx)(`div`,{className:`flex h-screen justify-end`,children:(0,c.jsx)(e,{})})})})]},v={decorators:[e=>(0,c.jsx)(t,{children:(0,c.jsx)(l,{initialValues:[[r,[f]],[n,[`Section_1`]]],children:(0,c.jsx)(`div`,{className:`flex h-screen justify-end`,children:(0,c.jsx)(e,{})})})})]},y={decorators:[e=>(0,c.jsx)(t,{children:(0,c.jsx)(l,{initialValues:[[r,[p]],[n,[`Text_1`]]],children:(0,c.jsx)(`div`,{className:`flex h-screen justify-end`,children:(0,c.jsx)(e,{})})})})]},b={decorators:[e=>(0,c.jsx)(t,{children:(0,c.jsx)(l,{initialValues:[[r,[{...d,id:`node-1`},{...d,id:`node-2`,data:{...d.data,variant:`purple`}},{...d,id:`node-3`,data:{...d.data,variant:`red`}}]],[n,[`node-1`,`node-2`,`node-3`]]],children:(0,c.jsx)(`div`,{className:`flex h-screen justify-end`,children:(0,c.jsx)(e,{})})})})]};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <div className="flex h-screen justify-end">
          <Story />
        </div>
      </Provider>]
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[nodesAtom, [mockNode]], [selectedNodeIdsAtom, ['Node_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[edgesAtom, [mockEdge]], [selectedEdgeIdsAtom, ['Line_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[nodesAtom, [mockSection]], [selectedNodeIdsAtom, ['Section_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[nodesAtom, [mockText]], [selectedNodeIdsAtom, ['Text_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[nodesAtom, [{
      ...mockNode,
      id: 'node-1'
    }, {
      ...mockNode,
      id: 'node-2',
      data: {
        ...mockNode.data,
        variant: 'purple'
      }
    }, {
      ...mockNode,
      id: 'node-3',
      data: {
        ...mockNode.data,
        variant: 'red'
      }
    }]], [selectedNodeIdsAtom, ['node-1', 'node-2', 'node-3']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...b.parameters?.docs?.source}}};var x=[`NoSelection`,`NodeSelected`,`EdgeSelected`,`SectionSelected`,`TextSelected`,`MultiSelected`];export{_ as EdgeSelected,b as MultiSelected,h as NoSelection,g as NodeSelected,v as SectionSelected,y as TextSelected,x as __namedExportsOrder,u as default};
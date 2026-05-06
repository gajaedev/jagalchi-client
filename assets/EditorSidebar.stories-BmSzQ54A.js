import{n as e}from"./chunk-BEldbCjX.js";import{C as t}from"./iframe-CVXxN-RE.js";import{n,t as r}from"./esm-DpZgohMx.js";import{a as i,d as a,f as o,r as s,s as c}from"./editor-atoms-rlzuOZu7.js";import{n as l,t as u}from"./utils-mD5GMruv.js";import{n as d,t as f}from"./EditorSidebar-CKTnZwMe.js";function p({initialValues:e,children:t}){return l(new Map(e)),t}var m,h,g,_,v,y,b,x,S,C,w,T,E;e((()=>{m=t(),r(),u(),d(),i(),h={title:`Features/RoadmapEditor/Organisms/EditorSidebar`,component:f,parameters:{layout:`fullscreen`},tags:[`autodocs`]},g={id:`Node_1`,type:`jagalchi-node`,position:{x:0,y:0},data:{label:`프론트엔드 기초`,description:`HTML, CSS, JavaScript의 기본 개념을 학습합니다.`,variant:`blue`,isLocked:!1,resources:[`https://developer.mozilla.org/ko/docs/Learn`,``,``]}},_={id:`Section_1`,type:`jagalchi-section`,position:{x:0,y:0},data:{title:`기초 단계`,variant:`blue`,isLocked:!1}},v={id:`Text_1`,type:`jagalchi-text`,position:{x:0,y:0},data:{content:`학습 목표`,variant:`black`,fontSize:16,fontWeight:`normal`,isLocked:!1}},y={id:`Line_1`,source:`node-1`,target:`node-2`,style:{stroke:`#000000`}},b={decorators:[e=>(0,m.jsx)(n,{children:(0,m.jsx)(`div`,{className:`flex h-screen justify-end`,children:(0,m.jsx)(e,{})})})]},x={decorators:[e=>(0,m.jsx)(n,{children:(0,m.jsx)(p,{initialValues:[[c,[g]],[o,[`Node_1`]]],children:(0,m.jsx)(`div`,{className:`flex h-screen justify-end`,children:(0,m.jsx)(e,{})})})})]},S={decorators:[e=>(0,m.jsx)(n,{children:(0,m.jsx)(p,{initialValues:[[s,[y]],[a,[`Line_1`]]],children:(0,m.jsx)(`div`,{className:`flex h-screen justify-end`,children:(0,m.jsx)(e,{})})})})]},C={decorators:[e=>(0,m.jsx)(n,{children:(0,m.jsx)(p,{initialValues:[[c,[_]],[o,[`Section_1`]]],children:(0,m.jsx)(`div`,{className:`flex h-screen justify-end`,children:(0,m.jsx)(e,{})})})})]},w={decorators:[e=>(0,m.jsx)(n,{children:(0,m.jsx)(p,{initialValues:[[c,[v]],[o,[`Text_1`]]],children:(0,m.jsx)(`div`,{className:`flex h-screen justify-end`,children:(0,m.jsx)(e,{})})})})]},T={decorators:[e=>(0,m.jsx)(n,{children:(0,m.jsx)(p,{initialValues:[[c,[{...g,id:`node-1`},{...g,id:`node-2`,data:{...g.data,variant:`purple`}},{...g,id:`node-3`,data:{...g.data,variant:`red`}}]],[o,[`node-1`,`node-2`,`node-3`]]],children:(0,m.jsx)(`div`,{className:`flex h-screen justify-end`,children:(0,m.jsx)(e,{})})})})]},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <div className="flex h-screen justify-end">
          <Story />
        </div>
      </Provider>]
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[nodesAtom, [mockNode]], [selectedNodeIdsAtom, ['Node_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[edgesAtom, [mockEdge]], [selectedEdgeIdsAtom, ['Line_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[nodesAtom, [mockSection]], [selectedNodeIdsAtom, ['Section_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Provider>
        <HydrateAtoms initialValues={[[nodesAtom, [mockText]], [selectedNodeIdsAtom, ['Text_1']]]}>
          <div className="flex h-screen justify-end">
            <Story />
          </div>
        </HydrateAtoms>
      </Provider>]
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E=[`NoSelection`,`NodeSelected`,`EdgeSelected`,`SectionSelected`,`TextSelected`,`MultiSelected`]}))();export{S as EdgeSelected,T as MultiSelected,b as NoSelection,x as NodeSelected,C as SectionSelected,w as TextSelected,E as __namedExportsOrder,h as default};
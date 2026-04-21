import{h as e}from"./iframe-PEuL7U0v.js";import{i as t}from"./esm-CcLfFUFY.js";import{t as n}from"./react-CrgLIR-9.js";import{o as r,r as i}from"./editor-atoms-y0Nl63eb.js";import{t as a}from"./utils-XfxUJhRJ.js";import{t as o}from"./RoadmapCanvas-CAeOKBhP.js";var s=e(),c={title:`Roadmap-Editor/Organisms/RoadmapCanvas`,component:o,parameters:{layout:`fullscreen`},tags:[`autodocs`],decorators:[e=>(0,s.jsx)(n,{children:(0,s.jsx)(t,{children:(0,s.jsx)(`div`,{style:{width:`100vw`,height:`100vh`},children:(0,s.jsx)(e,{})})})})]};function l({initialValues:e,children:t}){return a(e),(0,s.jsx)(s.Fragment,{children:t})}var u={},d={decorators:[e=>(0,s.jsx)(n,{children:(0,s.jsx)(t,{children:(0,s.jsx)(`div`,{style:{width:`100vw`,height:`100vh`},children:(0,s.jsx)(l,{initialValues:[[r,[{id:`node-1`,type:`jagalchi-node`,position:{x:250,y:200},data:{label:`Sample Node`,description:`This is a sample node`,variant:`blue`,resources:[],isLocked:!1}}]]],children:(0,s.jsx)(e,{})})})})})]},f={decorators:[e=>(0,s.jsx)(n,{children:(0,s.jsx)(t,{children:(0,s.jsx)(`div`,{style:{width:`100vw`,height:`100vh`},children:(0,s.jsx)(l,{initialValues:[[r,[{id:`node-1`,type:`jagalchi-node`,position:{x:100,y:100},data:{label:`Start`,description:``,variant:`blue`,resources:[],isLocked:!1}},{id:`node-2`,type:`jagalchi-node`,position:{x:400,y:100},data:{label:`Middle`,description:``,variant:`purple`,resources:[],isLocked:!1}},{id:`node-3`,type:`jagalchi-node`,position:{x:700,y:100},data:{label:`End`,description:``,variant:`red`,resources:[],isLocked:!1}}]]],children:(0,s.jsx)(e,{})})})})})]},p={decorators:[e=>(0,s.jsx)(n,{children:(0,s.jsx)(t,{children:(0,s.jsx)(`div`,{style:{width:`100vw`,height:`100vh`},children:(0,s.jsx)(l,{initialValues:[[r,[{id:`node-1`,type:`jagalchi-node`,position:{x:100,y:200},data:{label:`Node 1`,description:``,variant:`blue`,resources:[],isLocked:!1}},{id:`node-2`,type:`jagalchi-node`,position:{x:400,y:200},data:{label:`Node 2`,description:``,variant:`purple`,resources:[],isLocked:!1}}]],[i,[{id:`edge-1`,source:`node-1`,target:`node-2`,type:`smoothstep`}]]],children:(0,s.jsx)(e,{})})})})})]},m={decorators:[e=>(0,s.jsx)(n,{children:(0,s.jsx)(t,{children:(0,s.jsx)(`div`,{style:{width:`100vw`,height:`100vh`},children:(0,s.jsx)(l,{initialValues:[[r,[{id:`section-1`,type:`jagalchi-section`,position:{x:50,y:50},data:{title:`Phase 1`,variant:`blue`,isLocked:!1},style:{width:600,height:400}},{id:`node-1`,type:`jagalchi-node`,position:{x:100,y:150},data:{label:`Task 1`,description:``,variant:`white`,resources:[],isLocked:!1},parentId:`section-1`,extent:`parent`},{id:`node-2`,type:`jagalchi-node`,position:{x:350,y:150},data:{label:`Task 2`,description:``,variant:`white`,resources:[],isLocked:!1},parentId:`section-1`,extent:`parent`}]]],children:(0,s.jsx)(e,{})})})})})]},h={decorators:[e=>(0,s.jsx)(n,{children:(0,s.jsx)(t,{children:(0,s.jsx)(`div`,{style:{width:`100vw`,height:`100vh`},children:(0,s.jsx)(l,{initialValues:[[r,[{id:`text-1`,type:`jagalchi-text`,position:{x:300,y:200},data:{content:`Roadmap Title`,variant:`black`,fontSize:24,fontWeight:`bold`,isLocked:!1}}]]],children:(0,s.jsx)(e,{})})})})})]};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  decorators: [Story => {
    const sampleNodes: RoadmapNode[] = [{
      id: 'node-1',
      type: 'jagalchi-node',
      position: {
        x: 250,
        y: 200
      },
      data: {
        label: 'Sample Node',
        description: 'This is a sample node',
        variant: 'blue',
        resources: [],
        isLocked: false
      }
    }];
    return <Provider>
          <ReactFlowProvider>
            <div style={{
          width: '100vw',
          height: '100vh'
        }}>
              <HydrateAtoms initialValues={[[nodesAtom, sampleNodes]]}>
                <Story />
              </HydrateAtoms>
            </div>
          </ReactFlowProvider>
        </Provider>;
  }]
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  decorators: [Story => {
    const sampleNodes: RoadmapNode[] = [{
      id: 'node-1',
      type: 'jagalchi-node',
      position: {
        x: 100,
        y: 100
      },
      data: {
        label: 'Start',
        description: '',
        variant: 'blue',
        resources: [],
        isLocked: false
      }
    }, {
      id: 'node-2',
      type: 'jagalchi-node',
      position: {
        x: 400,
        y: 100
      },
      data: {
        label: 'Middle',
        description: '',
        variant: 'purple',
        resources: [],
        isLocked: false
      }
    }, {
      id: 'node-3',
      type: 'jagalchi-node',
      position: {
        x: 700,
        y: 100
      },
      data: {
        label: 'End',
        description: '',
        variant: 'red',
        resources: [],
        isLocked: false
      }
    }];
    return <Provider>
          <ReactFlowProvider>
            <div style={{
          width: '100vw',
          height: '100vh'
        }}>
              <HydrateAtoms initialValues={[[nodesAtom, sampleNodes]]}>
                <Story />
              </HydrateAtoms>
            </div>
          </ReactFlowProvider>
        </Provider>;
  }]
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  decorators: [Story => {
    const sampleNodes: RoadmapNode[] = [{
      id: 'node-1',
      type: 'jagalchi-node',
      position: {
        x: 100,
        y: 200
      },
      data: {
        label: 'Node 1',
        description: '',
        variant: 'blue',
        resources: [],
        isLocked: false
      }
    }, {
      id: 'node-2',
      type: 'jagalchi-node',
      position: {
        x: 400,
        y: 200
      },
      data: {
        label: 'Node 2',
        description: '',
        variant: 'purple',
        resources: [],
        isLocked: false
      }
    }];
    const sampleEdges: Edge[] = [{
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
      type: 'smoothstep'
    }];
    return <Provider>
          <ReactFlowProvider>
            <div style={{
          width: '100vw',
          height: '100vh'
        }}>
              <HydrateAtoms initialValues={[[nodesAtom, sampleNodes], [edgesAtom, sampleEdges]]}>
                <Story />
              </HydrateAtoms>
            </div>
          </ReactFlowProvider>
        </Provider>;
  }]
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  decorators: [Story => {
    const sampleNodes: RoadmapNode[] = [{
      id: 'section-1',
      type: 'jagalchi-section',
      position: {
        x: 50,
        y: 50
      },
      data: {
        title: 'Phase 1',
        variant: 'blue',
        isLocked: false
      },
      style: {
        width: 600,
        height: 400
      }
    }, {
      id: 'node-1',
      type: 'jagalchi-node',
      position: {
        x: 100,
        y: 150
      },
      data: {
        label: 'Task 1',
        description: '',
        variant: 'white',
        resources: [],
        isLocked: false
      },
      parentId: 'section-1',
      extent: 'parent'
    }, {
      id: 'node-2',
      type: 'jagalchi-node',
      position: {
        x: 350,
        y: 150
      },
      data: {
        label: 'Task 2',
        description: '',
        variant: 'white',
        resources: [],
        isLocked: false
      },
      parentId: 'section-1',
      extent: 'parent'
    }];
    return <Provider>
          <ReactFlowProvider>
            <div style={{
          width: '100vw',
          height: '100vh'
        }}>
              <HydrateAtoms initialValues={[[nodesAtom, sampleNodes]]}>
                <Story />
              </HydrateAtoms>
            </div>
          </ReactFlowProvider>
        </Provider>;
  }]
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  decorators: [Story => {
    const sampleNodes: RoadmapNode[] = [{
      id: 'text-1',
      type: 'jagalchi-text',
      position: {
        x: 300,
        y: 200
      },
      data: {
        content: 'Roadmap Title',
        variant: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        isLocked: false
      }
    }];
    return <Provider>
          <ReactFlowProvider>
            <div style={{
          width: '100vw',
          height: '100vh'
        }}>
              <HydrateAtoms initialValues={[[nodesAtom, sampleNodes]]}>
                <Story />
              </HydrateAtoms>
            </div>
          </ReactFlowProvider>
        </Provider>;
  }]
}`,...h.parameters?.docs?.source}}};var g=[`Empty`,`WithSingleNode`,`WithMultipleNodes`,`WithConnectedNodes`,`WithSection`,`WithText`];export{u as Empty,p as WithConnectedNodes,f as WithMultipleNodes,m as WithSection,d as WithSingleNode,h as WithText,g as __namedExportsOrder,c as default};
import{n as e}from"./chunk-BEldbCjX.js";import{C as t}from"./iframe-BW17Ef0A.js";import{c as n,i as r}from"./esm-D3_l_h4G.js";import{n as i,t as a}from"./esm-BhyKhyTW.js";import{a as o,r as s,s as c}from"./editor-atoms-DcsIIlOG.js";import{n as l,t as u}from"./utils-f5RFJP_Y.js";import{n as d,t as f}from"./RoadmapCanvas-Ccmc2bWe.js";function p({initialValues:e,children:t}){return l(e),(0,m.jsx)(m.Fragment,{children:t})}var m,h,g,_,v,y,b,x,S;e((()=>{m=t(),n(),a(),u(),d(),o(),h={title:`Roadmap-Editor/Organisms/RoadmapCanvas`,component:f,parameters:{layout:`fullscreen`},tags:[`autodocs`],decorators:[e=>(0,m.jsx)(i,{children:(0,m.jsx)(r,{children:(0,m.jsx)(`div`,{style:{width:`100vw`,height:`100vh`},children:(0,m.jsx)(e,{})})})})]},g={},_={decorators:[e=>(0,m.jsx)(i,{children:(0,m.jsx)(r,{children:(0,m.jsx)(`div`,{style:{width:`100vw`,height:`100vh`},children:(0,m.jsx)(p,{initialValues:[[c,[{id:`node-1`,type:`jagalchi-node`,position:{x:250,y:200},data:{label:`Sample Node`,description:`This is a sample node`,variant:`blue`,resources:[],isLocked:!1}}]]],children:(0,m.jsx)(e,{})})})})})]},v={decorators:[e=>(0,m.jsx)(i,{children:(0,m.jsx)(r,{children:(0,m.jsx)(`div`,{style:{width:`100vw`,height:`100vh`},children:(0,m.jsx)(p,{initialValues:[[c,[{id:`node-1`,type:`jagalchi-node`,position:{x:100,y:100},data:{label:`Start`,description:``,variant:`blue`,resources:[],isLocked:!1}},{id:`node-2`,type:`jagalchi-node`,position:{x:400,y:100},data:{label:`Middle`,description:``,variant:`purple`,resources:[],isLocked:!1}},{id:`node-3`,type:`jagalchi-node`,position:{x:700,y:100},data:{label:`End`,description:``,variant:`red`,resources:[],isLocked:!1}}]]],children:(0,m.jsx)(e,{})})})})})]},y={decorators:[e=>(0,m.jsx)(i,{children:(0,m.jsx)(r,{children:(0,m.jsx)(`div`,{style:{width:`100vw`,height:`100vh`},children:(0,m.jsx)(p,{initialValues:[[c,[{id:`node-1`,type:`jagalchi-node`,position:{x:100,y:200},data:{label:`Node 1`,description:``,variant:`blue`,resources:[],isLocked:!1}},{id:`node-2`,type:`jagalchi-node`,position:{x:400,y:200},data:{label:`Node 2`,description:``,variant:`purple`,resources:[],isLocked:!1}}]],[s,[{id:`edge-1`,source:`node-1`,target:`node-2`,type:`smoothstep`}]]],children:(0,m.jsx)(e,{})})})})})]},b={decorators:[e=>(0,m.jsx)(i,{children:(0,m.jsx)(r,{children:(0,m.jsx)(`div`,{style:{width:`100vw`,height:`100vh`},children:(0,m.jsx)(p,{initialValues:[[c,[{id:`section-1`,type:`jagalchi-section`,position:{x:50,y:50},data:{title:`Phase 1`,variant:`blue`,isLocked:!1},style:{width:600,height:400}},{id:`node-1`,type:`jagalchi-node`,position:{x:100,y:150},data:{label:`Task 1`,description:``,variant:`white`,resources:[],isLocked:!1},parentId:`section-1`,extent:`parent`},{id:`node-2`,type:`jagalchi-node`,position:{x:350,y:150},data:{label:`Task 2`,description:``,variant:`white`,resources:[],isLocked:!1},parentId:`section-1`,extent:`parent`}]]],children:(0,m.jsx)(e,{})})})})})]},x={decorators:[e=>(0,m.jsx)(i,{children:(0,m.jsx)(r,{children:(0,m.jsx)(`div`,{style:{width:`100vw`,height:`100vh`},children:(0,m.jsx)(p,{initialValues:[[c,[{id:`text-1`,type:`jagalchi-text`,position:{x:300,y:200},data:{content:`Roadmap Title`,variant:`black`,fontSize:24,fontWeight:`bold`,isLocked:!1}}]]],children:(0,m.jsx)(e,{})})})})})]},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S=[`Empty`,`WithSingleNode`,`WithMultipleNodes`,`WithConnectedNodes`,`WithSection`,`WithText`]}))();export{g as Empty,y as WithConnectedNodes,v as WithMultipleNodes,b as WithSection,_ as WithSingleNode,x as WithText,S as __namedExportsOrder,h as default};
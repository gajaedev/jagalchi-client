import{j as e}from"./jsx-runtime-DgpJom-r.js";import{R as t}from"./index-BiXfmjuk.js";import{R as v}from"./index-zrVe25Ur.js";import{n as s,e as y}from"./editor-atoms-CKhDRCe7.js";import{u}from"./utils-DSyyO-NK.js";import{P as i}from"./react-CI19SP_3.js";import"./iframe-DnfOKhIP.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CrkxoCl0.js";import"./index-Bw3dlgLw.js";import"./index-DLC0NMqK.js";import"./node-factory-CQS32woI.js";import"./messages-tw_n8aWb.js";import"./types-CxSZrmmY.js";import"./index-BLZD79xU.js";import"./node-colors-qExhWIBq.js";import"./utils-CDN07tui.js";import"./index-4d8KsTQJ.js";import"./index-D8QE_Krc.js";import"./createLucideIcon-DntPXVNg.js";import"./index-Bdc5Jhdj.js";import"./index-CjEKi1cs.js";const z={title:"Roadmap-Editor/Organisms/RoadmapCanvas",component:v,parameters:{layout:"fullscreen"},tags:["autodocs"],decorators:[n=>e.jsx(i,{children:e.jsx(t,{children:e.jsx("div",{style:{width:"100vw",height:"100vh"},children:e.jsx(n,{})})})})]};function a({initialValues:n,children:o}){return u(n),e.jsx(e.Fragment,{children:o})}const r={},d={decorators:[n=>{const o=[{id:"node-1",type:"jagalchi-node",position:{x:250,y:200},data:{label:"Sample Node",description:"This is a sample node",variant:"blue",resources:[],isLocked:!1}}];return e.jsx(i,{children:e.jsx(t,{children:e.jsx("div",{style:{width:"100vw",height:"100vh"},children:e.jsx(a,{initialValues:[[s,o]],children:e.jsx(n,{})})})})})}]},l={decorators:[n=>{const o=[{id:"node-1",type:"jagalchi-node",position:{x:100,y:100},data:{label:"Start",description:"",variant:"blue",resources:[],isLocked:!1}},{id:"node-2",type:"jagalchi-node",position:{x:400,y:100},data:{label:"Middle",description:"",variant:"purple",resources:[],isLocked:!1}},{id:"node-3",type:"jagalchi-node",position:{x:700,y:100},data:{label:"End",description:"",variant:"red",resources:[],isLocked:!1}}];return e.jsx(i,{children:e.jsx(t,{children:e.jsx("div",{style:{width:"100vw",height:"100vh"},children:e.jsx(a,{initialValues:[[s,o]],children:e.jsx(n,{})})})})})}]},c={decorators:[n=>{const o=[{id:"node-1",type:"jagalchi-node",position:{x:100,y:200},data:{label:"Node 1",description:"",variant:"blue",resources:[],isLocked:!1}},{id:"node-2",type:"jagalchi-node",position:{x:400,y:200},data:{label:"Node 2",description:"",variant:"purple",resources:[],isLocked:!1}}],m=[{id:"edge-1",source:"node-1",target:"node-2",type:"smoothstep"}];return e.jsx(i,{children:e.jsx(t,{children:e.jsx("div",{style:{width:"100vw",height:"100vh"},children:e.jsx(a,{initialValues:[[s,o],[y,m]],children:e.jsx(n,{})})})})})}]},p={decorators:[n=>{const o=[{id:"section-1",type:"jagalchi-section",position:{x:50,y:50},data:{title:"Phase 1",variant:"blue",isLocked:!1},style:{width:600,height:400}},{id:"node-1",type:"jagalchi-node",position:{x:100,y:150},data:{label:"Task 1",description:"",variant:"white",resources:[],isLocked:!1},parentId:"section-1",extent:"parent"},{id:"node-2",type:"jagalchi-node",position:{x:350,y:150},data:{label:"Task 2",description:"",variant:"white",resources:[],isLocked:!1},parentId:"section-1",extent:"parent"}];return e.jsx(i,{children:e.jsx(t,{children:e.jsx("div",{style:{width:"100vw",height:"100vh"},children:e.jsx(a,{initialValues:[[s,o]],children:e.jsx(n,{})})})})})}]},h={decorators:[n=>{const o=[{id:"text-1",type:"jagalchi-text",position:{x:300,y:200},data:{content:"Roadmap Title",variant:"black",fontSize:24,fontWeight:"bold",isLocked:!1}}];return e.jsx(i,{children:e.jsx(t,{children:e.jsx("div",{style:{width:"100vw",height:"100vh"},children:e.jsx(a,{initialValues:[[s,o]],children:e.jsx(n,{})})})})})}]};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};const O=["Empty","WithSingleNode","WithMultipleNodes","WithConnectedNodes","WithSection","WithText"];export{r as Empty,c as WithConnectedNodes,l as WithMultipleNodes,p as WithSection,d as WithSingleNode,h as WithText,O as __namedExportsOrder,z as default};

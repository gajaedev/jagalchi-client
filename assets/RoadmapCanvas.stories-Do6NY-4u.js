import{j as e}from"./jsx-runtime-DdmxcLET.js";import{u as J,a as M,b as _,i as z,C as B,R as j}from"./index-bG9o3_EY.js";import{r as c}from"./iframe-BmpoGx1R.js";import{n as y,e as D,s as V,d as O,u as G,g as X}from"./editor-atoms-WBMYccng.js";import{d as F}from"./node-factory-HJuXkfLy.js";import{u as N,b as H,P as w}from"./react-DslAc1VT.js";import{C as U}from"./index-CwQGfV-F.js";import{J as Y}from"./index-B-RuOhAo.js";import{J as q}from"./index-CiR1mmO5.js";import{J as Q}from"./index-Zp5PS9Zv.js";import{a as Z,C as $}from"./index-CzBaN5My.js";import{u as ee}from"./utils-DxyG6rPi.js";import"./index-g0L6Z6Rh.js";import"./index-DwDeJz6h.js";import"./preload-helper-PPVm8Dsz.js";import"./messages-DkLYveTE.js";import"./node-colors-CF7U7wL7.js";import"./utils-CDN07tui.js";import"./index-LTsCejL_.js";import"./index-Crf-Vw0Z.js";import"./index-BCh0MxMJ.js";import"./index-x1k0dM5P.js";import"./index-DszGFuiY.js";import"./label-B0WXvur6.js";import"./index-CgxCSjj6.js";import"./index-ChgYa-84.js";import"./index-Dv9gSYyR.js";import"./index-Cg9ymrs1.js";import"./button-DjrUds_s.js";import"./index-B_jtOnfb.js";import"./index-BkaLuOda.js";import"./createLucideIcon-CRWMFQV_.js";import"./index-CrlUwogJ.js";import"./index-C7gse5mp.js";import"./index-CwnMz2et.js";import"./index-BISvjkvE.js";function ne(){const[s,t]=N(y),[u,p]=N(D),[g,m]=N(V),[f,x]=N(O),k=H(G),S=H(X),v=c.useRef(s),E=c.useRef(u),a=c.useRef(g),r=c.useRef(f);c.useEffect(()=>{v.current=s},[s]),c.useEffect(()=>{E.current=u},[u]),c.useEffect(()=>{a.current=g},[g]),c.useEffect(()=>{r.current=f},[f]),c.useEffect(()=>{const h=n=>{const R=n.target;if(R.tagName==="INPUT"||R.tagName==="TEXTAREA")return;if(n.key==="Delete"||n.key==="Backspace"){n.preventDefault();const o=a.current,l=r.current;(o.length>0||l.length>0)&&(t(i=>i.filter(d=>!o.includes(d.id))),p(i=>i.filter(d=>!l.includes(d.id)&&!o.includes(d.source)&&!o.includes(d.target))),m([]),x([]));return}if(!(n.ctrlKey||n.metaKey)){n.key==="Escape"&&(n.preventDefault(),m([]),x([]));return}if(n.key==="z"&&!n.shiftKey){n.preventDefault(),k();return}if(n.key==="z"&&n.shiftKey){n.preventDefault(),S();return}if(n.key==="a"){n.preventDefault(),m(v.current.map(o=>o.id)),x(E.current.map(o=>o.id));return}if(n.key==="c"){n.preventDefault();const o=v.current.filter(l=>a.current.includes(l.id));o.length>0&&localStorage.setItem("jagalchi-clipboard",JSON.stringify(o));return}if(n.key==="v"){n.preventDefault();const o=localStorage.getItem("jagalchi-clipboard");if(o)try{const i=JSON.parse(o).map(d=>({...d,id:F(),position:{x:d.position.x+50,y:d.position.y+50}}));t(d=>[...d,...i]),m(i.map(d=>d.id))}catch{}return}if(n.key==="d"){n.preventDefault();const o=v.current.filter(l=>a.current.includes(l.id));if(o.length>0){const l=o.map(i=>({...i,id:F(),position:{x:i.position.x+50,y:i.position.y+50}}));t(i=>[...i,...l]),m(l.map(i=>i.id))}return}};return window.addEventListener("keydown",h),()=>{window.removeEventListener("keydown",h)}},[t,p,m,x,k,S])}const te={"jagalchi-node":Y,"jagalchi-section":q,"jagalchi-text":Q};function K(){const[s,t]=N(y),[u,p]=N(D),g=H(V),m=H(O),{screenToFlowPosition:f}=J();ne();const x=c.useCallback(a=>{t(r=>M(a,r))},[t]),k=c.useCallback(a=>{p(r=>_(a,r))},[p]),S=c.useCallback(a=>{p(r=>Z(a,r))},[p]),v=c.useCallback(({nodes:a,edges:r})=>{g(a.map(h=>h.id)),m(r.map(h=>h.id))},[g,m]),E=c.useCallback((a,r)=>{if(r.toNode||!a.target.classList.contains("react-flow__pane"))return;const{clientX:n,clientY:R}="changedTouches"in a?a.changedTouches[0]:a,W=f({x:n,y:R}),o=F(),l={id:o,type:"jagalchi-node",position:{x:W.x-100,y:W.y-24},data:{label:"New Node",description:"",resources:[],variant:"white",isLocked:!1}};if(t(i=>[...i,l]),r.fromNode){const i={id:F(),source:r.fromNode.id,target:o,sourceHandle:r.fromHandle?.id??null};p(d=>[...d,i])}},[f,t,p]);return e.jsx("div",{className:"h-full w-full",children:e.jsx(z,{nodes:s,edges:u,onNodesChange:x,onEdgesChange:k,onConnect:S,onConnectEnd:E,onSelectionChange:v,nodeTypes:te,connectionLineComponent:U,multiSelectionKeyCode:"Shift",selectionKeyCode:"Shift",deleteKeyCode:"Delete",panOnDrag:[1,2],panOnScroll:!0,fitView:!0,fitViewOptions:{padding:.2},defaultEdgeOptions:{type:"smoothstep",label:"",labelStyle:{fontSize:12,fontWeight:400},labelBgStyle:{fill:"white",fillOpacity:.9}},connectionMode:$.Loose,snapToGrid:!0,snapGrid:[16,16],children:e.jsx(B,{position:"bottom-left"})})})}K.__docgenInfo={description:"",methods:[],displayName:"RoadmapCanvas"};const Oe={title:"Roadmap-Editor/Organisms/RoadmapCanvas",component:K,parameters:{layout:"fullscreen"},tags:["autodocs"],decorators:[s=>e.jsx(w,{children:e.jsx(j,{children:e.jsx("div",{style:{width:"100vw",height:"100vh"},children:e.jsx(s,{})})})})]};function b({initialValues:s,children:t}){return ee(s),e.jsx(e.Fragment,{children:t})}const C={},P={decorators:[s=>{const t=[{id:"node-1",type:"jagalchi-node",position:{x:250,y:200},data:{label:"Sample Node",description:"This is a sample node",variant:"blue",resources:[],isLocked:!1}}];return e.jsx(w,{children:e.jsx(j,{children:e.jsx("div",{style:{width:"100vw",height:"100vh"},children:e.jsx(b,{initialValues:[[y,t]],children:e.jsx(s,{})})})})})}]},A={decorators:[s=>{const t=[{id:"node-1",type:"jagalchi-node",position:{x:100,y:100},data:{label:"Start",description:"",variant:"blue",resources:[],isLocked:!1}},{id:"node-2",type:"jagalchi-node",position:{x:400,y:100},data:{label:"Middle",description:"",variant:"purple",resources:[],isLocked:!1}},{id:"node-3",type:"jagalchi-node",position:{x:700,y:100},data:{label:"End",description:"",variant:"red",resources:[],isLocked:!1}}];return e.jsx(w,{children:e.jsx(j,{children:e.jsx("div",{style:{width:"100vw",height:"100vh"},children:e.jsx(b,{initialValues:[[y,t]],children:e.jsx(s,{})})})})})}]},L={decorators:[s=>{const t=[{id:"node-1",type:"jagalchi-node",position:{x:100,y:200},data:{label:"Node 1",description:"",variant:"blue",resources:[],isLocked:!1}},{id:"node-2",type:"jagalchi-node",position:{x:400,y:200},data:{label:"Node 2",description:"",variant:"purple",resources:[],isLocked:!1}}],u=[{id:"edge-1",source:"node-1",target:"node-2",type:"smoothstep"}];return e.jsx(w,{children:e.jsx(j,{children:e.jsx("div",{style:{width:"100vw",height:"100vh"},children:e.jsx(b,{initialValues:[[y,t],[D,u]],children:e.jsx(s,{})})})})})}]},I={decorators:[s=>{const t=[{id:"section-1",type:"jagalchi-section",position:{x:50,y:50},data:{title:"Phase 1",variant:"blue",isLocked:!1},style:{width:600,height:400}},{id:"node-1",type:"jagalchi-node",position:{x:100,y:150},data:{label:"Task 1",description:"",variant:"white",resources:[],isLocked:!1},parentId:"section-1",extent:"parent"},{id:"node-2",type:"jagalchi-node",position:{x:350,y:150},data:{label:"Task 2",description:"",variant:"white",resources:[],isLocked:!1},parentId:"section-1",extent:"parent"}];return e.jsx(w,{children:e.jsx(j,{children:e.jsx("div",{style:{width:"100vw",height:"100vh"},children:e.jsx(b,{initialValues:[[y,t]],children:e.jsx(s,{})})})})})}]},T={decorators:[s=>{const t=[{id:"text-1",type:"jagalchi-text",position:{x:300,y:200},data:{content:"Roadmap Title",variant:"black",fontSize:24,fontWeight:"bold",isLocked:!1}}];return e.jsx(w,{children:e.jsx(j,{children:e.jsx("div",{style:{width:"100vw",height:"100vh"},children:e.jsx(b,{initialValues:[[y,t]],children:e.jsx(s,{})})})})})}]};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:"{}",...C.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}};const Ke=["Empty","WithSingleNode","WithMultipleNodes","WithConnectedNodes","WithSection","WithText"];export{C as Empty,L as WithConnectedNodes,A as WithMultipleNodes,I as WithSection,P as WithSingleNode,T as WithText,Ke as __namedExportsOrder,Oe as default};

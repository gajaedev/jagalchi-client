import{j as e}from"./jsx-runtime-CPdMdD9n.js";import{R as f,i as h}from"./index-BB10QvJ9.js";import{J as S}from"./index-CyBkZX0O.js";import{P as x}from"./react-CiXJptNA.js";import"./iframe-4df5BIMp.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CrkxoCl0.js";import"./index-BMLaE3tz.js";import"./index-CCE_33g9.js";import"./node-colors-CF7U7wL7.js";import"./messages-tw_n8aWb.js";import"./utils-CDN07tui.js";import"./editor-atoms-7ZNVft3l.js";const J={title:"Roadmap-Editor/Molecules/JagalchiSection",component:S,parameters:{layout:"centered"},tags:["autodocs"],decorators:[(v,u)=>{const{args:a}=u,m=[{id:"section-1",type:"jagalchiSection",position:{x:0,y:0},data:a.data,style:{width:400,height:300}}];return e.jsx(x,{children:e.jsx(f,{children:e.jsx("div",{style:{width:"600px",height:"500px"},children:e.jsx(h,{nodes:m,nodeTypes:{jagalchiSection:g=>e.jsx(S,{...g,selected:a.selected??!1})},fitView:!0})})})})}]},t={title:"Sample Section",variant:"white",isLocked:!1},s={args:{id:"section-1",data:t,selected:!1}},n={args:{id:"section-2",data:{...t,title:"Blue Section",variant:"blue"},selected:!1}},r={args:{id:"section-3",data:{...t,title:"Purple Section",variant:"purple"},selected:!1}},o={args:{id:"section-4",data:{...t,title:"Red Section",variant:"red"},selected:!1}},i={args:{id:"section-5",data:{...t,title:"Orange Section",variant:"orange"},selected:!1}},c={args:{id:"section-6",data:{...t,title:"Black Section",variant:"black"},selected:!1}},d={args:{id:"section-7",data:{...t,title:"Selected Section"},selected:!0}},l={args:{id:"section-8",data:{title:"",variant:"white",isLocked:!1},selected:!1}},p={args:{id:"section-9",data:{...t,title:"Large Section"},selected:!1},decorators:[(v,u)=>{const{args:a}=u,m=[{id:"section-9",type:"jagalchiSection",position:{x:0,y:0},data:a.data,style:{width:600,height:400}}];return e.jsx(x,{children:e.jsx(f,{children:e.jsx("div",{style:{width:"800px",height:"600px"},children:e.jsx(h,{nodes:m,nodeTypes:{jagalchiSection:g=>e.jsx(S,{...g,selected:a.selected??!1})},fitView:!0})})})})}]};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-1',
    data: defaultData,
    selected: false
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-2',
    data: {
      ...defaultData,
      title: 'Blue Section',
      variant: 'blue'
    },
    selected: false
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-3',
    data: {
      ...defaultData,
      title: 'Purple Section',
      variant: 'purple'
    },
    selected: false
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-4',
    data: {
      ...defaultData,
      title: 'Red Section',
      variant: 'red'
    },
    selected: false
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-5',
    data: {
      ...defaultData,
      title: 'Orange Section',
      variant: 'orange'
    },
    selected: false
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-6',
    data: {
      ...defaultData,
      title: 'Black Section',
      variant: 'black'
    },
    selected: false
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-7',
    data: {
      ...defaultData,
      title: 'Selected Section'
    },
    selected: true
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-8',
    data: {
      title: '',
      variant: 'white',
      isLocked: false
    },
    selected: false
  }
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-9',
    data: {
      ...defaultData,
      title: 'Large Section'
    },
    selected: false
  },
  decorators: [(Story, context) => {
    const {
      args
    } = context;
    const nodes: Node[] = [{
      id: 'section-9',
      type: 'jagalchiSection',
      position: {
        x: 0,
        y: 0
      },
      data: args.data,
      style: {
        width: 600,
        height: 400
      }
    }];
    return <Provider>
          <ReactFlowProvider>
            <div style={{
          width: '800px',
          height: '600px'
        }}>
              <ReactFlow nodes={nodes} nodeTypes={{
            jagalchiSection: props => <JagalchiSection {...props} selected={args.selected ?? false} />
          }} fitView />
            </div>
          </ReactFlowProvider>
        </Provider>;
  }]
}`,...p.parameters?.docs?.source}}};const E=["White","Blue","Purple","Red","Orange","Black","Selected","DefaultTitle","LargeSize"];export{c as Black,n as Blue,l as DefaultTitle,p as LargeSize,i as Orange,r as Purple,o as Red,d as Selected,s as White,E as __namedExportsOrder,J as default};

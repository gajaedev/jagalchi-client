import{h as e}from"./iframe-DQi7WpjF.js";import{i as t,s as n}from"./esm-CLSU6MqK.js";import{t as r}from"./react-CrgLIR-9.js";import{t as i}from"./JagalchiSection-BJkdyJIK.js";var a=e(),o={title:`Roadmap-Editor/Molecules/JagalchiSection`,component:i,parameters:{layout:`centered`},tags:[`autodocs`],decorators:[(e,o)=>{let{args:s}=o;return(0,a.jsx)(r,{children:(0,a.jsx)(t,{children:(0,a.jsx)(`div`,{style:{width:`600px`,height:`500px`},children:(0,a.jsx)(n,{nodes:[{id:`section-1`,type:`jagalchiSection`,position:{x:0,y:0},data:s.data,style:{width:400,height:300}}],nodeTypes:{jagalchiSection:e=>(0,a.jsx)(i,{...e,selected:s.selected??!1})},fitView:!0})})})})}]},s={title:`Sample Section`,variant:`white`,isLocked:!1},c={args:{id:`section-1`,data:s,selected:!1}},l={args:{id:`section-2`,data:{...s,title:`Blue Section`,variant:`blue`},selected:!1}},u={args:{id:`section-3`,data:{...s,title:`Purple Section`,variant:`purple`},selected:!1}},d={args:{id:`section-4`,data:{...s,title:`Red Section`,variant:`red`},selected:!1}},f={args:{id:`section-5`,data:{...s,title:`Orange Section`,variant:`orange`},selected:!1}},p={args:{id:`section-6`,data:{...s,title:`Black Section`,variant:`black`},selected:!1}},m={args:{id:`section-7`,data:{...s,title:`Selected Section`},selected:!0}},h={args:{id:`section-8`,data:{title:``,variant:`white`,isLocked:!1},selected:!1}},g={args:{id:`section-9`,data:{...s,title:`Large Section`},selected:!1},decorators:[(e,o)=>{let{args:s}=o;return(0,a.jsx)(r,{children:(0,a.jsx)(t,{children:(0,a.jsx)(`div`,{style:{width:`800px`,height:`600px`},children:(0,a.jsx)(n,{nodes:[{id:`section-9`,type:`jagalchiSection`,position:{x:0,y:0},data:s.data,style:{width:600,height:400}}],nodeTypes:{jagalchiSection:e=>(0,a.jsx)(i,{...e,selected:s.selected??!1})},fitView:!0})})})})}]};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-1',
    data: defaultData,
    selected: false
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-2',
    data: {
      ...defaultData,
      title: 'Blue Section',
      variant: 'blue'
    },
    selected: false
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-3',
    data: {
      ...defaultData,
      title: 'Purple Section',
      variant: 'purple'
    },
    selected: false
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-4',
    data: {
      ...defaultData,
      title: 'Red Section',
      variant: 'red'
    },
    selected: false
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-5',
    data: {
      ...defaultData,
      title: 'Orange Section',
      variant: 'orange'
    },
    selected: false
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-6',
    data: {
      ...defaultData,
      title: 'Black Section',
      variant: 'black'
    },
    selected: false
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-7',
    data: {
      ...defaultData,
      title: 'Selected Section'
    },
    selected: true
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-8',
    data: {
      title: '',
      variant: 'white',
      isLocked: false
    },
    selected: false
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};var _=[`White`,`Blue`,`Purple`,`Red`,`Orange`,`Black`,`Selected`,`DefaultTitle`,`LargeSize`];export{p as Black,l as Blue,h as DefaultTitle,g as LargeSize,f as Orange,u as Purple,d as Red,m as Selected,c as White,_ as __namedExportsOrder,o as default};
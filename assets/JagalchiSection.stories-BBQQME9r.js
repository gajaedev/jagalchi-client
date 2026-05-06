import{n as e}from"./chunk-BEldbCjX.js";import{C as t}from"./iframe-CVXxN-RE.js";import{c as n,i as r,s as i}from"./esm-BatAELFc.js";import{n as a,t as o}from"./esm-DpZgohMx.js";import{n as s,t as c}from"./JagalchiSection-DZQcmFYS.js";var l,u,d,f,p,m,h,g,_,v,y,b,x;e((()=>{l=t(),n(),o(),s(),u={title:`Roadmap-Editor/Molecules/JagalchiSection`,component:c,parameters:{layout:`centered`},tags:[`autodocs`],decorators:[(e,t)=>{let{args:n}=t;return(0,l.jsx)(a,{children:(0,l.jsx)(r,{children:(0,l.jsx)(`div`,{style:{width:`600px`,height:`500px`},children:(0,l.jsx)(i,{nodes:[{id:`section-1`,type:`jagalchiSection`,position:{x:0,y:0},data:n.data,style:{width:400,height:300}}],nodeTypes:{jagalchiSection:e=>(0,l.jsx)(c,{...e,selected:n.selected??!1})},fitView:!0})})})})}]},d={title:`Sample Section`,variant:`white`,isLocked:!1},f={args:{id:`section-1`,data:d,selected:!1}},p={args:{id:`section-2`,data:{...d,title:`Blue Section`,variant:`blue`},selected:!1}},m={args:{id:`section-3`,data:{...d,title:`Purple Section`,variant:`purple`},selected:!1}},h={args:{id:`section-4`,data:{...d,title:`Red Section`,variant:`red`},selected:!1}},g={args:{id:`section-5`,data:{...d,title:`Orange Section`,variant:`orange`},selected:!1}},_={args:{id:`section-6`,data:{...d,title:`Black Section`,variant:`black`},selected:!1}},v={args:{id:`section-7`,data:{...d,title:`Selected Section`},selected:!0}},y={args:{id:`section-8`,data:{title:``,variant:`white`,isLocked:!1},selected:!1}},b={args:{id:`section-9`,data:{...d,title:`Large Section`},selected:!1},decorators:[(e,t)=>{let{args:n}=t;return(0,l.jsx)(a,{children:(0,l.jsx)(r,{children:(0,l.jsx)(`div`,{style:{width:`800px`,height:`600px`},children:(0,l.jsx)(i,{nodes:[{id:`section-9`,type:`jagalchiSection`,position:{x:0,y:0},data:n.data,style:{width:600,height:400}}],nodeTypes:{jagalchiSection:e=>(0,l.jsx)(c,{...e,selected:n.selected??!1})},fitView:!0})})})})}]},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-1',
    data: defaultData,
    selected: false
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-2',
    data: {
      ...defaultData,
      title: 'Blue Section',
      variant: 'blue'
    },
    selected: false
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-3',
    data: {
      ...defaultData,
      title: 'Purple Section',
      variant: 'purple'
    },
    selected: false
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-4',
    data: {
      ...defaultData,
      title: 'Red Section',
      variant: 'red'
    },
    selected: false
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-5',
    data: {
      ...defaultData,
      title: 'Orange Section',
      variant: 'orange'
    },
    selected: false
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-6',
    data: {
      ...defaultData,
      title: 'Black Section',
      variant: 'black'
    },
    selected: false
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-7',
    data: {
      ...defaultData,
      title: 'Selected Section'
    },
    selected: true
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'section-8',
    data: {
      title: '',
      variant: 'white',
      isLocked: false
    },
    selected: false
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x=[`White`,`Blue`,`Purple`,`Red`,`Orange`,`Black`,`Selected`,`DefaultTitle`,`LargeSize`]}))();export{_ as Black,p as Blue,y as DefaultTitle,b as LargeSize,g as Orange,m as Purple,h as Red,v as Selected,f as White,x as __namedExportsOrder,u as default};
import{n as e,o as t}from"./chunk-BEldbCjX.js";import{C as n,J as r}from"./iframe-BW17Ef0A.js";import{n as i,t as a}from"./utils-Bwg4-tEC.js";import{a as o,d as s,f as c,l,s as u,t as ee,u as te}from"./zod-CJNSGe0O.js";import{r as d,t as f}from"./dist-6enHhh7C.js";import{n as p,t as m}from"./button-Bc1fOUM_.js";import{n as h,t as g}from"./label-BzfpLylo.js";import{n as _,t as v}from"./input-Dp1XTGZS.js";import{a as y,c as b,i as x,l as ne,n as re,o as S,r as C,t as ie,u as w}from"./index.esm-DOG1iWsc.js";function T(e){return e.replace(/\]|\[/g,``)}var E,D,O,k,ae=e((()=>{y(),E=(e,t,n)=>{if(e&&`reportValidity`in e){let r=x(n,t);e.setCustomValidity(r&&r.message||``),e.reportValidity()}},D=(e,t)=>{for(let n in t.fields){let r=t.fields[n];r&&r.ref&&`reportValidity`in r.ref?E(r.ref,n,e):r&&r.refs&&r.refs.forEach(t=>E(t,n,e))}},O=(e,t)=>{t.shouldUseNativeValidation&&D(e,t);let n={};for(let r in e){let i=x(t.fields,r),a=Object.assign(e[r]||{},{ref:i&&i.ref});if(k(t.names||Object.keys(e),r)){let e=Object.assign({},x(n,r));S(e,`root`,a),S(n,r,e)}else S(n,r,a)}return n},k=(e,t)=>{let n=T(t);return e.some(e=>T(e).match(`^${n}\\.\\d+`))}}));function A(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}function oe(e,t){for(var n={};e.length;){var r=e[0],i=r.code,a=r.message,o=r.path.join(`.`);if(!n[o])if(`unionErrors`in r){var s=r.unionErrors[0].errors[0];n[o]={message:s.message,type:s.code}}else n[o]={message:a,type:i};if(`unionErrors`in r&&r.unionErrors.forEach(function(t){return t.errors.forEach(function(t){return e.push(t)})}),t){var c=n[o].types,l=c&&c[r.code];n[o]=C(o,t,n,i,l?[].concat(l,r.message):r.message)}e.shift()}return n}function se(e,t){for(var n={};e.length;){var r=e[0],i=r.code,a=r.message,o=r.path.join(`.`);if(!n[o])if(r.code===`invalid_union`&&r.errors.length>0){var s=r.errors[0][0];n[o]={message:s.message,type:s.code}}else n[o]={message:a,type:i};if(r.code===`invalid_union`&&r.errors.forEach(function(t){return t.forEach(function(t){return e.push(t)})}),t){var c=n[o].types,l=c&&c[r.code];n[o]=C(o,t,n,i,l?[].concat(l,r.message):r.message)}e.shift()}return n}function j(e,t,n){if(n===void 0&&(n={}),function(e){return`_def`in e&&typeof e._def==`object`&&`typeName`in e._def}(e))return function(r,i,a){try{return Promise.resolve(A(function(){return Promise.resolve(e[n.mode===`sync`?`parse`:`parseAsync`](r,t)).then(function(e){return a.shouldUseNativeValidation&&D({},a),{errors:{},values:n.raw?Object.assign({},r):e}})},function(e){if(function(e){return Array.isArray(e?.issues)}(e))return{values:{},errors:O(oe(e.errors,!a.shouldUseNativeValidation&&a.criteriaMode===`all`),a)};throw e}))}catch(e){return Promise.reject(e)}};if(function(e){return`_zod`in e&&typeof e._zod==`object`}(e))return function(r,i,a){try{return Promise.resolve(A(function(){return Promise.resolve((n.mode===`sync`?te:s)(e,r,t)).then(function(e){return a.shouldUseNativeValidation&&D({},a),{errors:{},values:n.raw?Object.assign({},r):e}})},function(e){if(function(e){return e instanceof c}(e))return{values:{},errors:O(se(e.issues,!a.shouldUseNativeValidation&&a.criteriaMode===`all`),a)};throw e}))}catch(e){return Promise.reject(e)}};throw Error(`Invalid input: not a Zod schema`)}var M=e((()=>{ae(),y(),l()}));function N({className:e,...t}){let n=z.useId();return(0,R.jsx)(W.Provider,{value:{id:n},children:(0,R.jsx)(`div`,{"data-slot":`form-item`,className:a(`grid gap-2`,e),...t})})}function P({className:e,...t}){let{error:n,formItemId:r}=U();return(0,R.jsx)(g,{"data-slot":`form-label`,"data-error":!!n,className:a(`data-[error=true]:text-destructive`,e),htmlFor:r,...t})}function F({...e}){let{error:t,formItemId:n,formDescriptionId:r,formMessageId:i}=U();return(0,R.jsx)(f,{"data-slot":`form-control`,id:n,"aria-describedby":t?`${r} ${i}`:`${r}`,"aria-invalid":!!t,...e})}function I({className:e,...t}){let{formDescriptionId:n}=U();return(0,R.jsx)(`p`,{"data-slot":`form-description`,id:n,className:a(`text-muted-foreground text-sm`,e),...t})}function L({className:e,...t}){let{error:n,formMessageId:r}=U(),i=n?String(n?.message??``):t.children;return i?(0,R.jsx)(`p`,{"data-slot":`form-message`,id:r,className:a(`text-destructive text-sm`,e),...t,children:i}):null}var R,z,B,V,H,U,W,ce=e((()=>{R=n(),z=t(r()),d(),y(),h(),i(),B=re,V=z.createContext(null),H=({...e})=>(0,R.jsx)(V.Provider,{value:{name:e.name},children:(0,R.jsx)(ie,{...e})}),U=()=>{let e=z.useContext(V),t=z.useContext(W);if(!e)throw Error(`useFormField should be used within <FormField>`);let{getFieldState:n}=ne(),r=w({name:e.name}),i=n(e.name,r),{id:a}=t;return{id:a,name:e.name,formItemId:`${a}-form-item`,formDescriptionId:`${a}-form-item-description`,formMessageId:`${a}-form-item-message`,...i}},W=z.createContext({}),N.__docgenInfo={description:``,methods:[],displayName:`FormItem`},P.__docgenInfo={description:``,methods:[],displayName:`FormLabel`},F.__docgenInfo={description:``,methods:[],displayName:`FormControl`},I.__docgenInfo={description:``,methods:[],displayName:`FormDescription`},L.__docgenInfo={description:``,methods:[],displayName:`FormMessage`},H.__docgenInfo={description:``,methods:[],displayName:`FormField`}})),G,K,q,J,Y,X,Z,Q,$;e((()=>{G=n(),K=t(r()),y(),M(),ee(),ce(),_(),p(),q={title:`UI/Form`,component:B,parameters:{layout:`centered`,docs:{story:{inline:!1}}},tags:[`autodocs`]},J=o({username:u().min(2,{message:`Username must be at least 2 characters.`}),email:u().email({message:`Please enter a valid email address.`})}),Y={args:{},render:()=>(0,G.jsx)(()=>{let e=b({resolver:j(J),defaultValues:{username:``,email:``}}),t=e=>{console.log(e),alert(JSON.stringify(e,null,2))};return(0,G.jsx)(B,{...e,children:(0,G.jsxs)(`form`,{onSubmit:e.handleSubmit(t),className:`w-[350px] space-y-6`,children:[(0,G.jsx)(H,{control:e.control,name:`username`,render:({field:e})=>(0,G.jsxs)(N,{children:[(0,G.jsx)(P,{children:`Username`}),(0,G.jsx)(F,{children:(0,G.jsx)(v,{placeholder:`Enter username`,...e})}),(0,G.jsx)(I,{children:`This is your public display name.`}),(0,G.jsx)(L,{})]})}),(0,G.jsx)(H,{control:e.control,name:`email`,render:({field:e})=>(0,G.jsxs)(N,{children:[(0,G.jsx)(P,{children:`Email`}),(0,G.jsx)(F,{children:(0,G.jsx)(v,{placeholder:`email@example.com`,type:`email`,...e})}),(0,G.jsx)(L,{})]})}),(0,G.jsx)(m,{type:`submit`,className:`w-full`,children:`Submit`})]})})},{})},X={args:{},render:()=>(0,G.jsx)(()=>{let e=b({resolver:j(J),defaultValues:{username:`a`,email:`invalid`}});(0,K.useEffect)(()=>{e.trigger()},[e]);let t=e=>{console.log(e)};return(0,G.jsx)(B,{...e,children:(0,G.jsxs)(`form`,{onSubmit:e.handleSubmit(t),className:`w-[350px] space-y-6`,children:[(0,G.jsx)(H,{control:e.control,name:`username`,render:({field:e})=>(0,G.jsxs)(N,{children:[(0,G.jsx)(P,{children:`Username`}),(0,G.jsx)(F,{children:(0,G.jsx)(v,{placeholder:`Enter username`,...e})}),(0,G.jsx)(I,{children:`This is your public display name.`}),(0,G.jsx)(L,{})]})}),(0,G.jsx)(H,{control:e.control,name:`email`,render:({field:e})=>(0,G.jsxs)(N,{children:[(0,G.jsx)(P,{children:`Email`}),(0,G.jsx)(F,{children:(0,G.jsx)(v,{placeholder:`email@example.com`,type:`email`,...e})}),(0,G.jsx)(L,{})]})}),(0,G.jsx)(m,{type:`submit`,className:`w-full`,children:`Submit`})]})})},{})},Z=o({name:u().min(1,{message:`Name is required.`})}),Q={args:{},render:()=>(0,G.jsx)(()=>{let e=b({resolver:j(Z),defaultValues:{name:``}}),t=e=>{console.log(e),alert(`Hello, ${e.name}!`)};return(0,G.jsx)(B,{...e,children:(0,G.jsxs)(`form`,{onSubmit:e.handleSubmit(t),className:`w-[350px] space-y-6`,children:[(0,G.jsx)(H,{control:e.control,name:`name`,render:({field:e})=>(0,G.jsxs)(N,{children:[(0,G.jsx)(P,{children:`Name`}),(0,G.jsx)(F,{children:(0,G.jsx)(v,{placeholder:`Enter your name`,...e})}),(0,G.jsx)(I,{children:`What should we call you?`}),(0,G.jsx)(L,{})]})}),(0,G.jsx)(m,{type:`submit`,className:`w-full`,children:`Submit`})]})})},{})},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {} as any,
  render: () => {
    const FormExample = () => {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: '',
          email: ''
        }
      });
      const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        alert(JSON.stringify(values, null, 2));
      };
      return <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-[350px] space-y-6">
            <FormField control={form.control} name="username" render={({
            field
          }) => <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>} />
            <FormField control={form.control} name="email" render={({
            field
          }) => <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>;
    };
    return <FormExample />;
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {} as any,
  render: () => {
    const FormExample = () => {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: 'a',
          email: 'invalid'
        }
      });

      // Trigger validation to show errors
      useEffect(() => {
        form.trigger();
      }, [form]);
      const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
      };
      return <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-[350px] space-y-6">
            <FormField control={form.control} name="username" render={({
            field
          }) => <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>} />
            <FormField control={form.control} name="email" render={({
            field
          }) => <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>;
    };
    return <FormExample />;
  }
}`,...X.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {} as any,
  render: () => {
    const FormExample = () => {
      const form = useForm<z.infer<typeof simpleSchema>>({
        resolver: zodResolver(simpleSchema),
        defaultValues: {
          name: ''
        }
      });
      const onSubmit = (values: z.infer<typeof simpleSchema>) => {
        console.log(values);
        alert(\`Hello, \${values.name}!\`);
      };
      return <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-[350px] space-y-6">
            <FormField control={form.control} name="name" render={({
            field
          }) => <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormDescription>What should we call you?</FormDescription>
                  <FormMessage />
                </FormItem>} />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>;
    };
    return <FormExample />;
  }
}`,...Q.parameters?.docs?.source}}},$=[`Default`,`WithError`,`SingleField`]}))();export{Y as Default,Q as SingleField,X as WithError,$ as __namedExportsOrder,q as default};
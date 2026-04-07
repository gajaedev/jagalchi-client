import{j as n}from"./jsx-runtime-DTnbwV_X.js";import{r as l}from"./iframe-DWm5vz6l.js";import{g as C,s as w,b as B,F as W,C as H,c as J,d as Z,u as L}from"./index.esm-CYGdIvJO.js";import{p as k,c as q,$ as G,o as O,s as _}from"./schemas-tDyKxc0J.js";import{S as K}from"./index-CDKmNuCa.js";import{L as Q}from"./label-iOoo8VNa.js";import{c as b}from"./utils-BQHNewu7.js";import{I as x}from"./input-UX7EshsV.js";import{B as D}from"./button-CoIm_4f1.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CHB2PLBQ.js";import"./index-DRKiCHby.js";import"./index-Mes-a1AC.js";import"./index-LHNt3CwB.js";const z=(o,s,r)=>{if(o&&"reportValidity"in o){const e=C(r,s);o.setCustomValidity(e&&e.message||""),o.reportValidity()}},V=(o,s)=>{for(const r in s.fields){const e=s.fields[r];e&&e.ref&&"reportValidity"in e.ref?z(e.ref,r,o):e&&e.refs&&e.refs.forEach(m=>z(m,r,o))}},U=(o,s)=>{s.shouldUseNativeValidation&&V(o,s);const r={};for(const e in o){const m=C(s.fields,e),a=Object.assign(o[e]||{},{ref:m&&m.ref});if(X(s.names||Object.keys(o),e)){const t=Object.assign({},C(r,e));w(t,"root",a),w(r,e,t)}else w(r,e,a)}return r},X=(o,s)=>{const r=P(s);return o.some(e=>P(e).match(`^${r}\\.\\d+`))};function P(o){return o.replace(/\]|\[/g,"")}function $(o,s){try{var r=o()}catch(e){return s(e)}return r&&r.then?r.then(void 0,s):r}function Y(o,s){for(var r={};o.length;){var e=o[0],m=e.code,a=e.message,t=e.path.join(".");if(!r[t])if("unionErrors"in e){var i=e.unionErrors[0].errors[0];r[t]={message:i.message,type:i.code}}else r[t]={message:a,type:m};if("unionErrors"in e&&e.unionErrors.forEach(function(E){return E.errors.forEach(function(N){return o.push(N)})}),s){var h=r[t].types,F=h&&h[e.code];r[t]=B(t,s,r,m,F?[].concat(F,e.message):e.message)}o.shift()}return r}function ee(o,s){for(var r={};o.length;){var e=o[0],m=e.code,a=e.message,t=e.path.join(".");if(!r[t])if(e.code==="invalid_union"&&e.errors.length>0){var i=e.errors[0][0];r[t]={message:i.message,type:i.code}}else r[t]={message:a,type:m};if(e.code==="invalid_union"&&e.errors.forEach(function(E){return E.forEach(function(N){return o.push(N)})}),s){var h=r[t].types,F=h&&h[e.code];r[t]=B(t,s,r,m,F?[].concat(F,e.message):e.message)}o.shift()}return r}function M(o,s,r){if(r===void 0&&(r={}),(function(e){return"_def"in e&&typeof e._def=="object"&&"typeName"in e._def})(o))return function(e,m,a){try{return Promise.resolve($(function(){return Promise.resolve(o[r.mode==="sync"?"parse":"parseAsync"](e,s)).then(function(t){return a.shouldUseNativeValidation&&V({},a),{errors:{},values:r.raw?Object.assign({},e):t}})},function(t){if((function(i){return Array.isArray(i?.issues)})(t))return{values:{},errors:U(Y(t.errors,!a.shouldUseNativeValidation&&a.criteriaMode==="all"),a)};throw t}))}catch(t){return Promise.reject(t)}};if((function(e){return"_zod"in e&&typeof e._zod=="object"})(o))return function(e,m,a){try{return Promise.resolve($(function(){return Promise.resolve((r.mode==="sync"?k:q)(o,e,s)).then(function(t){return a.shouldUseNativeValidation&&V({},a),{errors:{},values:r.raw?Object.assign({},e):t}})},function(t){if((function(i){return i instanceof G})(t))return{values:{},errors:U(ee(t.issues,!a.shouldUseNativeValidation&&a.criteriaMode==="all"),a)};throw t}))}catch(t){return Promise.reject(t)}};throw new Error("Invalid input: not a Zod schema")}const v=W,T=l.createContext(null),c=({...o})=>n.jsx(T.Provider,{value:{name:o.name},children:n.jsx(H,{...o})}),S=()=>{const o=l.useContext(T),s=l.useContext(A);if(!o)throw new Error("useFormField should be used within <FormField>");const{getFieldState:r}=J(),e=Z({name:o.name}),m=r(o.name,e),{id:a}=s;return{id:a,name:o.name,formItemId:`${a}-form-item`,formDescriptionId:`${a}-form-item-description`,formMessageId:`${a}-form-item-message`,...m}},A=l.createContext({});function d({className:o,...s}){const r=l.useId();return n.jsx(A.Provider,{value:{id:r},children:n.jsx("div",{"data-slot":"form-item",className:b("grid gap-2",o),...s})})}function u({className:o,...s}){const{error:r,formItemId:e}=S();return n.jsx(Q,{"data-slot":"form-label","data-error":!!r,className:b("data-[error=true]:text-destructive",o),htmlFor:e,...s})}function f({...o}){const{error:s,formItemId:r,formDescriptionId:e,formMessageId:m}=S();return n.jsx(K,{"data-slot":"form-control",id:r,"aria-describedby":s?`${e} ${m}`:`${e}`,"aria-invalid":!!s,...o})}function I({className:o,...s}){const{formDescriptionId:r}=S();return n.jsx("p",{"data-slot":"form-description",id:r,className:b("text-muted-foreground text-sm",o),...s})}function p({className:o,...s}){const{error:r,formMessageId:e}=S(),m=r?String(r?.message??""):s.children;return m?n.jsx("p",{"data-slot":"form-message",id:e,className:b("text-destructive text-sm",o),...s,children:m}):null}d.__docgenInfo={description:"",methods:[],displayName:"FormItem"};u.__docgenInfo={description:"",methods:[],displayName:"FormLabel"};f.__docgenInfo={description:"",methods:[],displayName:"FormControl"};I.__docgenInfo={description:"",methods:[],displayName:"FormDescription"};p.__docgenInfo={description:"",methods:[],displayName:"FormMessage"};c.__docgenInfo={description:"",methods:[],displayName:"FormField"};const Fe={title:"UI/Form",component:v,parameters:{layout:"centered",docs:{story:{inline:!1}}},tags:["autodocs"]},R=O({username:_().min(2,{message:"Username must be at least 2 characters."}),email:_().email({message:"Please enter a valid email address."})}),g={args:{},render:()=>{const o=()=>{const s=L({resolver:M(R),defaultValues:{username:"",email:""}}),r=e=>{console.log(e),alert(JSON.stringify(e,null,2))};return n.jsx(v,{...s,children:n.jsxs("form",{onSubmit:s.handleSubmit(r),className:"w-[350px] space-y-6",children:[n.jsx(c,{control:s.control,name:"username",render:({field:e})=>n.jsxs(d,{children:[n.jsx(u,{children:"Username"}),n.jsx(f,{children:n.jsx(x,{placeholder:"Enter username",...e})}),n.jsx(I,{children:"This is your public display name."}),n.jsx(p,{})]})}),n.jsx(c,{control:s.control,name:"email",render:({field:e})=>n.jsxs(d,{children:[n.jsx(u,{children:"Email"}),n.jsx(f,{children:n.jsx(x,{placeholder:"email@example.com",type:"email",...e})}),n.jsx(p,{})]})}),n.jsx(D,{type:"submit",className:"w-full",children:"Submit"})]})})};return n.jsx(o,{})}},y={args:{},render:()=>{const o=()=>{const s=L({resolver:M(R),defaultValues:{username:"a",email:"invalid"}});l.useEffect(()=>{s.trigger()},[s]);const r=e=>{console.log(e)};return n.jsx(v,{...s,children:n.jsxs("form",{onSubmit:s.handleSubmit(r),className:"w-[350px] space-y-6",children:[n.jsx(c,{control:s.control,name:"username",render:({field:e})=>n.jsxs(d,{children:[n.jsx(u,{children:"Username"}),n.jsx(f,{children:n.jsx(x,{placeholder:"Enter username",...e})}),n.jsx(I,{children:"This is your public display name."}),n.jsx(p,{})]})}),n.jsx(c,{control:s.control,name:"email",render:({field:e})=>n.jsxs(d,{children:[n.jsx(u,{children:"Email"}),n.jsx(f,{children:n.jsx(x,{placeholder:"email@example.com",type:"email",...e})}),n.jsx(p,{})]})}),n.jsx(D,{type:"submit",className:"w-full",children:"Submit"})]})})};return n.jsx(o,{})}},re=O({name:_().min(1,{message:"Name is required."})}),j={args:{},render:()=>{const o=()=>{const s=L({resolver:M(re),defaultValues:{name:""}}),r=e=>{console.log(e),alert(`Hello, ${e.name}!`)};return n.jsx(v,{...s,children:n.jsxs("form",{onSubmit:s.handleSubmit(r),className:"w-[350px] space-y-6",children:[n.jsx(c,{control:s.control,name:"name",render:({field:e})=>n.jsxs(d,{children:[n.jsx(u,{children:"Name"}),n.jsx(f,{children:n.jsx(x,{placeholder:"Enter your name",...e})}),n.jsx(I,{children:"What should we call you?"}),n.jsx(p,{})]})}),n.jsx(D,{type:"submit",className:"w-full",children:"Submit"})]})})};return n.jsx(o,{})}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}};const xe=["Default","WithError","SingleField"];export{g as Default,j as SingleField,y as WithError,xe as __namedExportsOrder,Fe as default};

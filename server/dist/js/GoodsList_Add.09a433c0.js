(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["GoodsList_Add"],{"0d43":function(e,t,a){"use strict";var r=a("e837"),n=a.n(r);n.a},2374:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("商品管理")]),a("el-breadcrumb-item",[e._v("商品列表")])],1),a("el-card",{staticClass:"box-card"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},on:{clear:e.queryGoodsList},model:{value:e.queryInfo.query,callback:function(t){e.$set(e.queryInfo,"query",t)},expression:"queryInfo.query"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.queryGoodsList},slot:"append"})],1)],1),a("el-col",{attrs:{span:4}},[a("el-button",{attrs:{type:"primary"},on:{click:e.goAdd}},[e._v("添加商品")])],1)],1),a("el-table",{attrs:{data:e.goodsList,border:"",stripe:""}},[a("el-table-column",{attrs:{align:"center",type:"index"}}),a("el-table-column",{attrs:{align:"center",label:"商品名称",prop:"goods_name"}}),a("el-table-column",{attrs:{align:"center",label:"商品价格（元）",prop:"goods_price",width:"110px"}}),a("el-table-column",{attrs:{align:"center",label:"商品重量",prop:"goods_weight",width:"70px"}}),a("el-table-column",{attrs:{align:"center",label:"创建时间",prop:"add_time",width:"140px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e._f("dateFormat")(t.row.add_time))+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"操作",width:"180px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(a){return e.showEditDialog(t.row.goods_id)}}},[e._v("编辑")]),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(a){return e.removGoodById(t.row.goods_id)}}},[e._v("删除")])]}}])})],1),a("el-pagination",{attrs:{"current-page":e.queryInfo.pagenum,"page-size":e.queryInfo.pagesize,"page-sizes":[1,2,5,10],layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){return e.$set(e.queryInfo,"pagenum",t)},"update:current-page":function(t){return e.$set(e.queryInfo,"pagenum",t)}}})],1)],1)},n=[],s=(a("d3b7"),a("96cf"),{data:function(){return{queryInfo:{query:"",pagenum:1,pagesize:10},goodsList:[],total:0}},created:function(){this.queryGoodsList()},methods:{queryGoodsList:function(){var e,t;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,regeneratorRuntime.awrap(this.$http.get("goods",{params:this.queryInfo}));case 2:if(e=a.sent,t=e.data,200===t.meta.status){a.next=6;break}return a.abrupt("return",this.$message.error("获取商品列表失败！"));case 6:this.$message.success("获取商品列表成功！"),this.goodsList=t.data.goods,this.total=t.data.total;case 9:case"end":return a.stop()}}),null,this)},handleSizeChange:function(e){this.queryInfo.pagesize=e,this.queryGoodsList()},handleCurrentChange:function(e){this.queryInfo.pagenum=e,this.queryGoodsList()},removGoodById:function(e){var t,a,r;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,regeneratorRuntime.awrap(this.$confirm("此操作将永久删除该商品，是否继续？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((function(e){return e})));case 2:if(t=n.sent,"confirm"===t){n.next=5;break}return n.abrupt("return",this.$message.info("已经取消删除！"));case 5:return n.next=7,regeneratorRuntime.awrap(this.$http.delete("goods/".concat(e)));case 7:if(a=n.sent,r=a.data,200===r.meta.status){n.next=11;break}return n.abrupt("return",this.$message.error("删除失败！"));case 11:this.$message.success("删除成功！"),this.queryGoodsList();case 13:case"end":return n.stop()}}),null,this)},goAdd:function(){this.$router.push("/goods/add")}}}),o=s,i=a("2877"),l=Object(i["a"])(o,r,n,!1,null,"4ba353c8",null);t["default"]=l.exports},"4f9b":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("商品管理")]),a("el-breadcrumb-item",[e._v("添加商品")])],1),a("el-card",[a("el-alert",{attrs:{title:"添加商品信息",type:"info",closable:!1,center:"","show-icon":""}}),a("el-steps",{attrs:{space:200,active:e.active-0,"finish-status":"success","align-center":""}},[a("el-step",{attrs:{title:"基本信息"}}),a("el-step",{attrs:{title:"商品参数"}}),a("el-step",{attrs:{title:"商品属性"}}),a("el-step",{attrs:{title:"商品图片"}}),a("el-step",{attrs:{title:"商品内容"}}),a("el-step",{attrs:{title:"完成"}})],1),a("el-form",{ref:"addFormRef",attrs:{model:e.addForm,rules:e.addFormRules,"label-width":"100px","label-position":"top"}},[a("el-tabs",{attrs:{"tab-position":e.tabPosition,"before-leave":e.beforeTabLeave},on:{"tab-click":e.tabClicked},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},[a("el-tab-pane",{attrs:{label:"基本信息",name:"0"}},[a("el-form-item",{attrs:{label:"商品名称:",prop:"goods_name"}},[a("el-input",{model:{value:e.addForm.goods_name,callback:function(t){e.$set(e.addForm,"goods_name",t)},expression:"addForm.goods_name"}})],1),a("el-form-item",{attrs:{label:"商品价格",prop:"goods_price"}},[a("el-input",{attrs:{type:"number"},model:{value:e.addForm.goods_price,callback:function(t){e.$set(e.addForm,"goods_price",t)},expression:"addForm.goods_price"}})],1),a("el-form-item",{attrs:{label:"商品重量",prop:"goods_weight"}},[a("el-input",{attrs:{type:"number"},model:{value:e.addForm.goods_weight,callback:function(t){e.$set(e.addForm,"goods_weight",t)},expression:"addForm.goods_weight"}})],1),a("el-form-item",{attrs:{label:"商品数量",prop:"goods_number"}},[a("el-input",{attrs:{type:"number"},model:{value:e.addForm.goods_number,callback:function(t){e.$set(e.addForm,"goods_number",t)},expression:"addForm.goods_number"}})],1),a("el-form-item",{attrs:{label:"商品分类",prop:"goods_cat"}},[a("el-cascader",{attrs:{"expand-trigger":"hover",options:e.catelist,props:e.cateProps},on:{change:e.handleChange},model:{value:e.addForm.goods_cat,callback:function(t){e.$set(e.addForm,"goods_cat",t)},expression:"addForm.goods_cat"}})],1)],1),a("el-tab-pane",{attrs:{label:"商品参数",name:"1"}},e._l(e.manyTableData,(function(t,r){return a("el-form-item",{key:r,attrs:{label:t.attr_name}},[a("el-checkbox-group",{model:{value:t.attr_vals,callback:function(a){e.$set(t,"attr_vals",a)},expression:"item.attr_vals"}},e._l(t.attr_vals,(function(e,t){return a("el-checkbox",{key:t,attrs:{border:"",size:"small",label:e}})})),1)],1)})),1),a("el-tab-pane",{attrs:{label:"商品属性",name:"2"}},e._l(e.onlyTableData,(function(t,r){return a("el-form-item",{key:t.attr_id,attrs:{label:t.attr_name}},[a("el-input",{model:{value:t.attr_vals,callback:function(a){e.$set(t,"attr_vals",a)},expression:"item.attr_vals"}})],1)})),1),a("el-tab-pane",{attrs:{label:"商品图片",name:"3"}},[a("el-upload",{attrs:{headers:e.headerObj,action:e.uploadURL,"on-preview":e.handlePreview,"on-remove":e.handleRemove,"list-type":"picture","on-success":e.handleSuccess}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1),a("el-tab-pane",{attrs:{label:"商品内容",name:"4"}},[a("quill-editor",{model:{value:e.addForm.goods_introduce,callback:function(t){e.$set(e.addForm,"goods_introduce",t)},expression:"addForm.goods_introduce"}}),a("el-button",{staticClass:"btnAdd",attrs:{type:"primary"},on:{click:e.add}},[e._v("添加商品")])],1)],1)],1)],1),a("el-dialog",{attrs:{title:"图片预览",visible:e.previewVisible,width:"50%"},on:{"update:visible":function(t){e.previewVisible=t}}},[a("img",{staticClass:"previewImg",attrs:{src:e.previewPath,alt:""}})])],1)},n=[],s=(a("c740"),a("a15b"),a("a434"),a("d3b7"),a("5319"),a("1276"),a("159b"),a("96cf"),a("60bb")),o=a.n(s),i={data:function(){return{active:"0",tabPosition:"left",addForm:{goods_name:"",goods_price:0,goods_weight:0,goods_number:0,goods_cat:[],pics:[],goods_introduce:"",attrs:[]},addFormRules:{goods_name:[{required:!0,message:"请输入商品名称",trigger:"blur"}],goods_price:[{required:!0,message:"请输入商品价格",trigger:"blur"}],goods_weight:[{required:!0,message:"请输入商品重量",trigger:"blur"}],goods_number:[{required:!0,message:"请输入商品数量",trigger:"blur"}],goods_cat:[{required:!0,message:"请选择商品分类",trigger:"blur"}]},catelist:[],cateProps:{value:"cat_id",label:"cat_name",children:"children"},manyTableData:[],onlyTableData:[],uploadURL:"http://localhost:8888/api/private/v1/upload",headerObj:{Authorization:window.sessionStorage.getItem("token")},previewPath:"",previewVisible:!1}},created:function(){this.getCateList()},methods:{getCateList:function(){var e,t;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,regeneratorRuntime.awrap(this.$http.get("categories"));case 2:if(e=a.sent,t=e.data,200===t.meta.status){a.next=6;break}return a.abrupt("return",this.$message.error("获取商品分类失败！"));case 6:this.catelist=t.data;case 7:case"end":return a.stop()}}),null,this)},handleChange:function(){3===this.addForm.goods_cat.length||(this.addForm.goods_cat=[])},beforeTabLeave:function(e,t){if("0"===t&&3!==this.addForm.goods_cat.length)return this.$message.error("请填写商品分类！"),!1},tabClicked:function(){var e,t,a,r;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:if("1"!==this.active){n.next=10;break}return n.next=3,regeneratorRuntime.awrap(this.$http.get("categories/".concat(this.cateId,"/attributes"),{params:{sel:"many"}}));case 3:e=n.sent,t=e.data,200!==t.meta.status&&this.$message.error("获取动态参数列表失败"),t.data.forEach((function(e){e.attr_vals=0===e.attr_vals.length?[]:e.attr_vals.split(" ")})),this.manyTableData=t.data,n.next=17;break;case 10:if("2"!==this.active){n.next=17;break}return n.next=13,regeneratorRuntime.awrap(this.$http.get("categories/".concat(this.cateId,"/attributes"),{params:{sel:"only"}}));case 13:a=n.sent,r=a.data,200!==r.meta.status&&this.$message.error("获取静态属性列表失败"),this.onlyTableData=r.data;case 17:case"end":return n.stop()}}),null,this)},handlePreview:function(e){var t=e.response.data.url.replace("127.0.0.1","localhost");this.previewPath=t,this.previewVisible=!0},handleRemove:function(e){var t=e.response.data.tmp_path,a=this.addForm.pics.findIndex((function(e){return e.pic===t}));this.addForm.pics.splice(a,1)},handleSuccess:function(e){var t={pic:e.data.tmp_path};this.addForm.pics.push(t)},add:function(){var e=this;this.$refs.addFormRef.validate((function(t){var a,r,n;return regeneratorRuntime.async((function(s){while(1)switch(s.prev=s.next){case 0:if(t){s.next=2;break}return s.abrupt("return",e.$message.error("请填写必要的表单项！"));case 2:return a=o.a.cloneDeep(e.addForm),a.goods_cat=a.goods_cat.join(","),e.manyTableData.forEach((function(t){var a={attr_id:t.attr_id,attr_value:t.attr_vals.join(" ")};e.addForm.attrs.push(a)})),e.onlyTableData.forEach((function(t){var a={attr_id:t.attr_id,attr_value:t.attr_vals};e.addForm.attrs.push(a)})),a.attrs=e.addForm.attrs,s.next=9,regeneratorRuntime.awrap(e.$http.post("goods",a));case 9:if(r=s.sent,n=r.data,201===n.meta.status){s.next=13;break}return s.abrupt("return",e.$message.error("添加商品失败！"));case 13:e.$message.success("添加商品成功！"),e.$router.push("/goods");case 15:case"end":return s.stop()}}))}))}},computed:{cateId:function(){return 3===this.addForm.goods_cat.length?this.addForm.goods_cat[2]:null}}},l=i,c=(a("0d43"),a("2877")),d=Object(c["a"])(l,r,n,!1,null,"0d371a9f",null);t["default"]=d.exports},5319:function(e,t,a){"use strict";var r=a("d784"),n=a("825a"),s=a("7b0b"),o=a("50c4"),i=a("a691"),l=a("1d80"),c=a("8aa5"),d=a("14c3"),u=Math.max,p=Math.min,m=Math.floor,g=/\$([$&'`]|\d\d?|<[^>]*>)/g,h=/\$([$&'`]|\d\d?)/g,b=function(e){return void 0===e?e:String(e)};r("replace",2,(function(e,t,a){return[function(a,r){var n=l(this),s=void 0==a?void 0:a[e];return void 0!==s?s.call(a,n,r):t.call(String(n),a,r)},function(e,s){var l=a(t,e,this,s);if(l.done)return l.value;var m=n(e),g=String(this),h="function"===typeof s;h||(s=String(s));var f=m.global;if(f){var v=m.unicode;m.lastIndex=0}var _=[];while(1){var y=d(m,g);if(null===y)break;if(_.push(y),!f)break;var w=String(y[0]);""===w&&(m.lastIndex=c(g,o(m.lastIndex),v))}for(var x="",$=0,k=0;k<_.length;k++){y=_[k];for(var F=String(y[0]),q=u(p(i(y.index),g.length),0),I=[],R=1;R<y.length;R++)I.push(b(y[R]));var L=y.groups;if(h){var C=[F].concat(I,q,g);void 0!==L&&C.push(L);var z=String(s.apply(void 0,C))}else z=r(F,g,q,I,L,s);q>=$&&(x+=g.slice($,q)+z,$=q+F.length)}return x+g.slice($)}];function r(e,a,r,n,o,i){var l=r+e.length,c=n.length,d=h;return void 0!==o&&(o=s(o),d=g),t.call(i,d,(function(t,s){var i;switch(s.charAt(0)){case"$":return"$";case"&":return e;case"`":return a.slice(0,r);case"'":return a.slice(l);case"<":i=o[s.slice(1,-1)];break;default:var d=+s;if(0===d)return t;if(d>c){var u=m(d/10);return 0===u?t:u<=c?void 0===n[u-1]?s.charAt(1):n[u-1]+s.charAt(1):t}i=n[d-1]}return void 0===i?"":i}))}}))},c740:function(e,t,a){"use strict";var r=a("23e7"),n=a("b727").findIndex,s=a("44d2"),o="findIndex",i=!0;o in[]&&Array(1)[o]((function(){i=!1})),r({target:"Array",proto:!0,forced:i},{findIndex:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}}),s(o)},e837:function(e,t,a){}}]);
//# sourceMappingURL=GoodsList_Add.09a433c0.js.map
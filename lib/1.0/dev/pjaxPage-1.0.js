/*!
 * pjaxPage JavaScript Library v1.0
 * https://gitee.com/xixifeng.com/pjaxpage
 *
 * Author: xixifeng (fastquery@126.com)  
 * 
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 *
 * Date: 2017-05-18
 */
(function($){
   
    $.extend({
    	    tpl: function(template, data) {
    	    	  return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
    	    		    var keys = key.split("."), v = data[keys.shift()];
    	    		    for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
    	    		    return (typeof v !== "undefined" && v !== null) ? v : "";
    	    		  });
    	    },
            pjaxPage:function(options) {
       		 var successFnStr = "", dataStr = "";
             var defaults = {
            		 ajax: {},                               // jQuery的ajax的配置(settings), 注意:不用设置data和success函数. 在这里支持jQuery.ajax所有的配置选项.// ajax的settings,请参照jQuery官方说明
                     size : 15,                              // (默认值:15)每页显示多少条数据
                     pageKeyName: "page",
                     sizeKeyName: "size",
                     currentPage: 1,                         // (默认值:1)设置默认当前页      
                     dataListBox: $("#dataListBox"),         // (默认值:$("#dataListBox"))用于装分页数据的盒子               
                     pageCodeBox: $("#pageCodeBox"),         // (默认值:$("#pageCodeBox"))用于装分页码(分页控制区)的盒子
                     pageInfoTpl: "<p>共{totalElements}条记录,总页数:{totalPages}</p>", // 分页摘要
                     buildTplSource : function(data,textStatus,jqXHR){               // 构建模板数据源
                    	 return { 
                    		 totalElements:data.pageData.totalElements,
                    		 currentPage:data.pageData.number,
                    		 totalPages:data.pageData.totalPages};
                     },
                     pageModel : {
         				name : "numberModel"                 // (默认:numberModel) 分页模型的名称
                     },     
                     createDataHtml:function(data,textStatus,jqXHR){          // 创建当前页html代码,并返回
                         return "";
                     },                                      
                     notFoundTip : "Not Found Data!",        // (默认:Not Found Data!)如果没有找到数据,会将此选项设置的值写入到用于装数据列表的盒子里.支持html语法     
                     pageCodeItem : "a[tabindex]",           // 页码项元素, 默认值是 "a[tabindex]"
                     eventName: "click",                     // 页码触发事件,默认是"click",可选值,所有事件中任意一个名称即可. mouseover,dblclick 当然,你也可以基于jQuery定义一个事件
                     dataCache : true,                       // 是否用jQuery的data缓存数据, 默认允许
                     clear : function(){                     // 清除缓存
                    	this.dataListBox.removeData();
                    	return this;
                     },
                     writeListBefore: function(){            // 数据列表写入倒dom之前,该方法的上下文对象为opts
                     },          
                     writeListAfter: function(data,textStatus,jqXHR){         // 数据列表写入倒dom之后,data为服务器响应的数据,该方法的上下文对象为opts
                     },       
                     getReqParam: function(){  // 获取请求参数,注意:它的上下文对象为opts
                    	 var params = {
             					page : this.currentPage,
             					size : this.size
             				};

             			 return $.param(params); // 分页查询参数
                     },                     
                     // pjax 设置
                     pjaxId: "xixifeng_pjax",                 // pjaxId
                     enabledPjax: true,                      // (默认启用)是否启用pjax
                     pageHrefPre: window.location.href.replace(window.location.search,""),    // 页码链接地址前缀,注意:不要出现?号
                         
     
                     writeData : function(){          // 写入数据.注意,此方法的上下文对象为opts
                            var dataHtml = this.createDataHtml.call(this,this.data,this.textStatus,this.jqXHR); // 数据列表的html
                            var pageModelName = this.pageModel.name;  // 获得分页模型的名称
                            var modelMethod = $[pageModelName];       // 根据名称获得分页模型函数(这有点类似java的反射)
                            this.pageInfo = $.tpl(this.pageInfoTpl,this.buildTplSource.call(this,this.data,this.textStatus,this.jqXHR));
                            modelMethod.call(this);                   // 调用分页模型函数
                            
                            if(dataHtml==""||dataHtml==null) {
                                dataHtml = this.notFoundTip;
                            }
                            
                            // 翻页时显示效果有待改进...
                            this.dataListBox.html(dataHtml).css("opacity",1);
                            
                            var cacheData = this.dataListBox.data("pageCode" + this.currentPage);
                            if( (cacheData == undefined || cacheData == "") && this.dataCache ) //如果这一页没有缓存
                            {   
                                    // 缓存从服务端过来的当前data 键名为: "pageCode" + this.currentPage, 如果没有缓存就缓存
                                    // 保存缓存
                                    this.dataListBox.data("pageCode" + this.currentPage, this.data);
                            }
                            //====================================如果启用了pjax================================================     
                            if(this.enabledPjax) { 
                              // 为页码的href赋予值(也就是将它的sorce值给href)
                              this.pageCodeBox.find(this.pageCodeItem).each(function(){
                                  $(this).attr("href",$(this).attr("source"));
                              });
                            }
                            //========================================如果启用了pjax End============================================  
                            this.writeListAfter.call(this,this.data,this.textStatus,this.jqXHR);  // 真正写入之后  
                        },
                        
                        
                     initPage : function(){  // 从服务器获得数据的方式,然后执行写入数据,上下文对象为opts
                            if(countInitPage != undefined) {
                                ++countInitPage;
                            }
                         
                            var contextObj = this;
                            
                            // 翻页前历史数据效果
                            this.dataListBox.css("opacity",0.5);
                            this.writeListBefore.call(this);     // 在正式发送请求之前
                            
                            // 将 data转换"&foo=bar1&foo=bar2"格式
                            var dt  = contextObj.getReqParam.call(contextObj);
                           
                            var ajaxSettings = this.ajax;
                            if(successFnStr === "") { // 确保只赋值一次
                            	if(!ajaxSettings.success) {
                                	successFnStr = "N";
                            	} else {
                                	successFnStr = ajaxSettings.success + "";
                            	}
                            }
                            if(dataStr === "") { // 确保只赋值一次
                            	if(!ajaxSettings.data){
                                	dataStr = "N";	
                            	} else {
                            		if($.type(ajaxSettings.data)==="string") {
                            			dataStr = ajaxSettings.data + "";	
                            		} else {
                            			dataStr = $.param(ajaxSettings.data) + "";	
                            		}
                            	}
                            }
                            //alert("successFnStr=" + successFnStr +",dataStr="+dataStr);
                            ajaxSettings.data = $.type(dt)==="string"?dt:$.param(dt);
   						    if(dataStr !== "N") {
   						    	ajaxSettings.data = ajaxSettings.data+"&"+dataStr;
   						    }
   						    ajaxSettings.data = ajaxSettings.data.replace("page=",this.pageKeyName+"=").replace("size=",this.sizeKeyName+"=");
                            ajaxSettings.success = function(data,textStatus,jqXHR) {
                            	contextObj.data = data;
                            	contextObj.textStatus = textStatus;
                            	contextObj.jqXHR = jqXHR;
       						    contextObj.writeData.call(contextObj);
       						    if(successFnStr !== "N") {
           						   eval("("+successFnStr+")(contextObj.data,contextObj.textStatus,contextObj.jqXHR);");
       						    }
        					};
        					// 执行ajax
        					$.ajax(ajaxSettings);
                      },
                      
                     triggerEvent:function(ts,evt){ // 触发事件要做的事情. 注意:该方法的上下文对象是opts,ts:表示事件触发源的对象
                         
                            if(startReqData != undefined) {
                                 opts.getReqParam =  startReqData; // 重要.............................................................................................................................   
                            }
                            
                            var currentPage = ts.attr("tabindex");
                            //  ========================== 注意 ======================
                            // 在这里给全局的currentPage 赋值
                            this.currentPage = currentPage; // 
                            
                            var cacheData = this.dataListBox.data("pageCode"+currentPage);
                            
                            // 如果缓存中没有,发起新请求
                            if(  cacheData == "" || cacheData == undefined ) {
                                this.initPage.call(this);
                            } else {
                                // 用缓存的数据写入
                            	this.data = this.dataListBox.data("pageCode"+currentPage);
                                this.writeData.call(this);
                            }                      
            
                            //========================================如果启用了pjax============================================  
                            if(this.enabledPjax && supportPushState) {
                                 evt.preventDefault();   //阻止默认事件行为的触发。
                                 // 改变当前地址栏(当前触发的页码的链接地址)
                                 //地址栏 需要 pjaxId 待续...................
                                 var reqd = ts.attr("href");
                                 history.pushState({"reqParams": this.getReqParam(),"pageIndex":this.currentPage}, document.title, reqd); 
                                 // 设置标题
                                 // document.title = "标题"
                            }            
                         //========================================如果启用了pjax End============================================  
                         
                     },
                     
                     /**
             		 * 计算开始页和结束页
             		 * 参数:
             		 * indexNum (必选项) 页面中要显示的页面个数
             		 * currentPage     (必选项) 当前页
             		 * totalpage       (必选项) 总页面数
             		 * 返回: {"startpage" : startpage,"endpage":endpage}
             		 */
             		pageIndex: function(indexNum,currentPage,totalpage){
             		var startpage = currentPage - ( (indexNum % 2 == 0) ? (indexNum / 2 - 1) : parseInt(indexNum / 2) );
             		var endpage = currentPage + parseInt(indexNum / 2);

             		if (startpage < 1) {
             		    startpage = 1;
             		    if (totalpage >= indexNum) {
             		         endpage = indexNum;
             		    }
             		    else {
             		         endpage = totalpage;
             		    }
             		       
             		}
             		if (endpage > totalpage) {
             		    endpage = totalpage;
             		    if ((endpage - indexNum) > 0)
             		        startpage = endpage - indexNum + 1;
             		    else
             		        startpage = 1;
             		} 
             		        return {"startpage" : startpage,"endpage":endpage};
             	    },
                     
             	    
             		/**
             		 * 从一个参数地址中查询出一个参数的值.
             		 * 举例: 从a=1&b=2&c=3查出c的值. 写法:queryParam("a=1&b=2&c=3","c") 得出3.
             		 * 
             		 * 参数:
             		 * href: (必选项) url地址
             		 * name: (必选项) 参数的名称
             		 * 返回: 参数值,如果没有找到返回""
             		 */
                     queryParam: function(href,name) {
                        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                        var r = href.match(reg);
                        if (r != null) {
                             return unescape(r[2]);    
                        }
                        return "";
                     }
                     
                    };
             
             
            var opts = $.extend(defaults, options);
            
            var listenEvent = function(evt){ // 监听事件
                    opts.triggerEvent.call(opts,$(this),evt); // 这里的this表示触发源的对象
            };
            
            // 把分页触发事件委托给页码项
            //opts.pageCodeBox.find(opts.pageCodeItem).die().live(opts.eventName,listenEvent); //jQuery 最新版本已经删除: die()/live() 
            opts.pageCodeBox.off(opts.eventName).on(opts.eventName,opts.pageCodeItem,listenEvent);
            
            var supportPushState = history.pushState;
            
            //========================================如果启用了pjax============================================  
            if(opts.enabledPjax && supportPushState) {
                
                 // pjax 开始时的请求参数
                 var startReqData = opts.getReqParam; 
                 // pjax 开始时的页码
                 var home = opts.currentPage;
                 var countInitPage = 0; // 统计 initPage 方法被执行的次数
                 
                 
                $(window).off("popstate").on("popstate", function(){
                      if(countInitPage > 1){
                        var reqParams;  // pushState存储的请求参数
                        var pageIndex;  // pushState存储的页码索引
                        if(history.state!=null){
                            //alert("正在后退/前进");
                            reqParams = history.state.reqParams;
                            pageIndex = history.state.pageIndex;
                            opts.currentPage = pageIndex;
                            // 获取历史的请求参数,在此重写getReqParam方法即可
                            opts.getReqParam =  function(){ 
                                return reqParams; // 把历史存下来的参数返回出去
                            };
                        } else {
                            //alert("pjax 结束啦!");
                            opts.currentPage = home;
                            opts.getReqParam =  startReqData;
                        }
                            var cacheData = opts.dataListBox.data("pageCode" + pageIndex);
                            // 如果缓存中没有,发起新请求
                            if( !cacheData || cacheData == "" ) {
                                opts.initPage.call(opts);  
                            } else {
                                 //alert("回退或前进时的page:" + opts.currentPage);
                                if(!pageIndex) { 
                                	 pageIndex = home; 
                                }
                                // 用缓存的数据写入
                                opts.data = opts.dataListBox.data("pageCode"+pageIndex);
                                opts.writeData.call(opts);
                            }  
                            
                            // pageIndex == undefined 表明 pjax已经走到最初的状态,就应该禁止回退
                            if(pageIndex == undefined) {
                                   // 这个办法很不好, 有待改进========================================================================
                                   // javascript:window.history.forward(1);
                             }   
                                
                      } 
                }); 
               // 特别注意:  google 执行到这里 还接着去执行popstate的监听事件(火狐不会)
            } 
            //========================================如果启用了pjax End============================================  
            
            
           
            // 如果请求参数已经携带page参数,那么opts.currentPage就以page的参数为准
            var hrefPage = opts.queryParam(window.location.search.substr(1),"page");
            if($.isNumeric(hrefPage)){ // 如果是个数字
                opts.currentPage = parseInt(hrefPage);    
            } 
            
            // 初始化分页
            opts.initPage.call(opts); 
  
            return opts;

         }
     });
})(jQuery);

































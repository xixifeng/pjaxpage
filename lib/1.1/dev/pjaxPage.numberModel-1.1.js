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
		
        numberModel:function(){
        	
        	// 分页模型的可选配置选项的默认值
            var defaults = {
                activeName : "active",             // (默认:active) 被触发后的class样式选择器的名称
                indexNum : 5,                      // (可选项) 指定在分页控制区中显示分页索引的个数(不包含"..."或"箭头")
                home : "&lt;&lt;",
                prev : "&lt;",
                next : "&gt;",
                end : "&gt;&gt;",
                showEllipsis : true // 是否显示省略号(...)
            };
                        
            // 这个函数的this对象就是pjaxPage对象, 通过它可以获得分页data和pjaxPage的配置参数(options)
            var pjaxPageOpts = this;
            var data = pjaxPageOpts.data[this.pageDataKeyName]; // 分页数据
            
            var opts = $.extend(defaults, pjaxPageOpts.pageModel.opts);
            
            var number = data.number;           // 当前是第几页
            var totalPages = data.totalPages;        // 总页数
            
            var first = data.first;                      // 这是第一页吗?
            var last = data.last;                        // 这是最后一页吗?
            var hasContent = data.hasContent;            // 当前页有数据吗?
            var numberOfElements = data.numberOfElements;// 当前页实际显示的条数
            var size = data.size;                        // 定义的每页是多少条
            
            var activeName = opts.activeName;
                           
            var  pageIndexObj = pjaxPageOpts.pageIndex(opts.indexNum,number, totalPages);
                
            var startpage = pageIndexObj.startpage;
            var endpage = pageIndexObj.endpage;

            var pageHrefPre = "";
            
            if(pjaxPageOpts != null) {
                  pageHrefPre = pjaxPageOpts.getReqParam();   // 当前请求参数    
                  pageHrefPre = pjaxPageOpts.pageHrefPre + "?" + pageHrefPre;
                  // 页就是当前页不用传递.
                  // 过滤 page 参数(即过滤page=xx)
                  pageHrefPre = pageHrefPre.replace("?page=","?"+pjaxPageOpts.pjaxId+"=");
                  pageHrefPre = pageHrefPre.replace("&page=","&"+pjaxPageOpts.pjaxId+"=");
                  // 干掉page参数后,又加上,但是不给它赋值
                  pageHrefPre = pageHrefPre + "&page="; 
            }
            
            var pageCtrl = '';
            var pageInfoTpl = opts.pageInfoTpl ? opts.pageInfoTpl :  pjaxPageOpts.pageInfoTpl;
            if(totalPages>0){
                pageCtrl += $.tpl(pageInfoTpl,pjaxPageOpts.buildTplSource.call(pjaxPageOpts,pjaxPageOpts.data,pjaxPageOpts.textStatus,pjaxPageOpts.jqXHR));
                pageCtrl +=  '<ul class="pagination">';
                // 不是第一页时，显示首页
               if (!first) {  //等价 number > 1
                     pageCtrl += '<li><a href="javascript:;" target="_self" title="第一页" tabindex="1" source="'+pageHrefPre+1+'">'+opts.home+'</a></li>'; 
                     pageCtrl += '<li><a href="javascript:;" target="_self" title="上一页" tabindex="' + (number-1) + '" source="'+pageHrefPre+(number-1)+'">'+opts.prev+'</a></li>'; 
                     
                     // 如果显示页码的第一个(startpage)  大于 1 就显示 ...首页码(如:1...)
                     if( startpage > 1 && opts.showEllipsis) {
                         pageCtrl += '<li><a href="javascript:;" target="_self" tabindex="1" source="'+pageHrefPre+1+'">1...</a></li>';  
                     }
               }
               
                if (number <= totalPages) {
                for (var i = startpage; i <= endpage; i++) {
                        // 为当前页加.active样式
                        if (number == i) {
                            pageCtrl += '<li class="'+activeName+'"><a href="javascript:;" target="_self" tabindex="' + i + '" source="'+pageHrefPre+i+'">' + i + '</a></li>';
                        } else {
                            pageCtrl += '<li><a href="javascript:;" target="_self" tabindex="' + i + '" source="'+pageHrefPre+i+'">' + i + '</a></li>';
                        }
                    
                }
                                
                // 不是最后一页
                if ( !last ) { //等价: number < totalPages
                    
                    // 如果显示页码的最后一个(endpage)  小于 totalPages 就显示 ...尾页码(如:...110)
                    if(endpage < totalPages && opts.showEllipsis) {
                       pageCtrl += '<li><a href="javascript:;" target="_self" tabindex="' +  totalPages + '" source="'+pageHrefPre+totalPages+'">...' + totalPages + '</a></li>';  
                    }
                    
                    pageCtrl += '<li><a href="javascript:;" target="_self" title="下一页" tabindex="' + (number+1) + '" source="'+pageHrefPre+(number+1)+'">'+opts.next+'</a></li>';
                    pageCtrl += '<li><a href="javascript:;" target="_self" title="最后一页" tabindex="' + totalPages + '" source="'+pageHrefPre+totalPages+'">'+opts.end+'</a></li>';
                } 

            }
         
            pageCtrl += '</ul>'; 
          
          } else {
              pageCtrl += '<div class="leftlabel">当前为第<strong>' + number + '</strong>页</div>';
              pageCtrl += '<ul class="pagination">';
              if(number>1){
                  pageCtrl += '<li><a href="javascript:;" target="_self" title="第一页" tabindex="1" source="'+pageHrefPre+1+'">'+opts.home+'</a></li>';
                  pageCtrl += '<li><a href="javascript:;" target="_self" tabindex="'+(number-1)+'" source="'+pageHrefPre+(number-1)+'">上一页</a></li>'; 
              }
              if(hasContent && numberOfElements===size) { // 
                  pageCtrl += '<li><a href="javascript:;" target="_self" tabindex="'+(number+1)+'" source="'+pageHrefPre+(number+1)+'">下一页</a></li>'; 
              }
              pageCtrl += '</ul>';
          }
        
         // 写入到dom
         pjaxPageOpts.pageCodeBox.html(pageCtrl);

         return opts;
                
        }
	});
})(jQuery);
    	
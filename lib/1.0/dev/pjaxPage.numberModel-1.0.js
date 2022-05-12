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
                activeName : "active",             // (默认:active) 触发后的页码样式
                indexNum : 5,                      // (可选项) 指定在分页控制区中显示分页索引的个数(不包含"..."或"箭头")
                home : "&lt;&lt;",
                prev : "&lt;",
                next : "&gt;",
                end : "&gt;&gt;",
                showEllipsis : true // 是否显示省略号(...)
            };
                        
            // 这个函数的this对象就是pjaxPage对象, 通过它可以获得分页data和pjaxPage的配置参数(options)
            var pjaxPageObj = this;
            var data = pjaxPageObj.data.pageData; // 分页数据
            
            var opts = $.extend(defaults, pjaxPageObj.pageModel.opts);
            
            var number = data.number;           // 当前是第几页
            var totalPage = data.totalPages;        // 总页数
            
            var first = data.first;                      // 这是第一页吗?
            var last = data.last;                        // 这是最后一页吗?
            var hasContent = data.hasContent;            // 当前页有数据吗?
            var numberOfElements = data.numberOfElements;// 当前页实际显示的条数
            var size = data.size;                        // 定义的每页是多少条
            
            var activeName = opts.activeName;
                           
            var  pageIndexObj = pjaxPageObj.pageIndex(opts.indexNum,number, totalPage);
                
            var startpage = pageIndexObj.startpage;
            var endpage = pageIndexObj.endpage;

            var pageHrefPre = "";
            
            if(pjaxPageObj != null) {
                  pageHrefPre = pjaxPageObj.getReqParam();   // 当前请求参数    
                  pageHrefPre = pjaxPageObj.pageHrefPre + "?" + pageHrefPre;
                  // 页就是当前页不用传递.
                  // 过滤 page 参数(即过滤page=xx)
                  pageHrefPre = pageHrefPre.replace("?page=","?"+pjaxPageObj.pjaxId+"=");
                  pageHrefPre = pageHrefPre.replace("&page=","&"+pjaxPageObj.pjaxId+"=");
                  // 干掉page参数后,又加上,但是不给它赋值
                  pageHrefPre = pageHrefPre + "&page="; 
            }
                      
            var getRandom = function(){
               // return "&_r="+Math.random(); // 随机码可以不用,获得地址栏的参数后,通过ajax请求再给予验证码即可
               return ""; 
            };
            
            var pageMenu = '';
            
            if(totalPage>0){
            	
                pageMenu += pjaxPageObj.pageInfo;
                pageMenu +=  '<ul class="pagination">';
                // 不是第一页时，显示首页
               if (!first) {  //等价 number > 1
                     pageMenu += '<li><a href="javascript:;" target="_self" title="第一页" tabindex="1" source="'+pageHrefPre+1+getRandom()+'">'+opts.home+'</a></li>'; 
                     pageMenu += '<li><a href="javascript:;" target="_self" title="上一页" tabindex="' + (number-1) + '" source="'+pageHrefPre+(number-1)+getRandom()+'">'+opts.prev+'</a></li>'; 
                     
                     // 如果显示页码的第一个(startpage)  大于 1 就显示 ...首页码(如:1...)
                     if( startpage > 1 && opts.showEllipsis) {
                         pageMenu += '<li><a href="javascript:;" target="_self" tabindex="1" source="'+pageHrefPre+1+getRandom()+'">1...</a></li>';  
                     }
               }
               
                if (number <= totalPage) {
                for (var i = startpage; i <= endpage; i++) {
                        // 为当前页加.active样式
                        if (number == i) {
                            pageMenu += '<li class="'+activeName+'"><a href="javascript:;" target="_self" tabindex="' + i + '" source="'+pageHrefPre+i+getRandom()+'">' + i + '</a></li>';
                        } else {
                            pageMenu += '<li><a href="javascript:;" target="_self" tabindex="' + i + '" source="'+pageHrefPre+i+getRandom()+'">' + i + '</a></li>';
                        }
                    
                }
                                
                // 不是最后一页
                if ( !last ) { //等价: number < totalPage
                    
                    // 如果显示页码的最后一个(endpage)  小于 totalPage 就显示 ...尾页码(如:...110)
                    if(endpage < totalPage && opts.showEllipsis) {
                       pageMenu += '<li><a href="javascript:;" target="_self" tabindex="' +  totalPage + '" source="'+pageHrefPre+totalPage+getRandom()+'">...' + totalPage + '</a></li>';  
                    }
                    
                    pageMenu += '<li><a href="javascript:;" target="_self" title="下一页" tabindex="' + (number+1) + '" source="'+pageHrefPre+(number+1)+getRandom()+'">'+opts.next+'</a></li>';
                    pageMenu += '<li><a href="javascript:;" target="_self" title="最后一页" tabindex="' + totalPage + '" source="'+pageHrefPre+totalPage+getRandom()+'">'+opts.end+'</a></li>';
                } 

            }
         
            pageMenu += '</ul>'; 
          
          } else {
              pageMenu += '<div class="leftlabel">当前为第<strong>' + number + '</strong>页</div>';
              pageMenu += '<ul class="pagination">';
              if(number>1){
                  pageMenu += '<li><a href="javascript:;" target="_self" title="第一页" tabindex="1" source="'+pageHrefPre+1+'">'+opts.home+'</a></li>';
                  pageMenu += '<li><a href="javascript:;" target="_self" tabindex="'+(number-1)+'" source="'+pageHrefPre+(number-1)+'">上一页</a></li>'; 
              }
              if(hasContent && numberOfElements===size) { // 
                  pageMenu += '<li><a href="javascript:;" target="_self" tabindex="'+(number+1)+'" source="'+pageHrefPre+(number+1)+'">下一页</a></li>'; 
              }
              pageMenu += '</ul>';
          }
        
         // 写入到dom
         pjaxPageObj.pageCodeBox.html(pageMenu);

         return opts;
                
        }
	});
})(jQuery);
    	
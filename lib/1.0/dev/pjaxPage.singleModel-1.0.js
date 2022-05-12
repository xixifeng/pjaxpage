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
(function($) {
	var isUp = false;
	$.extend({
		singleModel : function(){
			
			// 分页模型的可选配置选项的默认值
            var defaults = {
                activeName : "active",             // (默认:active) 触发后的页码样式
                prev : "上一页",
                next : "下一页",
            };
                        
            // 这个函数的this对象就是pjaxPage对象, 通过它可以获得分页data和pjaxPage的配置参数(options)
            var pjaxPageOpts = this;
            var data = pjaxPageOpts.data.pageData; // 分页数据
            var opts = $.extend(defaults, pjaxPageOpts.pageModel.opts);
            
            
            var totalPages = data.totalPages;        // 总页数
        	var currentPage = data.number;           // 当前是第几页
        	
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
            
            if(totalPages > 0) {
            	pageCtrl +=  pjaxPageOpts.pageInfo;
            	pageCtrl +=  '<ul class="pagination">';		        		
        		// 可以往下翻 且 不是最后一页
        		if( !isUp && (currentPage != totalPages) ) {
        			pageCtrl += '<li><a href="javascript:;" target="_self" title="下一页" tabindex="' + (currentPage+1) + '" source="'+pageHrefPre+(currentPage+1)+'">'+opts.next+'</a></li>';
        		} else {
        			isUp = true; //往上翻(开启上一页)
        		}
        		
        		// 可以往上翻 且 不是首页
        		if(isUp && currentPage != 1 ){
        			pageCtrl += '<li><a href="javascript:;" target="_self" title="上一页" tabindex="' + (currentPage-1) + '" source="'+pageHrefPre+(currentPage-1)+'">'+opts.prev+'</a></li>'; 
        		} 
        		
        		// 从向上翻的状态过度到往下翻
        		if( currentPage==1 && isUp ){
        			isUp = false; //往下翻(开启下一页), 程序走到这里不能停下来
        			// 下翻
        			pageCtrl += '<li><a href="javascript:;" target="_self" title="下一页" tabindex="' + (currentPage+1) + '" source="'+pageHrefPre+(currentPage+1)+'">'+opts.next+'</a></li>';
        		}
        		
        		pageCtrl += '</ul>'; 
            }
            
            // 写入到dom
            pjaxPageOpts.pageCodeBox.html(pageCtrl);
            
		} 
	});
})(jQuery);
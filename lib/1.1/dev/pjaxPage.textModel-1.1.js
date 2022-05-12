/*!
 * pjaxPage JavaScript Library v1.0
 * https://gitee.com/xixifeng.com/pjaxpage
 *
 * Author: xixifeng (fastquery@126.com)  
 * 
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 *
 * Date: 2017-09-15
 */
(function($) {
	$.extend({
		textModel : function(){
			
			// 分页模型的可选配置选项的默认值
            var defaults = {
            		home : "&lt;&lt;",
                    prev : "&lt;",
                    next : "&gt;",
                    end : "&gt;&gt;"
            };
                        
            // 这个函数的this对象就是pjaxPage对象, 通过它可以获得分页data和pjaxPage的配置参数(options)
            var pjaxPageOpts = this;
            var data = pjaxPageOpts.data[this.pageDataKeyName]; // 分页数据
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
            var pageInfoTpl = opts.pageInfoTpl ? opts.pageInfoTpl :  pjaxPageOpts.pageInfoTpl;
            if(totalPages > 0) {
            	pageCtrl += $.tpl(pageInfoTpl,pjaxPageOpts.buildTplSource.call(pjaxPageOpts,pjaxPageOpts.data,pjaxPageOpts.textStatus,pjaxPageOpts.jqXHR));
            	pageCtrl +=  '<ul class="pagination">';	
            	
            	if (currentPage > 1) {
        			pageCtrl += '<li><a href="javascript:;" target="_self" title="'+opts.home+'" tabindex="1" source="'+pageHrefPre+1+'">'+opts.home+'</a></li>'; 
        			pageCtrl += '<li><a href="javascript:;" target="_self" title="'+opts.prev+'" tabindex="' + (currentPage-1) + '" source="'+pageHrefPre+(currentPage-1)+'">'+opts.prev+'</a></li>'; 
        		}
        		if (currentPage < totalPages) {
        			pageCtrl += '<li><a href="javascript:;" target="_self" title="'+opts.next+'" tabindex="' + (currentPage+1) + '" source="'+pageHrefPre+(currentPage+1)+'">'+opts.next+'</a></li>';
        			pageCtrl += '<li><a href="javascript:;" target="_self" title="'+opts.end+'" tabindex="' + totalPages + '" source="'+pageHrefPre+totalPages+'">'+opts.end+'</a></li>';
        		}
        		
        		pageCtrl += '</ul>'; 
            }
            
            // 写入到dom
            pjaxPageOpts.pageCodeBox.html(pageCtrl);
            
		} 
	});
})(jQuery);
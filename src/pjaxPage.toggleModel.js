/*!
 * pjaxPage JavaScript Library
 * https://gitee.com/xixifeng.com/pjaxpage
 * https://github.com/xixifeng/pjaxpage
 *
 * Author: xixifeng (fastquery@126.com)  
 * 
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 *
 */
(function($) {
	$.extend({
		toggleModel : function(){
			
			// 分页模型的可选配置选项的默认值
            var defaults = {
            		disabledName : "disabled",             // 定义不可点击链接的class样式名称
                    home : "&laquo;",
                    prev : "&lsaquo;",
                    next : "&rsaquo;",
                    end : "&raquo;"
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
        		//如果不是第一页
        		if (currentPage > 1) {
        			pageCtrl += '<li><a href="javascript:;" target="_self" title="第一页" tabindex="1" source="'+pageHrefPre+1+'">'+opts.home+'</a></li>'; 
        			pageCtrl += '<li><a href="javascript:;" target="_self" title="上一页" tabindex="' + (currentPage-1) + '" source="'+pageHrefPre+(currentPage-1)+'">'+opts.prev+'</a></li>'; 
        		} else {
        			pageCtrl += '<li class="'+opts.disabledName+'"><a href="javascript:;" target="_self" title="已到首页">'+opts.home+'</a></li>'; 
        			pageCtrl += '<li class="'+opts.disabledName+'"><a href="javascript:;" target="_self" title="已到首页">'+opts.prev+'</a></li>'; 
        		}
        		
        		pageCtrl += '<li><a><b>'+currentPage+'</b>/'+totalPages+'</a></li>'; 
        		
        		// 不是最后一页
        		if (currentPage < totalPages) {
        			pageCtrl += '<li><a href="javascript:;" target="_self" title="下一页" tabindex="' + (currentPage+1) + '" source="'+pageHrefPre+(currentPage+1)+'">'+opts.next+'</a></li>';
        			pageCtrl += '<li><a href="javascript:;" target="_self" title="最后一页" tabindex="' + totalPages + '" source="'+pageHrefPre+totalPages+'">'+opts.end+'</a></li>';
        		} else { // 最后一页
        			pageCtrl += '<li class="'+opts.disabledName+'"><a href="javascript:;" target="_self" title="已到尾页">'+opts.next+'</a></li>';
        			pageCtrl += '<li class="'+opts.disabledName+'"><a href="javascript:;" target="_self" title="已到尾页">'+opts.end+'</a></li>';
        		}   
        		
        		pageCtrl += '</ul>'; 
            }
            
            // 写入到dom
            pjaxPageOpts.pageCodeBox.html(pageCtrl);
            
		} 
	});
})(jQuery);
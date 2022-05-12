/*!
 * pjaxPage JavaScript Library v1.0
 * http://fastquery.org
 *
 * Author: xixifeng (fastquery@126.com)  
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 *
 * Date: 2017-05-18
 */
var pjaxPage = $.pjaxPage({
	
	        // ajax 配置.支持jQuery.ajax所有的配置选项.ajax的settings,请参照jQuery官方说明
			ajax : {
				url : "http://xixifeng.com/pjaxpage-data.php",
				dataType : "jsonp" // 支持"json","jsonp","xml","html","script","text"...等等
			},
			// 自定义分页数据结构对象的名称为"pageData",其实默认也是这个值,可以省略不配置.
			pageDataKeyName : "pageData",
			size : 10,
			// 配置分页模型
			pageModel: {
				name : "numberModel", // 分页模型的名称
				opts : {
					// 分页模型的opts, 详情请阅读分页模型章节
				    indexNum: 7,
		            home : "Home",
		            prev : "Prev",
		            next : "Next",
		            end : "End",
	                showEllipsis : false
				}
			},
			pageInfoTpl: '<div class="leftlabel">A total of <b>{totalElements}</b> records, a total of <b>{totalPages}</b> pages</div>',
			createDataHtml : function(data,textStatus,jqXHR) { // 在此仅需拼接分页数据 然后return 即可
				var content = data.pageData.content;
				var total = content.length;
				if (total == 0)
					return "";

				var dataHtml = '';
				var orderNum = (this.currentPage - 1) * this.size + 1; // 序号
				for (var i = 0; i < total; i++, orderNum++) {
					
					var cizu = content[i].cizu.replace(/"/g,"");
					var pinyin = content[i].pinyin;
					var options = content[i].options;
					var ok = content[i].ok.replace(/"/g,"");
					var info = content[i].info.replace(/"/g,"");
					
					dataHtml += '<tr>';
					dataHtml += '	<td>' + orderNum + '</td>';
					dataHtml += '	<td>' + cizu + '</td>';
					dataHtml += '	<td>' + pinyin + '</td>';
					dataHtml += '	<td>' + options + '</td>';
					dataHtml += '	<td>' + ok + '</td>';
					dataHtml += '	<td>' + info + '</td>';
					dataHtml += '</tr>';
				}

				return dataHtml;
			}
});




- [Download the compressed, production pjaxPage 1.1](https://gitee.com/xixifeng.com/pjaxpage/raw/master/lib/1.1/min/pjaxPage-1.1.min.tar.gz "pjaxPage")
- [Download the uncompressed, development pjaxPage 1.1](https://gitee.com/xixifeng.com/pjaxpage/raw/master/lib/1.1/dev/pjaxPage-1.1.dev.tar.gz "pjaxPage")

## 1. Quick Start

### 1.1 HTML Code
Here is the minimal HTML code to get pages working: 
```html
<table class="table table-bordered table-hover">
	<!-- 表头 -->
	<tr class="bg"> <th>词组</th> <th>拼音</th> <th>多选项</th> <th>正确答案</th> <th>词义</th> </tr>
	<!-- 分页数据 -->
	<tbody id="dataListBox"> </tbody>
</table>

<!-- 分页索引(分页控制区) -->
<div id="pageCodeBox"></div>
```

### 1.2 JS Reference
```html
<!-- 核 -->
<script src="pjaxPage.js"></script>
<!-- 任选一个分页模型(命名规范: pjaxPage.xXXModel.js) -->
<script src="pjaxPage.numberModel.js"></script>
```

###  1.3 JS Setup

如果采用本插件提供的分页模型,服务端响应的数据的格式必须为`{pageData:{...},...}`, 熟悉[分页数据结构](#5-pstruct).   
**注意**:  `{pageData:{...},...}` 中的`pageData`是**分页数据结构**的对象名称,该名称允许配置,请看pjaxPage配置选项(opts)章节.
```javascript
$.pjaxPage({

	// ajax 配置.支持jQuery.ajax所有的配置选项.ajax的settings,请参照jQuery官方说明
	ajax : {
		url : "https://your.damain.com/pjaxpage-data.json",
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
	createDataHtml : function(data,textStatus,jqXHR) { // 在此仅需拼接分页数据 然后return 即可
		var content = data.pageData.content;
		var total = content.length;
		if (total == 0)
			return "";

		var dataHtml = '';
		var orderNum = (this.currentPage - 1) * this.size + 1; // 序号
		for (var i = 0; i < total; i++, orderNum++) {
			
			var cizu = content[i].cizu;
			var pinyin = content[i].pinyin;
			var options = content[i].options;
			var ok = content[i].ok;
			var info = content[i].info;
			
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
```

## 2. Example
[http://xixifeng.com.oschina.io/pjaxpage/example/](http://xixifeng.com.oschina.io/pjaxpage/example/) 

## 3. 什么是pjaxPage ?
pjax = pushState + ajax, **Page**源自于[FastQuery](https://gitee.com/xixifeng.com/fastquery)项目的`Page`设计.  
`pjaxPage` 它基于**jQuery**,用于实现前端页面翻页,它的优势在于:
- 可以让局部分页请求变成有状态
- 有多种分页模型可供选择
- 模块化设计,开发者可以扩展分页模型 

## 4. 定义
为了方便描述,现在做如下定义(本定义仅仅只针对`pjaxPage`项目):

| 定义名 | 学名 | 解释 |
|:-----:|:-----:|:-----|
|页片|`P.Slice`|待分页的数据可以分成很多**页片**,以便翻页|
|分页概述|`P.Info`|对分页之后的数据进行描述,称之为**分页概述**|
|分页控制区|`P.Ctrl`|用于控制翻页的区域,称之为**分页控制区**|
|分页索引|`P.Index`|对页片进行编号,一般从1开始,这个编号将称之为**分页索引**,分页索引通常可以被单击,用于翻页|
|索引触发状态|`P.Active`|用于明显标记被触发的分页索引的状态,称之为**索引触发状态**|
|分页数据结构|`P.Struct`|从服务端请求某一页数据,有一定格式的,这个格式称之为**分页数据结构**|

定义名,如下图所示:  
![定义名](https://xixifeng.github.io/pjaxpage/example/img/names.png "定义名")  

## 5. `P.Struct`
分页数据结构:  
```javascript
{
	"content":[             // 这页的数据
		{
			"name":"查尔斯·巴贝奇","id":2,"year":1792
		},
		{
			"name":"约翰·冯·诺依曼","id":3,"year":1903
		},
		{                     
			"name":"阿兰·麦席森·图灵","id":1,"year":1912
		},
		{
			"name":"约翰·麦卡锡","id":4,"year":1927
		},
		{
			"name":"丹尼斯·里奇","id":5,"year":1941
		},
		{
			"name":"蒂姆·伯纳斯·李","id":6,"year":1955
		}
	],
    "first": true,           	// 是否是第一页
    "hasContent": true,      	// 这页是否有数据
    "hasNext": true,         	// 是否有下一页
    "hasPrevious": false,    	// 是否有上一页
    "last": false,           	// 是否是最后一页
    "nextPageable": {        	// 下一页的基本属性
        "number": 1,         	// 定位的页码
        "size": 15           	// 每页多少条数据
    },
    "number": 1,             	// 当前页码,从1开始
    "numberOfElements": 6,  	// 当前页的真实记录行数
    "previousPageable": {    	// 上一页的基本属性
        "number": 0,         	// 定位的页码
        "size": 15           	// 每页多少条数据
    },
    "size": 15,              	// 每页行数
    "totalElements": 188,    	// 总行数
    "totalPages": 13         	// 总页数
}
```

[FastQuery](https://gitee.com/xixifeng.com/fastquery)项目中的`Page`实例转换成`JSON`后就是这种结构.本项目自带的分页模型都基于`P.Struct`(分页数据结构). 当然,开发者也可以自定义数据结构.  

## 6. pjaxPage配置选项(opts)
该配置描述中提到的`opts`指的是`pjaxPage`中的`options`.

| 属性 | 类型 | 默认值 | 描述 |
|:-----|:-----|:-----|:-----|
|`ajax`|Object|{}|jQuery的ajax的配置(settings),支持jQuery.ajax所有的配置选项.ajax的settings,请参照jQuery官方说明|
|`size`|int|15|用于指定`P.Slice`(页片)显示多少条记录.换言之,指定每页显示多少条记录|
|`pageKeyName`|String|"page"|表示告诉服务端要请求的是第几页,这个参数的名称(换言之,用哪个参数名称表示要请求的页索引)|
|`sizeKeyName`|String|"size"|表示告诉服务端当前页需要多少记录,这个参数的名称(换言之,用哪个参数名称表示要请求的页有多少条记录)|
|`currentPage`|int|1|用于指定当前页的`P.Index`(分页索引),例如:把currentPage设置为N,那么就显示第N页|
|`dataListBox`|jQuery|`$("#dataListBox")`|用于装载`P.Slice`的盒子|
|`pageCodeBox`|jQuery|`$("#pageCodeBox")`|用于装载`P.Ctrl`的盒子|
|`pageInfoTpl`|String|"&lt;p&gt;共{totalElements}条记录,总页数:{totalPages}&lt;/p&gt;"|`P.Info`(分页概述)模板,它会被`pageCodeBox`包裹.熟悉[内置模板标签](#内置模板标签)|
|`buildTplSource(data,`<br>`textStatus,jqXHR)`|`callback function`|---|**返回类型**:`JSON Object`.作用:构模板数据源.举例:若返回{info:"xxx",goods:3},那么在`pageInfoTpl`中可以通过{info}引用到info值,通过{goods}引用到goods值.参数解释,data:是ajax成功请求所响应的数据;textStatus:用于描述状态的字符串;jqXHR:请参与jQuery文档http://api.jquery.com/jQuery.ajax/#jqXHR.**注意**:这个方法的上下文对象为opts|
|`pageModel`|JSON| {name:"numberModel"}|用于配置分页模型,开发者扩展扩展自己的分页模型.`numberModel`的可选参数,请参阅分页模型章节|
|`pageDataKeyName`|String|"pageData"|用于指定`P.Struct`(分页数据结构)的对象名称|
|`createDataHtml(data,`<br>`textStatus,jqXHR)`|`callback function`|---|**返回类型**:`String`.共:3个参数. 解释,data:是ajax成功请求所响应的数据;textStatus:用于描述状态的字符串;jqXHR:请参与jQuery文档http://api.jquery.com/jQuery.ajax/#jqXHR. 该函数的作用:创建当前`P.Slice`的HTML代码,并返回.**注意**:这个方法的上下文对象为opts|
|`notFoundTip`|String|"Not Found Data!"|翻页时如果没有找到数据,会将此选项设置的值写入到用于装载`P.Slice`的盒子里,支持HTML|
|`pageCodeItem`|HTML<br>element|"a[tabindex]"|`P.Index`的HTML元素选择器|
|`eventName`|String|"click"|`P.Index`的事件名称.默认`click`,表示单击分页索引就翻页,若设置为`dblclick`,表示双击分页索引,才能翻页.当然,也可以基于jQuery自定义一个事件|
|`dataCache`|boolean|true|是否采用jQuery的data函数缓存`P.Slice`(页片)数据,该缓存生命周期很短,只要用户刷新浏览器(F5)或关闭浏览器,缓存的数据立马消失|
|`clear()`|`callback function`|---|**返回类型**:`opts`.清除所有页片缓存|
|`writeListBefore()`|`callback function`|---|**返回类型**:`自定义`.数据列表写入倒dom之前,该方法的上下文对象(this)是opts|
|`writeListAfter(data,`<br>`textStatus,jqXHR)`|`callback function`|---|**返回类型**:`自定义`.数据列表写入倒dom之后,data为服务器响应的数据,该方法的上下文对象(this)为opts|
|`getReqParam()`|`callback function`|---|**返回类型**:`String`,URL参数部分.获取请求参数,注意:它的上下文对象为opts|
|`pjaxId`|String|"xixifeng_pjax"|pjax ID 会显示在浏览器地址栏上|
|`enabledPjax`|boolean|true|是否启用pjax功能,如果浏览器不支持pushState将无法开启pjax功能|
|`pageHrefPre`|String|---|`P.Index`链接地址的前缀|
|`pageIndex(indexNum,`<br>`currentPage,totalpage)`|`callback function`|---|**返回类型**:`JSON Object`.计算开始页和结束页.参数说明:indexNum:(必选项)指定在分页控制区中显示分页索引的个数(不包含"N+...","...N+"或"箭头");currentPage:当前分页索引;totalpage:(必选项)总页面数 返回格式: {"startpage" : startpage,"endpage":endpage}|
|`queryParam(href,name)`|`callback function`|---|**返回类型**:`String`.从一个参数地址中查询出一个参数的值.举例: 从a=1&b=2&c=3查出c的值. 写法:queryParam("a=1&b=2&c=3","c") 得出3.参数说明:href:(必选项)url地址;name:(必选项)参数的名称.返回: 参数值,如果没有找到返回""|

### 内置模板标签

| 标签 | 描述 |
|:-----|:-----|
|`{totalElements}`|数据总记录数|
|`{currentPage}`|当前页索引|
|`{totalPages}`|总页数|


## 7. 自定义请求参数

分页默认请求参数:

| 参数名 | 类型 | 描述 |
|:-----|:-----|:-----|
|`page`|int|告诉服务端要请求的是第几页|
|`size`|int|告诉服务端当前页需要多少记录|

自定义请求参数名称,举例说明:  
若page=3,size=10时, `pajxPage`内部会发出请求`https://your.damain.com?page=3&size=10`,表示获取第3页,期望这页是10条数据组成.`page`和`size`这两个内置请求参数,因为不需要开发者维护,更不需要人为指定.所以,有可能跟设计的业务参数有冲突.因此,这两个内置参数允许开发者自行修改,是有意义的.若在pjaxPage配置选项里把`pageKeyName`设置为"pageIndex",`sizeKeyName`设置为"recordNum".同样的需求,pajxPage内部会发出请求`https://your.damain.com?pageIndex=3&recordNum=10`,从而,避开`page`和`size`这两个参数.   

## 8. 分页模型 
### 8.1 `pjaxPage.numberModel.js`
![pjaxPage.numberModel](https://xixifeng.github.io/pjaxpage/example/img/numberModel.png "pjaxPage.numberModel.js")  
```html
<ul class="pagination">
	<li><a href="#">首页</a></li>
	<li><a href="#">上一页</a></li>
	<li><a href="#">4</a></li>
	<li class="active"><a href="#">5</a></li>
	<li><a href="#">6</a></li>
	<li><a href="#">下一页</a></li>
	<li><a href="#">末页</a></li>
</ul>
```

配置选项(opts):

| 属性 | 类型 | 默认值 | 描述 |
|:-----|:-----|:-----|:-----|
|`activeName`|`String`|`active`|`P.Index`被触发后的class样式选择器的名称|
|`indexNum`|`int`|5|指定在分页控制区中显示分页索引的个数(不包含"N+...","...N+"或"箭头"),建议设置值是一个奇数,可以让当前触发索引位于中间,那样好看些|
|`home`|`String`|`"&lt;&lt;"`<br>"<<" HTML|表示**首页**用什么字符串标识|
|`prev`|`String`|`"&lt;"`<br>"<" HTML|表示**上一页**用什么字符串标识|
|`next`|`String`|`"&gt;"`<br>">" HTML|表示**下一页**用什么字符串标识|
|`end`|`String`|`"&gt;&gt;"`<br>">>" HTML|表示**末页**用什么字符串标识|
|`showEllipsis`|`boolean`|true|是否在分页控制区显示**省略号**(...)|
|`pageInfoTpl`|`String`|同pjaxPage的opts.pageInfoTpl中的默认值|此配置优先|

### 8.2 `pjaxPage.singleModel.js`
![pjaxPage.singleModel](https://xixifeng.github.io/pjaxpage/example/img/singleModel.png "pjaxPage.singleModel.js")  
```html
<ul class="pagination">
	<li><a href="#">下一页</a></li>
</ul>
```

这个分页模型,只有一个按钮,特点:下一页到尽头了,允许回到上一页. 上一页到尽头了允许回到下一页.     
配置选项(opts):

| 属性 | 类型 | 默认值 | 描述 |
|:-----|:-----|:-----|:-----|
|`prev`|`String`|"上一页"|表示**上一页**用什么字符串标识|
|`next`|`String`|"下一页"|表示**下一页**用什么字符串标识|
|`pageInfoTpl`|`String`|同pjaxPage的opts.pageInfoTpl中的默认值|此配置优先|

### 8.3 `pjaxPage.textModel.js`
![pjaxPage.singleModel](https://xixifeng.github.io/pjaxpage/example/img/textModel.png "pjaxPage.textModel.js")  
```html
<ul class="pagination">
	<li><a href="#">首页</a></li>
	<li><a href="#">上一页</a></li>
	<li><a href="#">下一页</a></li>
	<li><a href="#">末页</a></li>
</ul>
```

配置选项(opts):

| 属性 | 类型 | 默认值 | 描述 |
|:-----|:-----|:-----|:-----|
|`home`|`String`|"首页"|表示**首页**用什么字符串标识|
|`prev`|`String`|"上一页"|表示**上一页**用什么字符串标识|
|`next`|`String`|"下一页"|表示**下一页**用什么字符串标识|
|`end`|`String`|"末页"|表示**末页**用什么字符串标识|
|`pageInfoTpl`|`String`|同pjaxPage的opts.pageInfoTpl中的默认值|此配置优先|
|`disabledName`|`String`|"disabled"|定义不可点击链接的class样式选择器的名称|


### 8.4 `pjaxPage.toggleModel.js`
![pjaxPage.singleModel](https://xixifeng.github.io/pjaxpage/example/img/toggleModel.png "pjaxPage.toggleModel.js")  
```html
<ul class="pagination">
	<li><a href="#">&laquo;</a></li>
	<li><a href="#">‹</a></li>
	<li><a><b>17</b>/32</a></li>
	<li><a href="#">›</a></li>
	<li><a href="#">&raquo;</a></li>
</ul>
```

配置选项(opts): 同 `pjaxPage.textModel.js`.


### 8.5 `pjaxPage.simpleModel.js`
![pjaxPage.singleModel](https://xixifeng.github.io/pjaxpage/example/img/simpleModel.png "pjaxPage.simpleModel.js")  
```html
<ul class="pagination">
	<li><a href="#">Prev</a></li>
	<li><a href="#">Next</a></li>
</ul>
```

配置选项(opts):

| 属性 | 类型 | 默认值 | 描述 |
|:-----|:-----|:-----|:-----|
|`prev`|`String`|"上一页"|表示**上一页**用什么字符串标识|
|`next`|`String`|"下一页"|表示**下一页**用什么字符串标识|
|`pageInfoTpl`|`String`|同pjaxPage的opts.pageInfoTpl中的默认值|此配置优先|
|`disabledName`|`String`|"disabled"|定义不可点击链接的class样式选择器的名称|














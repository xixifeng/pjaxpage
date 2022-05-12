var model = {};

model.numberModel =  {
		name : "numberModel",
		opts : {
			pageInfoTpl: '<div class="leftlabel">A total of <b>{totalElements}</b> records, a total of <b>{totalPages}</b> pages</div>',
			indexNum: 7,
            home : "Home",
            prev : "Prev",
            next : "Next",
            end : "End",
            showEllipsis : false
		}
};

model.singleModel =  {
		name : "singleModel",
		opts : {
			pageInfoTpl: '<div class="leftlabel">A total of <b>{totalElements}</b> records, a total of <b>{totalPages}</b> pages,current page:<b>{currentPage}</b></div>',
	        prev : "Prev",
	        next : "Next"
		}
};

model.textModel =  {
		name : "textModel",
		opts : {
			pageInfoTpl: '<div class="leftlabel">A total of <b>{totalElements}</b> records, a total of <b>{totalPages}</b> pages,current page:<b>{currentPage}</b></div>',
            home : "Home",
            prev : "Prev",
            next : "Next",
            end : "End"
		}
};


model.toggleModel =  {
		name : "toggleModel",
		opts : {
			pageInfoTpl: '<div class="leftlabel">A total of <b>{totalElements}</b> records</div>',
            home : "&laquo;",
            prev : "&lsaquo;",
            next : "&rsaquo;",
            end : "&raquo;"
		}
};


model.simpleModel =  {
		name : "simpleModel",
		opts : {
			pageInfoTpl: '<div class="leftlabel">A total of <b>{totalElements}</b> records, a total of <b>{totalPages}</b> pages,current page:<b>{currentPage}</b></div>',
	        prev : "Prev",
	        next : "Next"
		}
};



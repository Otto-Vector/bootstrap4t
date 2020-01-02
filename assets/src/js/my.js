
$(document).ready(function() {

//загрузка контента по умолчанию на английском
Language(source.english,change);

//использование кнопок выбора языка по назначению
$("#ru").click(function(){
	Language(source.russian,change);
	});

$("#en").click(function(){
	Language(source.english,change);
	});

});

///////////////////////////////////////////////////////////////////
//массив путей к файлам
var source = {
		english: {
				links: "../build/json/english/links.json",
				left_content: "../build/json/english/left_content.json",
				content: "../build/json/english/content.json",
				right_content: "../build/json/english/rigth_content.json",
					},
		russian: {
				links: "../build/json/russian/links.json",
				left_content: "../build/json/russian/left_content.json",
				content: "../build/json/russian/content.json",
				right_content: "../build/json/russian/rigth_content.json"
					}
		};
//массив объектов в которых меняется контент
var change = {
		links : "#menu",
		left_content : "#left_content",
		content : "#content_here",
		right_content : "#right_content"
};

////////////////////////////////////////////////////////////////////
function Language(path,id) {

//загрузка ссылок в меню
$.getJSON(path.links, function(links) {
			$(id.links).empty();//очищение перед загрузкой
		$.each(links, function(key,value) {
			$(id.links).append("<li class='nav-item w-100'><a class='nav-link text-white text-truncate' href='"+value.href+"' id='"+value.id+"'>"+value.linkTitle+"</a></li>");
		});
	});

//загрузка данных слева от контента
$.getJSON(path.left_content, function(left_content) {
			$(id.left_content).empty();//очищение перед загрузкой
			var part_1="<a class='row py-3 text-decoration-none text-danger ",
			part_2="<div class='col-3 align-self-center'><div class='circle-50 bg-danger rounded-circle'></div></div><div class='col-9 my-auto h5 text-truncate'>",
			part_3="",
			class_stiky= "bg-white sticky-top",
			class_bg_gray= "bg-secondary",
			class_bg_white= "bg-white",
			i = 0;
		$.each(left_content, function(key,value) {
			i++;
			part_3 =  "' id='"+value.id;
			part_3 += "' href='"+value.href;
			part_3  += "' title='"+value.title+"'>";
			part_3 += part_2+value.text+"</div></a>";
			if (i == 1)
			$(id.left_content).append(part_1+class_stiky+part_3);
			else if (i%2 == 0)
				$(id.left_content).append(part_1+class_bg_gray+part_3);
				else
				$(id.left_content).append(part_1+class_bg_white+part_3);
		});
	});

//загрузка контента
$.getJSON(path.content, function(content) {
		$(id.content).empty();//очищение перед загрузкой
		$.each(content, function(key,value) {
			if (value.id == 2)//проверяется разный id контента
			$(id.content).append(value.text);
		});
	});

//загрузка данных справа от контента
$.getJSON(path.right_content, function(content) {
		$(id.right_content).empty();//очищение перед загрузкой
		$.each(content, function(key,value) {
			$(id.right_content).append("<article class='border-bottom border-light px-3 py-2'>"+value.text+"</article>");
		});
	});

}

//console.log('errors NOT FOUND!!!');
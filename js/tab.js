// JavaScript Document
function Show_TabADSMenu(tabadid_num,tabadnum,obj)
{ 	//alert(obj);
	for(var i=1;i<=7;i++)
	{
		document.getElementById("m"+i).setAttribute('class', '');
		document.getElementById("tabadcontent_"+tabadid_num+i).style.display="none";		
	}
	document.getElementById("m"+tabadnum).setAttribute('class', 'cur');
 	document.getElementById("tabadcontent_"+tabadid_num+tabadnum).style.display="block";
}
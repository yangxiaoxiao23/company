var NS4 = (navigator.appName == "Netscape" && parseInt(navigator.appVersion) < 5);

/**
 * 下拉单菜单操作类
 */
function selectAction() {
};

selectAction.prototype = {
    /**
     * 多选下拉菜单框之间的选项挪移动
     * @param theSelFrom 源菜单对象
     * @param theSelTo 目标菜单对象
     * @param autoSel 设置自动选中的对象
     */
    moveOptions: function (theSelFrom, theSelTo, autoSel) {
        var selLength = theSelFrom.length;
        var selectedText = new Array();
        var selectedValues = new Array();
        var selectedCount = 0;
        var i;
        for (i = selLength - 1; i >= 0; i--) {
            if(theSelFrom.options[i].selected) {
                selectedText[selectedCount] = theSelFrom.options[i].text;
                selectedValues[selectedCount] = theSelFrom.options[i].value;
                this.deleteOption(theSelFrom, i);
                selectedCount++;
            }
        }
        for (i = selectedCount - 1; i >= 0; i--) {
            this.addOption(theSelTo, selectedText[i], selectedValues[i]);
        }
        var _doSel = theSelTo;
        if(autoSel){
            _doSel = autoSel;
        }
        $(_doSel).find('option').attr('selected', true);
        if(NS4) history.go(0);
    },
    /**
     * 删除菜单中的某个选项
     * @param theSel 要删除的菜单对象
     * @param theIndex 要删除的索引值
     */
    deleteOption: function (theSel, theIndex) {
        var selLength = theSel.length;
        if(selLength > 0) {
            theSel.options[theIndex] = null;
        }
    },
    /**
     * 添加菜单项
     * @param theSel 菜单对象
     * @param theText 选项文本
     * @param theValue 选项值
     */
    addOption: function (theSel, theText, theValue) {
        var newOpt = new Option(theText, theValue);
        var selLength = theSel.length;
        theSel.options[selLength] = newOpt;
    }
};

var SA = new selectAction();

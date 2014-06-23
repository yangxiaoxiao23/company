var NS4 = (navigator.appName == "Netscape" && parseInt(navigator.appVersion) < 5);

/**
 * �������˵�������
 */
function selectAction() {
};

selectAction.prototype = {
    /**
     * ��ѡ�����˵���֮���ѡ��Ų�ƶ�
     * @param theSelFrom Դ�˵�����
     * @param theSelTo Ŀ��˵�����
     * @param autoSel �����Զ�ѡ�еĶ���
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
     * ɾ���˵��е�ĳ��ѡ��
     * @param theSel Ҫɾ���Ĳ˵�����
     * @param theIndex Ҫɾ��������ֵ
     */
    deleteOption: function (theSel, theIndex) {
        var selLength = theSel.length;
        if(selLength > 0) {
            theSel.options[theIndex] = null;
        }
    },
    /**
     * ��Ӳ˵���
     * @param theSel �˵�����
     * @param theText ѡ���ı�
     * @param theValue ѡ��ֵ
     */
    addOption: function (theSel, theText, theValue) {
        var newOpt = new Option(theText, theValue);
        var selLength = theSel.length;
        theSel.options[selLength] = newOpt;
    }
};

var SA = new selectAction();

;(function (){
    // 显示方式
    var type = 1;
    //统计对象有多少属性和方法
    var length = function(obj) {
        var number = 0;
        for(var key in obj) {
            number ++;
        }
        return number;
    };
    //添加制表符
    var add_space = function(num) {
        var str = ''
        for (var i = 0; i < num; i++) {
            str += "\t";
        }
        return str;
    };
    // 把对象 格式化成 字符串
    var objToStr = function(obj, num) {
        var str = '';
        num = num ? num : 0;
        switch (obj.constructor) {
            case Object:
            case Array:
                for (key in obj) {
                    var tag = '', len = 0;
                    str += add_space(num + 1) + '[' + key + '] => ';
                    if (obj[key] === null) {
                        str += 'null\n';
                        continue;
                    } else if (obj[key] === undefined) {
                        str += 'undefined\n';
                        continue; 
                    }
                    switch (obj[key].constructor) {
                        case Object:
                            str += 'Object';
                            str += (type != 1 ? '(' + length(obj[key]) + ')' : '') + ' {\n';
                            str += objToStr(obj[key], num + 1);
                            str += add_space(num + 1) + '}\n';
                            break;
                        case Array:
                            str += 'Array';
                            str += (type != 1 ? '(' + obj[key].length + ') {' : ' (') + "\n";
                            str += objToStr(obj[key], num + 1);
                            str += add_space(num + 1) + (type != 1 ? '}' : ')') + '\n';
                            break;
                        case String:
                            str += (type != 1 ? 'String(' + obj[key].toString().length +') "' : '') + obj[key] + (type != 1 ? '"' : '') + "\n";
                            break;
                        case Number:
                            str += (type != 1 ? 'Number(' + obj[key] + ')' : obj[key]) + '\n';
                            break;
                        case Function:
                            str += "\n" + add_space(num + 1) + '---------- Function Code Start -----------\n';
                            str += add_space(num + 2) + obj.constructor.toString().replace(/\n/g,'\n' + add_space(num + 2)) + '\n';
                            str += add_space(num + 1) + '---------- Function Code End -------------\n';
                            break;
                        case Boolean:
                            str += 'Boolean (' + obj[key] + ')\n';
                            break;
                        default:
                            str += add_space(num + 1) + 'Unknown {\n';
                            str += add_space(num + 1) + obj.constructor.toString() + '\n';
                            str += add_space(num + 1) + '}\n';
                            break;
                    }
                }
                break;
            case String:
                str += add_space(num) + (type != 1 ? 'String(' + obj.toString().length + ') "' + obj + '"' : obj) + "\n";
                break;
            case Function:
                str += "\n" + add_space(num) + '---------- Function Code Start -----------\n';
                str += add_space(num + 1) + obj.toString().replace(/\n/g,'\n' + add_space(num + 1)) + '\n';
                str += add_space(num ) + '---------- Function Code End -------------\n';
                break;
            case Number:
                str += (type != 1 ? 'Number(' + obj[key] + ')' : obj[key]) + '\n';
                break;
            case Boolean:
                str += 'Boolean (' + obj[key] + ')\n';
                break;
            default:
                str += add_space(num) + 'Unknown {\n';
                str += add_space(num) + obj.toString() + '\n';
                str += add_space(num) + '}\n';
                break;
        };
        return str;
    };
    
    // 创建一个DIV并插入到页面最后，打印出格式化后的对象字符串
    var write = function(str) {
        var c = document.createElement('div');
        var div = document.getElementsByTagName("body")[0].appendChild(c);
        div.innerHTML = '<pre>' + str + '</pre>';
        div.style.border = '1px solid #ccc';
        div.style.padding = '5px';
    };
    
    var check = function(obj) {
        var rtn = '';
        switch (obj) {
            case undefined:
                rtn = 'undefined';
                break;
            case null:
                rtn = 'null';
                break;
            default:
                switch (obj.constructor) {
                    case Array:
                        rtn += 'Array' + (type != 1 ? '(' + obj.length +')' : '') + ' (\n' + objToStr(obj) + ')\n';
                        break;
                    case Object:
                        rtn += 'Object' + (type != 1 ? '(' + length(obj) +')' : '') + ' {\n' + objToStr(obj) + '}\n';
                        break;
                    case Function:
                        rtn += '' + objToStr(obj) + '\n';
                        break;
                    case String:
                        rtn += 'String => ' + obj + '\n';
                        break;
                    case Number:
                        rtn += 'Number => ' + obj.toString() + '\n';
                        break;
                    case Boolean:
                        rtn += 'Boolean (' + obj + ')\n';
                        break;
                    default:
                        rtn += 'Unknown {\n\t' + obj.constructor.toString().replace(/\n/g,'\n\t') + '\n}\n';
                }
        };
        return rtn;
    };
    var lwkai = window.lwkai = {};
    
    /**
     * 打印一个对象的信息
     * @param Object obj 需要打印的对象
     * @param boolean is_rtn 打印结果是否需要返回，默认为不返回[false]直接输出到页面底部
     */
    lwkai.print_r = function(obj, is_rtn) {
        is_rtn = !!is_rtn;
        type = 1;
        var rtn = check(obj);
        if (is_rtn) {
            return rtn;
        } else {
            write(rtn);
        }
    };

    /**
     *打印一个对象的信息，并且显示对象的类型 
     * @param Object obj 需要打印的对象
     * @param boolean is_rtn 是否需要返回结果，默认为不返回[false]直接输出到页面底部
     */
    lwkai.dump = function(obj,is_rtn) {
        is_rtn = !!is_rtn;
        type = 2;
        var rtn = check(obj);
        if (is_rtn) {
            return rtn;
        } else {
            write(rtn);
        }
    };
})();
if (typeof window.console == 'undefined') {
    window.console = {
        memory : {
            jsHeapSizeLimit:0,
            usedJSHeapSize:0,
            totalJSHeapSize:0
        },
        debug:function(str){
            for(var i = 0,len=arguments.length; i<len;i++){
                lwkai.print_r(arguments[i]);
            }
        },
        error:function(str){
            for(var i = 0,len=arguments.length; i<len;i++){
                lwkai.print_r(arguments[i]);
            }
        },
        info:function(){
            for(var i = 0,len=arguments.length; i<len;i++){
                lwkai.print_r(arguments[i]);
            }
        },
        log : function(str){
            for(var i = 0,len=arguments.length; i<len;i++){
                lwkai.print_r(arguments[i]);
            }
        }
    };
}

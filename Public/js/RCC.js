/*通用方法*/
var c = {
    /**************************基础方法 begin**************************/

    //获取url参数(name:key值; noDecode:是否把value值decode)
    urlParam: function (name, noDecode) {
        var re = new RegExp("[&,?]" + name + "=([^\\&]*)", "i"); var r = re.exec(document.location.search);
        if (r != null) {
            if (noDecode == true)
                return r[1];
            else
                return decodeURIComponent(r[1]);
        }
        return null;
    },

    //判断对象是否是数组
    isArray: function (obj) { return Object.prototype.toString.call(obj) === '[object Array]'; },

    //cookie操作，options值可选{minutes:1440, path:'/', domain:''}
    cookie: function (name, value, options, noEncode) {
        //write
        if (value != null) {
            if (options == null)
                options = {};

            var expire = "";
            if (options.minutes != null) {
                expire = new Date((new Date()).getTime() + options.minutes * 60000);
                expire = ";expires=" + expire.toGMTString();
            }
            document.cookie = name + "=" + (noEncode == true ? value : encodeURIComponent(value)) + expire + (options.path ? ";path=" + options.path : "") + (options.domain ? ";domain=" + options.domain : "");
            return;
        }

        //read
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null)
            return decodeURIComponent(arr[2]);
        return null;
    },
    //remove cookie，options值可选{minutes:1440, path:'/', domain:''}
    removeCookie: function (key, options) {
        if (c.cookie(key) != null) {
            if (options == null)
                options = { minutes: -1 };
            c.cookie(key, '', options);
        }
    },

    //html转码解码
    htmlEncode: function (text) { return text.replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
    htmlDecode: function (text) { return text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>'); },
    //动态加载js/css文件（参数：文件类型，文件路径，容器id，是否只加载一次）
    loadJsCssFile: function (file_type, file_path, id, loading_one) {
        if (loading_one == true) {
            if (id != null) {
                if (document.getElementById(id) != null) {
                    return;
                }
            }
        }
        if (file_type == "js") {
            var fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", file_path);
        } else if (file_type == "css") {
            var fileref = document.createElement('link');
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", file_path);
        }
        if (id != null) {
            fileref.setAttribute("id", id);
        }
        if (typeof fileref != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
    },

    //把json对象转换为字符串
    serializeJsonToStr: function (oJson) {
        if (typeof (oJson) == typeof (false)) {
            return oJson;
        }
        if (oJson == null) {
            return "null";
        }
        if (typeof (oJson) == typeof (0))
            return oJson.toString();
        if (typeof (oJson) == typeof ('') || oJson instanceof String) {
            oJson = oJson.toString();
            oJson = oJson.replace(/\r\n/, '\\r\\n');
            oJson = oJson.replace(/\n/, '\\n');
            oJson = oJson.replace(/\"/, '\\"');
            return '"' + oJson + '"';
        }
        if (oJson instanceof Array) {
            var strRet = "[";
            for (var i = 0; i < oJson.length; i++) {
                if (strRet.length > 1)
                    strRet += ",";
                strRet += c.serializeJsonToStr(oJson[i]);
            }
            strRet += "]";
            return strRet;
        }
        if (typeof (oJson) == typeof ({})) {
            var strRet = "{";
            for (var p in oJson) {
                if (strRet.length > 1)
                    strRet += ",";
                strRet += '"' + p.toString() + '":' + c.serializeJsonToStr(oJson[p]);
            }
            strRet += "}";
            return strRet;
        }
    },

    //返回一个被补位填充的新字符串
    padLeft: function (str, totalWidth, paddingChar) {
        str += "";
        if (!totalWidth)
            totalWidth = 2;
        if (!paddingChar)
            paddingChar = "0";
        if (str.length < totalWidth) {
            for (var i = str.length; i < totalWidth; i++) {
                str = paddingChar + str;
            }
        }
        return str;
    },

    //把日月年转换为date类型
    parseDate: function (date) {
        var date_arr = date.split(/-|\//);
        var date_new = new Date(date_arr[1] + "/" + date_arr[0] + "/" + date_arr[2]);
        return date_new;
    },
    //返回日期格式(dd/mm/yyyy)
    getDateStr: function (date) {
        return c.padLeft(date.getDate()) + "/" + c.padLeft(date.getMonth() + 1) + "/" + c.padLeft(date.getFullYear());
    },

    //把可读时间转换成时间戳(datetime:可读时间)
    time2unix: function (datetime) {
        //查看时间里面是否带有时区，有就去除，如：2016-03-18T18:00:00.000-07:00
        if (datetime.indexOf("T") != -1) {
            var datetime_arr = datetime.split("T");
            if (datetime_arr[1].indexOf("-") != -1) {
                datetime_arr[1] = datetime_arr[1].substr(0, datetime_arr[1].indexOf("-"));
            } else if (datetime_arr[1].indexOf("+") != -1) {
                datetime_arr[1] = datetime_arr[1].substr(0, datetime_arr[1].indexOf("+"));
            }
            datetime = datetime_arr[0] + " " + datetime_arr[1];
            if (datetime.indexOf(".") != -1)
                datetime = datetime.substr(0, datetime.indexOf("."))
        }

        var ndate = new Date(datetime.replace(/-/g, "/"));
        return ndate.getTime() / 1000;
    },

    //时间戳转换成可读时间(参数：时间戳；返回类型，默认返回MM/yyyy/dd hh:mm:ss，值为1时返回小时和分钟相加的分钟,值为2时返回hh:mm，值为4时返回多语言年月日，值为5时返回多语言年月日时分)
    unix2time: function (un, rtype) {
        var dateObj = new Date(un * 1000);
        var time;
        if (rtype == 1) {
            time = dateObj.getHours() * 60 + dateObj.getMinutes();
        } else if (rtype == 2) {
            time = c.padLeft(dateObj.getHours()) + ':' + c.padLeft(dateObj.getMinutes());
        } else if (rtype == 3) {

        } else if (rtype == 4 || rtype == 5) {
            if (langCode == "zh-cn" || langCode == "zh-hk") {
                time = dateObj.getFullYear() + '年' + (dateObj.getMonth() + 1) + '月' + dateObj.getDate() + "日";
            } else {
                var m = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
                time = dateObj.getDate() + ' ' + m[dateObj.getMonth()] + ' ' + dateObj.getFullYear();
            }
            if (rtype == 5) {
                time += ' ' + c.padLeft(dateObj.getHours()) + ':' + c.padLeft(dateObj.getMinutes());
            }
        } else {
            time = dateObj.getFullYear() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getDate() + ' ' + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
        }
        return time;
    },

    //判断是否手机端
    isMobile: function () {
        var sUserAgent = navigator.userAgent.toLowerCase(),
        bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
        bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
        bIsMidp = sUserAgent.match(/midp/i) == "midp",
        bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
        bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
        bIsAndroid = sUserAgent.match(/android/i) == "android",
        bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
        bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile",
        bIsWebview = sUserAgent.match(/webview/i) == "webview";
        if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM))
            return true;
        var criticalWidth = 992;//临界宽度(大屏和小屏的分割点)
        var getWidth = function () {
            if (window.innerWidth)
                return window.innerWidth;
            else if ((document.body) && (document.body.clientWidth))
                return document.body.clientWidth;
        };
        return (getWidth() < criticalWidth);

    },

    //把数字格式化为带逗号的
    formatNum: function (num) {
        var newNum = "";
        var count = 0;
        num = num + "";
        if (num.indexOf(".") == -1) {
            for (var i = num.length - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newNum = num.charAt(i) + "," + newNum;
                } else {
                    newNum = num.charAt(i) + newNum;
                }
                count++;
            }
        } else {
            for (var i = num.indexOf(".") - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newNum = num.charAt(i) + "," + newNum;
                } else {
                    newNum = num.charAt(i) + newNum; //逐个字符相接起来
                }
                count++;
            }
            newNum = newNum + (num + "00").substr((num + "00").indexOf("."), 3);
        }
        return newNum;
    },
    init: function () {
        c.initCurrency();
        c.chooseCountryCurrency();
        c.initSearchLog();
        c.showNavFocus();
        c.helpClick()
        //c.loginDiscount();
        c.mobileInit();
        c.showWebServiceIP();
        c.footerLogoInit();
        c.socialcount();
    }
};
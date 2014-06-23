/**
 * Created with JetBrains WebStorm.
 * User: YHB
 * Date: 14-3-28
 * Time: 上午11:28
 * To change this template use File | Settings | File Templates.
 */

$(function(){
    Usitrip.Dialog = function(){
        Usitrip.Dialog.superclass.constructor.apply(this, arguments);
    }

    Usitrip.extend(Usitrip.Dialog, art);

    /**
     * 重写该方法,主要解决在锁屏的时候,双击屏幕会导致锁屏取消
     * 在此将绑定的dblclick事件内执行的方法取消
     */
    Usitrip.Dialog.artDialog.prototype.lock = function() {
        var self = this;
        var fun = function(){
            if (this._lock) return this;
            var f = $(document),
                v = Usitrip.Dialog.artDialog,
                e = $,
                h = _isIE6 = window.VBArray && !window.XMLHttpRequest,
                p = _isMobile = 'createTouch' in document && !('onmousemove' in _elem)
                    || /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
            var t = this,
                n = v.defaults.zIndex - 1,
                r = t.DOM.wrap,
                i = t.config,
                s = f.width(),
                o = f.height(),
                u = t._lockMaskWrap || e(document.body.appendChild(document.createElement("div"))),
                a = t._lockMask || e(u[0].appendChild(document.createElement("div"))),
                l = "(document).documentElement",
                c = p ? "width:" + s + "px;height:" + o + "px": "width:100%;height:100%",
                d = h ? "position:absolute;left:expression(" + l + ".scrollLeft);top:expression(" + l + ".scrollTop);width:expression(" + l + ".clientWidth);height:expression(" + l + ".clientHeight)": "";
            return t.zIndex(),
                r.addClass("aui_state_lock"),
                u[0].style.cssText = c + ";position:fixed;z-index:" + n + ";top:0;left:0;overflow:hidden;" + d,
                a[0].style.cssText = "height:100%;background:" + i.background + ";filter:alpha(opacity=0);opacity:0",
                h && a.html('<iframe src="about:blank" style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:-1;filter:alpha(opacity=0)"></iframe>'),
                a.stop(),
                a.bind("click",
                    function() {
                        t._reset()
                    }).bind("dblclick",
                    function() {
                        //t._click(t.config.cancelVal)
                    }),
                i.duration === 0 ? a.css({
                    opacity: i.opacity
                }) : a.animate({
                        opacity: i.opacity
                    },
                    i.duration),
                t._lockMaskWrap = u,
                t._lockMask = a,
                t._lock = !0,
                t;
        }
        fun.apply(self);
    }

    Usitrip.Dialog.artDialog.prototype._init = function(e) {
        var self = Usitrip.Dialog.artDialog.prototype;
        var fun =  function(){
            var n = this,
                i, s = e.icon,
                h = _isIE6 = window.VBArray && !window.XMLHttpRequest,
                o = s && (h ? {
                    png: "icons/" + s + ".png"
                }: {
                    backgroundImage: "url('" + e.path + "/skins/icons/" + s + ".png')"
                });

            return n.closed = !1,
                n.config = e,
                n.DOM = i = n.DOM || n._getDOM(),
                i.wrap.addClass(e.skin),
                i.close[e.cancel === !1 ? "hide": "show"](),
                i.icon[0].style.display = s ? "": "none",
                i.iconBg.css(o || {
                    background: "none"
                }),
                i.se.css("cursor", e.resize ? "se-resize": "auto"),
                i.title.css("cursor", e.drag ? "move": "auto"),
                i.content.css("padding", e.padding),
                n[e.show ? "show": "hide"](!0),
                n.button(e.button).title(e.title).content(e.content, !0).size(e.width, e.height).time(e.time),
                e.follow ? n.follow(e.follow) : n.position(e.left, e.top),
                n.zIndex().focus(),
                e.lock && n.lock(),
                n._addEvent(),
                n._ie6PngFix(),
                r = null,
                e.init && e.init.call(n, t),
                n;
        }

        fun.apply(self);
    }
});


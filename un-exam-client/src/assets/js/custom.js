(() => {
	function e(o) {
		return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
			return typeof e
		} : function(e) {
			return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
		})(o)
	}! function(o) {
		"use strict";
		o(window).on("load", (function(e) {
			o("#global-loader").fadeOut("slow")
		})), o(".cover-image").each((function() {
			var t = o(this).attr("data-image-src");
			"undefined" !== e(t) && !1 !== t && o(this).css("background", "url(" + t + ") center center")
		})), o(".table-subheader").click((function() {
			o(this).nextUntil("tr.table-subheader").slideToggle(100)
		})), o(document).ready((function() {
			o("a[data-theme]").click((function() {
				o("head link#theme").attr("href", o(this).data("theme")), o(this).toggleClass("active").siblings().removeClass("active")
			})), o("a[data-effect]").click((function() {
				o("head link#effect").attr("href", o(this).data("effect")), o(this).toggleClass("active").siblings().removeClass("active")
			}))
		})), o("#fullscreen-button").on("click", (function() {
			void 0 !== document.fullScreenElement && null === document.fullScreenElement || void 0 !== document.msFullscreenElement && null === document.msFullscreenElement || void 0 !== document.mozFullScreen && !document.mozFullScreen || void 0 !== document.webkitIsFullScreen && !document.webkitIsFullScreen ? document.documentElement.requestFullScreen ? document.documentElement.requestFullScreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullScreen ? document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : document.documentElement.msRequestFullscreen && document.documentElement.msRequestFullscreen() : document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen()
		})), o(document).ready((function() {
			o(".horizontalMenu-list li a").each((function() {
				var e = window.location.href.split(/[?#]/)[0];
				this.href == e && (o(this).addClass("active"), o(this).parent().addClass("active"), o(this).parent().parent().prev().addClass("active"), o(this).parent().parent().prev().click())
			})), o(".horizontal-megamenu li a").each((function() {
				var e = window.location.href.split(/[?#]/)[0];
				this.href == e && (o(this).addClass("active"), o(this).parent().addClass("active"), o(this).parent().parent().parent().parent().parent().parent().parent().prev().addClass("active"), o(this).parent().parent().prev().click())
			})), o(".horizontalMenu-list .sub-menu .sub-menu li a").each((function() {
				var e = window.location.href.split(/[?#]/)[0];
				this.href == e && (o(this).addClass("active"), o(this).parent().addClass("active"), o(this).parent().parent().parent().parent().prev().addClass("active"), o(this).parent().parent().prev().click())
			}))
		})), o((function() {
			o(".add").on("click", (function() {
				var e = o(this).closest("div").find(".qty"),
					t = parseInt(e.val());
				isNaN(t) || e.val(t + 1)
			})), o(".minus").on("click", (function() {
				var e = o(this).closest("div").find(".qty"),
					t = parseInt(e.val());
				!isNaN(t) && t > 0 && e.val(t - 1)
			}))
		})), o(".modal-effect").on("click", (function(e) {
			e.preventDefault();
			var t = o(this).attr("data-bs-effect");
			o("#modaldemo8").addClass(t)
		})), o("#modaldemo8").on("hidden.bs.modal", (function(e) {
			o(this).removeClass((function(e, o) {
				return (o.match(/(^|\s)effect-\S+/g) || []).join(" ")
			}))
		})), o(window).on("scroll", (function(e) {
			o(this).scrollTop() > 0 ? o("#back-to-top").fadeIn("slow") : o("#back-to-top").fadeOut("slow")
		})), o("#back-to-top").on("click", (function(e) {
			return o("html, body").animate({
				scrollTop: 0
			}, 0), !1
		}));
		o(document).on("click", "[data-bs-toggle='search']", (function(e) {
			var t = o("body");
			t.hasClass("search-gone") ? (t.addClass("search-gone"), t.removeClass("search-show")) : (t.removeClass("search-gone"), t.addClass("search-show"))
		}));
		var t = function() {
			o(window).outerWidth() <= 1024 ? (o("body").addClass("sidebar-gone"), o(document).off("click", "body").on("click", "body", (function(e) {
				(o(e.target).hasClass("sidebar-show") || o(e.target).hasClass("search-show")) && (o("body").removeClass("sidebar-show"), o("body").addClass("sidebar-gone"), o("body").removeClass("search-show"))
			}))) : o("body").removeClass("sidebar-gone")
		};
		t(), o(window).resize(t), o(document).on("click", ".close-btn", (function() {
			o("body").removeClass("search-show")
		}));
		var a = "div.card";
		o(document).on("click", '[data-toggle="remove"]', (function(e) {
			return o(this).closest(".attach-supportfiles").remove(), e.preventDefault(), !1
		}));
		[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((function(e) {
			return new bootstrap.Tooltip(e)
		})), [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map((function(e) {
			return new bootstrap.Popover(e)
		}));
		o(document).on("click", '[data-bs-toggle="card-close"]', (function(e) {
			return o(this).closest(a).remove(), e.preventDefault(), !1
		})), o(document).on("click", '[data-bs-toggle="card-remove"]', (function(e) {
			return o(this).closest(a).remove(), e.preventDefault(), !1
		})), o(document).on("click", '[data-bs-toggle="card-collapse"]', (function(e) {
			return o(this).closest(a).toggleClass("card-collapsed"), e.preventDefault(), !1
		})), o(document).on("click", '[data-bs-toggle="card-fullscreen"]', (function(e) {
			return o(this).closest(a).toggleClass("card-fullscreen").removeClass("card-collapsed"), e.preventDefault(), !1
		})),  o(".layout-setting").on("click", (function(e) {
			document ? o("body").toggleClass("dark-mode") : (o("body").removeClass("dark-mode"), o("body").addClass("light-mode"))
		})), o(".default-menu").on("click", (function() {
			document.body.clientWidth >= 992 && o("body").removeClass("sidenav-toggled")
		})), o(document).on("click", "#myonoffswitch1", (function() {
			this.checked ? (o("body").addClass("light-mode"), o("body").removeClass("dark-mode"), localStorage.setItem("light-mode", "True")) : (o("body").removeClass("light-mode"), localStorage.setItem("light-mode", "false"))
		})), o(document).on("click", "#myonoffswitch2", (function() {
			this.checked ? (o("body").addClass("dark-mode"), o("body").removeClass("light-mode"), localStorage.setItem("dark-mode", "True")) : (o("body").removeClass("dark-mode"), localStorage.setItem("dark-mode", "false"))
		})), o(document).on("click", "#myonoffswitch3", (function() {
			this.checked ? (o("body").addClass("light-menu"), o("body").removeClass("color-menu"), o("body").removeClass("dark-menu"), o("body").removeClass("gradient-menu"), localStorage.setItem("light-menu", "True")) : (o("body").removeClass("light-menu"), localStorage.setItem("light-menu", "false"))
		})), o(document).on("click", "#myonoffswitch4", (function() {
			this.checked ? (o("body").addClass("color-menu"), o("body").removeClass("light-menu"), o("body").removeClass("dark-menu"), o("body").removeClass("gradient-menu"), localStorage.setItem("color-menu", "True")) : (o("body").removeClass("color-menu"), localStorage.setItem("color-menu", "false"))
		})), o(document).on("click", "#myonoffswitch5", (function() {
			this.checked ? (o("body").addClass("dark-menu"), o("body").removeClass("color-menu"), o("body").removeClass("light-menu"), o("body").removeClass("gradient-menu"), localStorage.setItem("dark-menu", "True")) : (o("body").removeClass("dark-menu"), localStorage.setItem("dark-menu", "false"))
		})), o(document).on("click", "#myonoffswitch25", (function() {
			this.checked ? (o("body").addClass("gradient-menu"), o("body").removeClass("color-menu"), o("body").removeClass("light-menu"), o("body").removeClass("dark-menu"), localStorage.setItem("gradient-menu", "True")) : (o("body").removeClass("gradient-menu"), localStorage.setItem("gradient-menu", "false"))
		})), o(document).on("click", "#myonoffswitch6", (function() {
			this.checked ? (o("body").addClass("light-header"), o("body").removeClass("color-header"), o("body").removeClass("dark-header"), o("body").removeClass("gradient-header"), localStorage.setItem("light-header", "True")) : (o("body").removeClass("light-header"), localStorage.setItem("light-header", "false"))
		})), o(document).on("click", "#myonoffswitch7", (function() {
			this.checked ? (o("body").addClass("color-header"), o("body").removeClass("light-header"), o("body").removeClass("dark-header"), o("body").removeClass("gradient-header"), localStorage.setItem("color-header", "True")) : (o("body").removeClass("color-header"), localStorage.setItem("color-header", "false"))
		})), o(document).on("click", "#myonoffswitch8", (function() {
			this.checked ? (o("body").addClass("dark-header"), o("body").removeClass("color-header"), o("body").removeClass("light-header"), o("body").removeClass("gradient-header"), localStorage.setItem("dark-header", "True")) : (o("body").removeClass("dark-header"), localStorage.setItem("dark-header", "false"))
		})), o(document).on("click", "#myonoffswitch26", (function() {
			this.checked ? (o("body").addClass("gradient-header"), o("body").removeClass("dark-header"), o("body").removeClass("color-header"), o("body").removeClass("light-header"), localStorage.setItem("gradient-header", "True")) : (o("body").removeClass("gradient-header"), localStorage.setItem("gradient-header", "false"))
		})), o("#myonoffswitch9").click((function() {
			this.checked ? (o("body").addClass("layout-fullwidth"), o("body").removeClass("layout-boxed"), localStorage.setItem("layout-fullwidth", "True")) : (o("body").removeClass("layout-fullwidth"), localStorage.setItem("layout-fullwidth", "false"))
		})), o("#myonoffswitch10").click((function() {
			this.checked ? (o("body").addClass("layout-boxed"), o("body").removeClass("layout-fullwidth"), localStorage.setItem("layout-boxed", "True")) : (o("body").removeClass("layout-boxed"), localStorage.setItem("layout-boxed", "false"))
		})), o("#myonoffswitch11").click((function() {
			this.checked ? (o("body").addClass("fixed-layout"), o("body").removeClass("scrollable-layout"), localStorage.setItem("fixed-layout", "True")) : (o("body").removeClass("fixed-layout"), localStorage.setItem("fixed-layout", "false"))
		})), o("#myonoffswitch12").click((function() {
			this.checked ? (o("body").addClass("scrollable-layout"), o("body").removeClass("fixed-layout"), localStorage.setItem("scrollable-layout", "True")) : (o("body").removeClass("scrollable-layout"), localStorage.setItem("scrollable-layout", "false"))
		})), o(document).on("click", "#myonoffswitch13", (function() {
			this.checked ? (o("body").addClass("default-menu"), hovermenu(), o("body").removeClass("closed-menu"), o("body").removeClass("icontext-menu"), o("body").removeClass("sideicon-menu"), o("body").removeClass("sidenav-toggled")) : o("body").removeClass("default-menu")
		})), o(document).on("click", "#myonoffswitch30", (function() {
			this.checked ? (o("body").addClass("closed-menu"), hovermenu(), o("body").addClass("sidenav-toggled"), o("body").removeClass("default-menu"), o("body").removeClass("icontext-menu"), o("body").removeClass("sideicon-menu")) : (o("body").removeClass("default-menu"), o("body").removeClass("sidenav-toggled"))
		})), o("#myonoffswitch14").click((function() {
			this.checked ? (o("body").addClass("icontext-menu"), icontext(), o("body").addClass("sidenav-toggled"), o("body").removeClass("default-menu"), o("body").removeClass("sideicon-menu"), o("body").removeClass("closed-menu")) : (o("body").removeClass("icontext-menu"), o("body").removeClass("sidenav-toggled"))
		})), o("#myonoffswitch15").click((function() {
			this.checked ? (o("body").addClass("sideicon-menu"), hovermenu(), o("body").addClass("sidenav-toggled"), o("body").removeClass("default-menu"), o("body").removeClass("icontext-menu"), o("body").removeClass("closed-menu")) : (o("body").removeClass("sideicon-menu"), o("body").removeClass("sidenav-toggled"))
		})), o("#background7").click((function() {
			this.checked ? (o("body").addClass("light-hormenu"), o("body").removeClass("color-hormenu"), o("body").removeClass("dark-hormenu"), o("body").removeClass("gradient-hormenu"), localStorage.setItem("light-hormenu", "True")) : (o("body").removeClass("light-hormenu"), localStorage.setItem("light-hormenu", "False"))
		})), o("#background8").click((function() {
			this.checked ? (o("body").addClass("color-hormenu"), o("body").removeClass("light-hormenu"), o("body").removeClass("dark-hormenu"), o("body").removeClass("gradient-hormenu"), localStorage.setItem("color-hormenu", "True")) : (o("body").removeClass("color-hormenu"), localStorage.setItem("color-hormenu", "False"))
		})), o("#background9").click((function() {
			this.checked ? (o("body").addClass("dark-hormenu"), o("body").removeClass("color-hormenu"), o("body").removeClass("light-hormenu"), o("body").removeClass("gradient-hormenu"), localStorage.setItem("dark-hormenu", "True")) : (o("body").removeClass("dark-hormenu"), localStorage.setItem("dark-hormenu", "False"))
		})), o("#background13").click((function() {
			this.checked ? (o("body").addClass("gradient-hormenu"), o("body").removeClass("dark-hormenu"), o("body").removeClass("color-hormenu"), o("body").removeClass("light-hormenu"), localStorage.setItem("gradient-hormenu", "True")) : (o("body").removeClass("gradient-hormenu"), localStorage.setItem("gradient-hormenu", "False"))
		})), o("#myonoffswitch55").click((function() {
			if (this.checked) {
				var e;
				o("body").addClass("rtl"), o("body").removeClass("ltr"), o("html[lang=en]").attr("dir", "rtl"), localStorage.setItem("rtl", "True"), o("head link#style").attr("href", o(this)), null === (e = document.getElementById("style")) || void 0 === e || e.setAttribute("href", "https://laravel.spruko.com/azea/azea/assets/plugins/bootstrap/css/bootstrap.rtl.min.css");
				var t = o(".owl-carousel");
				o.each(t, (function(e, t) {
					var a = o(t).data("owl.carousel");
					a.settings.rtl = !0, a.options.rtl = !0, o(t).trigger("refresh.owl.carousel")
				}))
			} else {
				var a;
				o("body").removeClass("rtl"), o("body").addClass("ltr"), localStorage.setItem("rtl", "false"), o("head link#style").attr("href", o(this)), null === (a = document.getElementById("style")) || void 0 === a || a.setAttribute("href", "https://laravel.spruko.com/azea/azea/assets/plugins/bootstrap/css/bootstrap.min.css")
			}
		})), o("#myonoffswitch54").click((function() {
			if (this.checked) {
				var e;
				o("body").addClass("ltr"), o("body").removeClass("rtl"), o("html[lang=en]").attr("dir", "ltr"), localStorage.setItem("ltr", "True"), o("head link#style").attr("href", o(this)), null === (e = document.getElementById("style")) || void 0 === e || e.setAttribute("href", "https://laravel.spruko.com/azea/azea/assets/plugins/bootstrap/css/bootstrap.min.css");
				var t = o(".owl-carousel");
				o.each(t, (function(e, t) {
					var a = o(t).data("owl.carousel");
					a.settings.rtl = !1, a.options.rtl = !1, o(t).trigger("refresh.owl.carousel")
				}))
			} else {
				var a;
				o("body").removeClass("ltr"), o("body").addClass("rtl"), localStorage.setItem("ltr", "false"), o("head link#style").attr("href", o(this)), null === (a = document.getElementById("style")) || void 0 === a || a.setAttribute("href", "https://laravel.spruko.com/azea/azea/assets/plugins/bootstrap/css/bootstrap.rtl.min.css")
			}
		}))
	}(jQuery)
})();
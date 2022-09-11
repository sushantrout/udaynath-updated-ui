jQuery((function(o) {
    "use strict";
    [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map((function(o) {
        return new bootstrap.Popover(o)
    })), new bootstrap.Popover(document.querySelector('[data-bs-popover-color="default"]'), {
        template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    }), new bootstrap.Popover(document.querySelector('[data-bs-popover-color="default1"]'), {
        template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    }), new bootstrap.Popover(document.querySelector('[data-bs-popover-color="default2"]'), {
        template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    }), new bootstrap.Popover(document.querySelector('[data-bs-popover-color="default3"]'), {
        template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    }), new bootstrap.Popover(document.querySelector('[data-bs-popover-color="head-primary"]'), {
        template: '<div class="popover popover-head-primary" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    }), new bootstrap.Popover(document.querySelector('[data-bs-popover-color="head-secondary"]'), {
        template: '<div class="popover popover-head-secondary" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    }), new bootstrap.Popover(document.querySelector('[data-bs-popover-color="primary"]'), {
        template: '<div class="popover popover-primary" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    }), new bootstrap.Popover(document.querySelector('[data-bs-popover-color="secondary"]'), {
        template: '<div class="popover popover-secondary" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    }), $(document).on("click", (function(o) {
        $('[data-bs-toggle="popover"],[data-original-title]').each((function() {
            $(this).is(o.target) || 0 !== $(this).has(o.target).length || 0 !== $(".popover").has(o.target).length || ((($(this).popover("hide").data("bs.popover") || {}).inState || {}).click = !1)
        }))
    }))
})), $("#myonoffswitch54").click((function() {
    var o = document.getElementById("popover-right"),
        e = bootstrap.Popover.getInstance(o);
    e._config.placement = "right", e.update();
    var r = document.getElementById("popover-left"),
        p = bootstrap.Popover.getInstance(r);
    p._config.placement = "left", p.update()
})), $("#myonoffswitch55").click((function() {
    var o = document.getElementById("popover-right"),
        e = bootstrap.Popover.getInstance(o);
    e._config.placement = "left", e.update();
    var r = document.getElementById("popover-left"),
        p = bootstrap.Popover.getInstance(r);
    p._config.placement = "right", p.update()
}));
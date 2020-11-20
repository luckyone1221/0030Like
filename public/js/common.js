"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			},
			beforeLoad: function beforeLoad() {
				document.querySelector("html").classList.add("fixed");
			},
			afterClose: function afterClose() {
				document.querySelector("html").classList.remove("fixed");
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll('.link-modal');

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var _this2 = this;

		console.log(this.btnToggleMenuMobile);

		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.addEventListener('click', function () {
					_this2.btnToggleMenuMobile.forEach(function (element) {
						return element.classList.toggle("on");
					});

					_this2.menuMobile.classList.toggle("active");

					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},
	closeMenu: function closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}
	},
	mobileMenu: function mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu(); //omg...
			// document.addEventListener('mouseup', (event) => {
			// 	let container = event.target.closest(".menu-mobile--js.active"); // (1)
			// 	if (!container) {
			// 		this.closeMenu();
			// 	}
			// }, { passive: true });

			window.addEventListener('resize', function () {
				if (window.matchMedia("(min-width: 768px)").matches) {
					JSCCommon.closeMenu();
				}
			}, {
				passive: true
			});
		}
	},
	// /mobileMenu
	// табы  .
	tabscostume: function tabscostume(tab) {
		var tabs = {
			Btn: [].slice.call(document.querySelectorAll(".".concat(tab, "__btn"))),
			BtnParent: [].slice.call(document.querySelectorAll(".".concat(tab, "__caption"))),
			Content: [].slice.call(document.querySelectorAll(".".concat(tab, "__content")))
		};
		tabs.Btn.forEach(function (element, index) {
			element.addEventListener('click', function () {
				if (!element.classList.contains('active')) {
					var siblings = element.parentNode.querySelector(".".concat(tab, "__btn.active"));
					var siblingsContent = tabs.Content[index].parentNode.querySelector(".".concat(tab, "__content.active"));
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active');
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			});
		}); // $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');
		// });
	},
	// /табы
	inputMask: function inputMask() {
		// mask for input
		var InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}");
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie: function ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {
			$("body").after('<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm: function sendForm() {
		var gets = function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");

			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}

			return b;
		}(); // form


		$("form").submit(function (e) {
			e.preventDefault();
			var th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data
			}).done(function (data) {
				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				}); // window.location.replace("/thanks.html");

				setTimeout(function () {
					// Done Functions
					th.trigger("reset"); // $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () {});
		});
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		// листалка по стр
		$(" .top-nav li a, .scroll-link").click(function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 1100);
			return false;
		});
	},
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
var $ = jQuery;

function eventHandler() {
	var _defaultSl;

	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll(); // JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect

	var x = window.location.host;
	var screenName;
	screenName = 'main.jpg';

	if (screenName && x === "localhost:3000") {
		$(".footer").after("<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>"));
	} // /добавляет подложку для pixel perfect


	function whenResize() {
		var topH = $("header ").innerHeight();

		if ($(window).scrollTop() > topH) {
			$('.top-nav  ').addClass('fixed');
		} else {
			$('.top-nav  ').removeClass('fixed');
		}
	}

	window.addEventListener('resize', function () {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	var defaultSl = (_defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		},
		watchOverflow: true
	}, _defineProperty(_defaultSl, "spaceBetween", 0), _defineProperty(_defaultSl, "loop", true), _defineProperty(_defaultSl, "navigation", {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}), _defineProperty(_defaultSl, "pagination", {
		el: ' .swiper-pagination',
		type: 'bullets',
		clickable: true // renderBullet: function (index, className) {
		// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
		// }

	}), _defaultSl);
	var swiper4 = new Swiper('.sBanners__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true
	})); // modal window

	window.onload = function () {
		document.body.classList.add('loaded_hiding');
		window.setTimeout(function () {
			document.body.classList.add('loaded');
			document.body.classList.remove('loaded_hiding');
		}, 500);
	}; //luckyone js
	//amcharts


	var dataArrExample = [{
		"country": "10.11.2020",
		"visits": 11
	}, {
		"country": "11.11.2020",
		"visits": 22
	}, {
		"country": "12.11.2020",
		"visits": 1
	}, {
		"country": "13.11.2020",
		"visits": 5
	}, {
		"country": "14.11.2020",
		"visits": 50
	}, {
		"country": "15.11.2020",
		"visits": 44
	}, {
		"country": "16.11.2020",
		"visits": 78
	}, {
		"country": "17.11.2020",
		"visits": 22
	}, {
		"country": "18.11.2020",
		"visits": 11
	}, {
		"country": "18.11.2020",
		"visits": 1
	}];

	function createCommonChart2(elId, dataArr, paintColor) {
		am4core.ready(function () {
			//??
			// Themes begin
			am4core.useTheme(am4themes_animated); // Themes end
			// Create chart instance

			var chart = am4core.create(elId, am4charts.XYChart); //chart.scrollbarX = new am4core.Scrollbar();
			// Add data

			chart.data = dataArr; // Create axes

			var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
			categoryAxis.dataFields.category = "country";
			categoryAxis.renderer.grid.template.location = 0; //change to avoid mob problems

			categoryAxis.renderer.minGridDistance = 20;
			categoryAxis.renderer.labels.template.horizontalCenter = "right";
			categoryAxis.renderer.labels.template.verticalCenter = "middle"; //rotation of labels

			categoryAxis.renderer.labels.template.rotation = 300;
			categoryAxis.tooltip.disabled = true;
			categoryAxis.renderer.minHeight = 110;
			var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			valueAxis.renderer.minWidth = 50; // Create series

			var series = chart.series.push(new am4charts.ColumnSeries());
			series.sequencedInterpolation = true;
			series.dataFields.valueY = "visits";
			series.dataFields.categoryX = "country";
			series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
			series.columns.template.strokeWidth = 0; //?

			series.columns.rotation = 45;
			series.tooltip.pointerOrientation = "vertical"; //series.columns.template.column.cornerRadiusTopLeft = 10;
			//series.columns.template.column.cornerRadiusTopRight = 10;

			series.columns.template.column.fillOpacity = 0.8; // on hover, make corner radiuses bigger

			var hoverState = series.columns.template.column.states.create("hover");
			hoverState.properties.cornerRadiusTopLeft = 0;
			hoverState.properties.cornerRadiusTopRight = 0;
			hoverState.properties.fillOpacity = 1;
			series.columns.template.adapter.add("fill", function (fill, target) {
				//can change color here
				if (paintColor) {
					return paintColor;
				}

				return chart.colors.getIndex(target.dataItem.index);
			}); // Cursor

			chart.cursor = new am4charts.XYCursor();
		}); // end am4core.ready()
	}

	createCommonChart2("likeUser", dataArrExample, '#20c997');
	createCommonChart2("likeLast", dataArrExample, '#d65988'); //range slider

	function currencyFormat(num) {
		return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
	}

	$(".range-wrap").each(function () {
		var _this = $(this);

		var $range = _this.find(".slider-js");

		var $inputFrom = _this.find(".input_from");

		var $inputTo = _this.find(".input_to");

		var instance,
				from,
				to,
				min = $range.data('min'),
				max = $range.data('max');
		$range.ionRangeSlider({
			skin: "round",
			type: "double",
			grid: false,
			grid_snap: false,
			hide_min_max: true,
			hide_from_to: true,
			onStart: updateInputs,
			onChange: updateInputs,
			onFinish: updateInputs
		});
		instance = $range.data("ionRangeSlider");

		function updateInputs(data) {
			from = data.from;
			to = data.to;
			$inputFrom.prop("value", currencyFormat(from));
			$inputTo.prop("value", currencyFormat(to)); // InputFormat();
		}

		$inputFrom.on("change input ", function () {
			var val = +$(this).prop("value").replace(/\s/g, ''); // validate

			if (val < min) {
				val = min;
			} else if (val > to) {
				val = to;
			}

			instance.update({
				from: val
			});
			$(this).prop("value", currencyFormat(val));
			console.log(val);
		});
		$inputTo.on("change input ", function () {
			var val = +$(this).prop("value").replace(/\s/g, ''); // validate

			if (val < from) {
				val = from;
			} else if (val > max) {
				val = max;
			}

			instance.update({
				to: val
			});
			$(this).prop("value", currencyFormat(val));
		});
	}); //end am
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
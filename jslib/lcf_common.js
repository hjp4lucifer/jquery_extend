(function(window) {
	var lcf = (window.lcf) ? (window.lcf) : {};
	lcf.common = {
		redisplySelect: function($targetSelect, targetValue) {
			if (null == targetValue) {
				targetValue = $targetSelect.attr('sc');
			}
			$targetSelect.children().each(function() {
				var opt = $(this);
				if (opt.attr("value") == targetValue) {
					opt.attr("selected", "selected");
					return false;
				}
			});
		},
		highlight4Table: function($table, highlightClassName) {
			if (null == highlightClassName) {
				highlightClassName = "highlight";
			}
			$table.find("tr").each(function(i) {
				if (i > 0) {
					$(this).mouseover(function() {
						$(this).addClass(highlightClassName);
					}).mouseout(function() {
						$(this).removeClass(highlightClassName);
					});
				}
			});
		},
		/**
		 * @param syncAttrName
		 *            can bind mult checkbox for control
		 */
		bindCheckboxAllSelect: function($checkboxArray, syncAttrName) {
			if (null == syncAttrName) {
				syncAttrName = "sync";
			}
			$checkboxArray.each(function() {
				var $that = $(this);
				if ($that.attr(syncAttrName)) {
					$that.click(function() {
						if (null == $that.attr('checked')) {
							$checkboxArray.removeAttr('checked');
						} else {
							$checkboxArray.attr('checked', 'checked');
						}
					});
				}
			});
		}
	};

	window.lcf = lcf;
})(window);
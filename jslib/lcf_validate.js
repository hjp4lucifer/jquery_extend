(function(window) {
	var lcf = (window.lcf) ? (window.lcf) : {};
	lcf.validate = {
		checkNull: function(jqueryInput, targetName, notShowAlert) {
			var currentString = jqueryInput.val();
			if (currentString.length > 0) {
				return true;
			} else {
				if (!notShowAlert)
					alert("请输入" + targetName);
				jqueryInput.focus();
				return false;
			}
		},
		checkMax: function(jqueryInput, max, targetName, notShowAlert) {
			var currentString = jqueryInput.val();
			if (currentString.length <= max) {
				return true;
			} else {
				if (!notShowAlert)
					alert(targetName + "请输入的内容不要超过" + max + "个字");
				jqueryInput.focus();
				return false;
			}
		},
		checkRegexp: function(o, regexp) {
			if (!(regexp.test(o.val()))) {
				return false;
			} else {
				return true;
			}
		},
		checkImageFile: function(jqueryObject, notShowAlert) {
			var result = checkNull(jqueryObject, null, true);
			if (!result)
				alert("请选择一张图片!");
			if (result) {
				result = checkRegexp(jqueryObject, /^.*?\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|bmp|BMP)$/i);
				if (!result && !notShowAlert) {
					alert("系统仅支持上传jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|bmp|BMP图片!");
				}
			}
			return result;
		}
	};

	window.lcf = lcf;
})(window);

jQuery.fn.extend({
	initFormInfo: function() {
		this.cacheInputs = this.find(":input");
		return this;
	},
	checkMax: function(s) {
		var noAlert = false, maxlength;
		if (s) {
			noAlert = s.noAlert;
			maxlength = s.maxlength;
		}
		var currentString = this.val();
		if (currentString.length <= maxlength) {
			return true;
		} else {
			this.focus();
			var errMessage = null;
			var maxmessage = this.attr("maxmessage"), title = this.attr("title");
			if (maxmessage && $.trim(maxmessage).length > 0)
				errMessage = maxmessage;
			else if (title && $.trim(title).length > 0)
				errMessage = "【" + title + "】的字数不能超过" + maxlength + "个字符!";
			if (!noAlert && errMessage) {
				alert(errMessage);
			}
			return false;
		}
	},
	checkNull: function(s) {
		var noAlert = false;
		if (s) {
			noAlert = s.noAlert;
		}
		var currentString = this.val();
		if (currentString.length > 0) {
			return true;
		} else {
			this.focus();
			var errMessage = null;
			var nullMessage = this.attr("nullmessage"), title = this.attr("title");
			if (nullMessage && $.trim(nullMessage).length > 0)
				errMessage = nullMessage;
			else if (title && $.trim(title).length > 0)
				errMessage = "请输入【" + title + "】!";
			if (!noAlert && errMessage) {
				alert(errMessage);
			}
			return false;
		}
	},
	checkIsNum: function(s) {
		var noAlert = false;
		if (s) {
			noAlert = s.noAlert;
		}
		var currentString = this.val();
		if (!isNaN(currentString)) {
			return true;
		} else {
			this.focus();
			var errMessage = null;
			var nullMessage = this.attr("nonummessage"), title = this.attr("title");
			if (nullMessage && $.trim(nullMessage).length > 0)
				errMessage = nullMessage;
			else if (title && $.trim(title).length > 0)
				errMessage = "请在【" + title + "】处输入正确格式(数字)!";
			if (!noAlert && errMessage) {
				alert(errMessage);
			}
			return false;
		}
	},
	validateForm: function(s) {
		if (!this.cacheInputs) {
			this.cacheInputs = this.find(":input");
		}
		var inputs = this.cacheInputs;
		var isPass = true;
		inputs.each(function() {
			if (isPass) {
				var currentInput = $(this);
				if (currentInput.attr("checknull")) {
					isPass = isPass && currentInput.checkNull(s);
				}
				if (isPass && currentInput.attr("maxlength")) {
					var maxlength = currentInput.attr("maxlength");
					if (!isNaN(maxlength) && maxlength > 0) {
						if (!s) {
							s = {};
						}
						s.maxlength = maxlength;
						isPass = isPass && currentInput.checkMax(s);
					}
				}
				if (isPass && currentInput.attr("isnum")) {
					isPass = isPass && currentInput.checkIsNum(s);
				}
			}
		});
		return isPass;
	}
});

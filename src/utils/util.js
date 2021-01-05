/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find(list, f) {
	return list.filter(f)[0];
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy(obj, cache = []) {
	// just return if obj is immutable value
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	// if obj is hit, it is in circular structure
	const hit = find(cache, (c) => c.original === obj);
	if (hit) {
		return hit.copy;
	}

	const copy = Array.isArray(obj) ? [] : {};
	// put the copy into cache at first
	// because we want to refer it in recursive deepCopy
	cache.push({
		original: obj,
		copy
	});

	Object.keys(obj).forEach((key) => {
		copy[key] = deepCopy(obj[key], cache);
	});

	return copy;
}

/**
 * forEach for object
 */
export function forEachValue(obj, fn) {
	Object.keys(obj).forEach((key) => fn(obj[key], key));
}

export function isObject(obj) {
	return obj !== null && typeof obj === 'object';
}

export function isPromise(val) {
	return val && typeof val.then === 'function';
}

export function assert(condition, msg) {
	if (!condition) throw new Error(`[vuex] ${msg}`);
}

export function partial(fn, arg) {
	return function () {
		return fn(arg);
	};
}

export const getBaseURL = () => {
	var baseURL = '';
	var baseDocument = 'index.html';

	if (document.getElementsByTagName('base').length > 0) {
		baseURL = document.getElementsByTagName('base')[0].href.replace(baseDocument, '');
	} else {
		baseURL =
			location.protocol + '//' + location.hostname + (location.port && ':' + location.port) + '/';
	}

	return baseURL;
};

/**
 * 重写toFixed方法,解决四舍五入不准确的问题
 *  100.2555 => "100.26"
 * @param num 原始数据
 * @param n 小数位数
 */
export function tofixed(num, n) {
	let s = num + '';
	if (s.indexOf('.') == -1) {
		return num;
	}
	let symbol = 1;
	if (num < 0) {
		// 符号为负
		symbol = -1;
		num *= -1;
	}
	let num2 = (Math.round(num * Math.pow(10, n)) / Math.pow(10, n) + Math.pow(10, -(n + 1)))
		.toString()
		.slice(0, -1);
	return parseFloat(num2 * symbol).toFixed(n);
}

//密码加密传输
export function encodePwd(x) {
	if (!x) return '';

	let v = Array(x.length)
		.fill(0)
		.flatMap((z, i) => {
			let c = x.charCodeAt(i);
			if (c < 0x80) {
				return [c];
			} else if (c < 0x800) {
				return [0xc0 | (c >> 6), 0x80 | (c & 0x3f)];
			} else {
				return [0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f)];
			}
		})
		.map((v) => String.fromCharCode(v ^ 0xcf))
		.join('');

	return btoa(v);
}
// 保留小数点后n位小数
export function decimalToN(val, n) {
	return parseFloat(val).toFixed(n);
}

//sleep(1000); // 延时函数，单位ms
export function sleep(time) {
	let startTime = new Date().getTime() + parseInt(time, 10);
	while (new Date().getTime() < startTime) {}
}

//两个时间相差天数 兼容firefox chrome
export function dateDifference(sDate1, sDate2) {
	//sDate1和sDate2是2006-12-18格式
	let dateSpan, iDays;
	sDate1 = Date.parse(sDate1);
	sDate2 = Date.parse(sDate2);
	dateSpan = sDate2 - sDate1;
	dateSpan = Math.abs(dateSpan);
	iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
	return iDays;
}

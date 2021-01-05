import Vue from 'vue';
import { saveAs } from 'file-saver';
import SingleMessage from './SingleMessage';

//多个请求下，只弹出1个message
Vue.prototype.$message = SingleMessage;
//trim方法封装，可以避免报错
Vue.prototype.customTrim = function (ele) {
	if (ele) {
		return ele.trim() || '';
	} else {
		return ele || '';
	}
};
Vue.prototype.downloadcreateUrlObj = function (res, filename, type) {
	const content = res;
	let blob = '';
	if (type == 'word') {
		blob = new Blob([content.data], {
			type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=UTF-8'
		});
	} else {
		blob = new Blob([content.data], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
		});
	}
	const fileName = filename;
	if ('download' in document.createElement('a')) {
		// 非IE下载
		const elink = document.createElement('a');
		elink.download = fileName;
		elink.style.display = 'none';
		elink.href = URL.createObjectURL(blob);
		document.body.appendChild(elink);
		elink.click();
		URL.revokeObjectURL(elink.href); // 释放URL 对象
		document.body.removeChild(elink);
	} else {
		// IE10+下载
		navigator.msSaveBlob(blob, fileName);
	}
};
Vue.prototype.downloadcreateUrl = function (res, filename, type) {
	const content = res; // 注意查看conten的内容数据是否在content.data里
	let blob = '';
	let fileName = filename;

	if (res.type === 'application/json') {
		//返回错误信息提示
		let reader = new FileReader();
		reader.readAsText(res);
		reader.onload = function () {
			console.log('reader', reader);
			let resData = JSON.parse(reader.result.toString());
			SingleMessage.error(resData.message);
			return;
		};
		return;
	}

	if (type == 'word') {
		blob = new Blob([content], {
			type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=UTF-8'
		});
	} else if (type == 'reportword') {
		blob = new Blob([content], {
			type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=UTF-8'
		});
	} else if (type == 'zip') {
		blob = new Blob([content], { type: 'application/zip;charset=UTF-8' });
	} else if (type == 'pdf') {
		blob = new Blob([content], { type: 'application/pdf;charset=UTF-8' });
	} else if (type == 'xml') {
		blob = new Blob([content], { type: 'application/xml;charset=UTF-8' });
	} else if (type == 'rar' || type == 'xls' || type == 'xlsx' || type == 'csv' || type == 'dbf') {
		//hqms使用，没有指定MIME类型，通过文件名后缀定义下载文件类型
		blob = new Blob([content]);
		fileName = filename + '.' + type;
	} else if (type == 'dbf') {
		blob = new Blob([content], {
			type: 'application/x-dbf;charset=UTF-8'
		});
	} else {
		//excel
		blob = new Blob([content], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
		});
	}
	console.log(content);
	// 有文件名就用自定义的，没有就从header获取
	if (!fileName) {
		fileName = fileNameFromHeader(content.headers['content-disposition'] || '');
	}
	console.log('downloadcreateUrl:', fileName);
	saveAs(blob, fileName);
	function fileNameFromHeader(disposition) {
		let result = null;
		disposition = disposition.split(';')[1];
		if (disposition && /filename=.*/gi.test(disposition)) {
			result = disposition.match(/filename=.*/gi);
			return decodeURIComponent(result[0].split('=')[1].replace(/\+/g, '%20'));
		}
		return 'null';
	}
};

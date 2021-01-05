import date from 'date-and-time';

function formatTimeString(timeStr, format, invalidTimeResult) {
	if (!invalidTimeResult) {
		invalidTimeResult = '---';
	}

	if (!timeStr) return invalidTimeResult;

	let time = null;
	if (timeStr.indexOf(':') == -1) {
		time = date.parse(timeStr, 'YYYY-MM-DD');
	} else {
		time = date.parse(timeStr, 'YYYY-MM-DD HH:mm:ss');
	}

	if (isNaN(time.getTime())) {
		return invalidTimeResult;
	}

	return date.format(time, format);
}

function format(d, format) {
	return date.format(d, format);
}

function daysBetween(startTimeStr, endTimeStr) {
	let getDatetime = function (timeStr) {
		if (!timeStr) {
			return 0;
		}
		let time = null;
		if (timeStr.indexOf(':') == -1) {
			time = date.parse(timeStr, 'YYYY-MM-DD');
		} else {
			time = date.parse(timeStr, 'YYYY-MM-DD HH:mm:ss');
		}

		return time.getTime();
	};

	let startTime = getDatetime(startTimeStr);
	let endTime = getDatetime(endTimeStr);

	let seconds = endTime - startTime;
	if (seconds < 0) {
		return 0;
	}
	let days = Math.round(seconds / 86400000);

	return days;
}

export default {
	formatTimeString,
	daysBetween,
	format
};

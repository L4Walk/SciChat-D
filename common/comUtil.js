
function getHost(){
	return 'http://47.113.149.222:8080';
}

function getApiHost(){
	return 'https://openai.api2d.net';
}


function getHeader(){
	return {
		"Content-Type": "application/json",
		"Authorization": "Bearer " + uni.getStorageSync('UserKey') //自定义请求头信息
	};
}

function S4() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function getGuid() {
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function getTime() {
	return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
}

function formatDate(d, fmt) {
	if (typeof(d) == "string")
		d = new Date(d.replace("-", "/").replace("-", "/").replace("-", "/"));
	var o = {
		"M+": d.getMonth() + 1, // 月份
		"d+": d.getDate(), // 日
		"h+": d.getHours(), // 小时
		"m+": d.getMinutes(), // 分
		"s+": d.getSeconds(), // 秒
		"q+": Math.floor((d.getMonth() + 3) / 3), // 季度
		"S": d.getMilliseconds() // 毫秒
	};

	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
				.length)));

	return fmt;
}


export default {
	getHost,
	getApiHost,
	getHeader,
	getGuid,
	getTime,
	formatDate
}
function fetchStream(url, params) {
	let text = "";
	var decoder = new TextDecoder();
	const {
		onmessage,
		onclose,
		onerror,
		...otherParams
	} = params;
	const push = async (controller, reader, status) => {
		const {
			value,
			done
		} = await reader.read();
		if (done) {
			controller.close();
			onclose?.();
		} else {
			const str = decoder.decode(value);
			if(status == 200){
				const strs = str.split("data: ").filter((v) => v);
				for (let i = 0; i < strs.length; i++) {
					const val = strs[i];
					if (val.includes("[DONE]")) {
						controller.close();
						onclose?.();
						return;
					}
					const data = JSON.parse(val, {
						stream: true
					});
					data.choices[0].delta.content && (text += data.choices[0].delta.content);
				}
				onmessage?.(text);
				controller.enqueue(value);
				push(controller, reader, status);
			}else{
				var errorJson = JSON.parse(str);
				onerror(getError(errorJson.code + ''));
				controller.close();
				onclose?.();
				return;
			}
		}
	};
	// 发送请求
	return fetch(url, otherParams).then((response) => {
		// 以ReadableStream解析数据
		const reader = response.body.getReader();
		const stream = new ReadableStream({
			start(controller) {
				push(controller, reader, response.status);
			}
		});
		return stream;
	}).then((stream) => new Response(stream, {
		headers: {
			'Content-Type': 'application/json'
		}
	}).text());
}

function getError(code) {
	var result = '';
	switch (code) {
		case '40001':
			result = '未提供 Forward Key';
			break;
		case '40002':
			result = 'Forward Key 错误';
			break;
		case '40003':
			result = '用户不存在';
			break;
		case '40004':
			result = '用户状态异常';
			break;
		case '40201':
			result = '积分不足';
			break;
		case '40301':
			result = '暂未开放的访问路径';
			break;
		case '40302':
			result = '参数中没有提供模型参数';
			break;
		case '40308':
			result = '参数中 instruction 不能为空	';
			break;
		case '42901':
			result = '您的账户请求次数过多，超过分钟配额';
			break;
		case '40304':
			result = '参数中向量的维度错误，目前只支持 1536 长度的向量';
			break;
		case '40305':
			result = '参数中文本的长度超过了 65535 bytes';
			break;
		case '40306':
			result = '参数中 searchable_id 不能为空';
			break;
		case '40307':
			result = '参数中 uuid 不能为空';
			break;
		default:
			result = '未知错误';
			break;
	}
	return result;
}

export default {
	fetchStream
}
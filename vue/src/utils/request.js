import axios from 'axios';
import {ElMessage} from 'element-plus'

// 接口请求地址 - 开发环境可以不写 生产环境要写
const _BASEURL = process.env.BASE_API_URL || process.env.VUE_APP_BASE_API_URL || '';
const _ENV = process.env.NODE_ENV || process.env.VUE_APP_NODE_ENV || 'production';

/**
 * 移除开发环境代理时的前缀
 * @param {需要处理的字符串} url
 * @returns
 */
function removePrefix(url) {
    if (_ENV === 'production') {
        url = url.replace('/api', '');
    }
    return url;
}

/**
 * 转换请求数据为get请求时的可用数据格式
 * @param {请求数据} data
 * @returns
 */
function urlParams(data) {
    let paramsString = '';
    for (let item in data) {
        paramsString += item + '=' + data[item] + '&';
    }
    paramsString = paramsString.substring(0, paramsString.length - 1);
    return paramsString;
}

/**
 * 接口调用成功的统一处理
 * 1 = 请求正常
 * 2 = 和后端约定好的登录失效或异常
 * @param {请求结果} data
 * @returns
 */
function handleSuccess(data) {
    let message = data.message || data.msg;
    let code = data.code;
    if (data.code == 200 || data.code == 0) {
        code = 1;
    }
    // 登录失效或者无效
    else if (data.code == 9 || data.code == 900 || data.code == 300) {
        message = message || '登录已失效，稍后请重新登录';
        code = 2;
        ElMessage.error(message)
        const timer = setTimeout(() => {
            window.location.reload();
            clearTimeout(timer);
        }, 1800);
    } else {
        message = message || '请求有误，请检查';
        ElMessage.error(message)
    }
    let result = {
        message: message,
        code: code,
        data
    };
    return result;
}

// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        // 请求头的一些配置 但是貌似只能添加新的属性 无法修改已有属性
        let token = localStorage.getItem('token');
        if (token) config.headers['token'] = token;
        config.withCredentials = true;
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        return response;
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

/**
 * axios请求
 * @param {请求地址} url
 * @param {请求类型} type
 * @param {请求参数} data
 * @param {请求头数据类型} ContentType
 * @returns
 */
export const Request = (type, url, data, ContentType = '') => {
    url = _BASEURL + removePrefix(url);
    const config = ContentType ? { headers: { 'Content-Type': ContentType } } : '';

    return new Promise((resovle, reject) => {
        switch (true) {
            case type == 'get' || type == 'GET':
                url += '?' + urlParams(data);
                axios
                    .get(url, config)
                    .then(({ data }) => {
                        let result = handleSuccess(data);
                        return result.code == 1 ? resovle(result.data) : reject(result.message);
                    })
                    .catch((err) => {
                        ElMessage.error(err)
                    });
                break;
            case type == 'post' || type == 'POST':
                let otherParams = {
                    timestamp: new Date().getTime(),
                    sign: ''
                };
                axios
                    .post(url, { ...data, ...otherParams }, config)
                    .then(({ data }) => {
                        let result = handleSuccess(data);
                        return result.code == 1 ? resovle(result.data) : reject(result.message);
                    })
                    .catch((err) => {
                        ElMessage.error(err)
                    });
                break;
            case type == 'put' || type == 'PUT':
                axios
                    .put(url, data, config)
                    .then(({ data }) => {
                        let result = handleSuccess(data);
                        return result.code == 1 ? resovle(result.data) : reject(result.message);
                    })
                    .catch((err) => {
                        ElMessage.error(err)
                    });
                break;
            case type == 'delete' || type == 'DELETE':
                url += '?' + urlParams(data);
                axios
                    .delete(url, config)
                    .then(({ data }) => {
                        let result = handleSuccess(data);
                        return result.code == 1 ? resovle(result.data) : reject(result.message);
                    })
                    .catch((err) => {
                        ElMessage.error(err)
                    });
                break;
            default:
                reject('非合法请求');
        }
    });
};

/**
 * Axios post 请求
 * @param {请求地址} url
 * @param {请求参数} data
 * @param {请求头数据类型} ContentType
 * @returns
 */
export const Post = (url, data, ContentType) => {
    url = _BASEURL + removePrefix(url);
    const config = ContentType ? { headers: { 'Content-Type': ContentType } } : '';
    return new Promise((resovle, reject) => {
        let otherParams = {
            timestamp: new Date().getTime(),
            sign: ''
        };
        axios
            .post(url, { ...data, ...otherParams }, config)
            .then(({ data }) => {
                let result = handleSuccess(data);
                return result.code == 1 ? resovle(result.data) : reject(result.message);
            })
            .catch((err) => {
                ElMessage.error(err)
            });
    });
};

/**
 * Axios get 请求
 * @param {请求地址} url
 * @param {请求参数} data
 * @param {请求头数据类型} ContentType
 * @returns
 */
export const Get = (url, data, ContentType) => {
    url = _BASEURL + removePrefix(url);
    const config = ContentType ? { headers: { 'Content-Type': ContentType } } : '';
    return new Promise((resovle, reject) => {
        url += '?' + urlParams(data);
        axios
            .get(url, config)
            .then(({ data }) => {
                let result = handleSuccess(data);
                return result.code == 1 ? resovle(result.data) : reject(result.message);
            })
            .catch((err) => {
                ElMessage.error(err)
            });
    });
};

/**
 * 文件下载
 * @param {请求类型} type
 * @param {请求接口} url
 * @param {请求参数} data
 * @param {请求头数据类型} ContentType
 * @param {下载的文件名} fileName
 * @param {下载的文件类型} fileType
 * @returns
 */
export const DownFile = (type, url, data, ContentType, fileName = '下载文件', fileType = 'xlsx') => {
    url = _BASEURL + removePrefix(url);
    const config = ContentType ? { responseType: 'blob', headers: { 'Content-Type': ContentType } } : { responseType: 'blob' };
    return new Promise((resovle, reject) => {
        switch (true) {
            case type == 'get' || type == 'GET':
                url += '?' + urlParams(data);
                axios
                    .get(url, config)
                    .then(({ data }) => {
                        downloadFile(data, fileName, fileType);
                        resovle({
                            code: 200,
                            message: '下载成功'
                        });
                    })
                    .catch((err) => {
                        ElMessage.error(err)
                    });
                break;
            case type == 'post' || type == 'POST':
                let otherParams = {
                    timestamp: new Date().getTime(),
                    sign: ''
                };
                axios
                    .post(url, { ...data, ...otherParams }, config)
                    .then(({ data }) => {
                        downloadFile(data, fileName, fileType);
                        resovle({
                            code: 200,
                            message: '下载成功'
                        });
                    })
                    .catch((err) => {
                        ElMessage.error(err)
                    });
                break;
            default:
                reject('非合法请求');
        }
    });
};

// 下载文件
function downloadFile(obj, name, suffix) {
    // const url = window.URL.createObjectURL(new Blob([obj]));
    const url = window.URL.createObjectURL(obj);
    console.log(obj, name, suffix, url);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    const fileName = parseTime(new Date()) + '-' + name + '.' + suffix;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
// 下载的文件命名时间
function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'undefined' || time === null || time === 'null') {
        return '';
    } else if (typeof time === 'object') {
        date = time;
    } else {
        if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
            time = parseInt(time);
        }
        if (typeof time === 'number' && time.toString().length === 10) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value];
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return time_str;
}

export default {
    Request,
    Post,
    Get,
    DownFile
};

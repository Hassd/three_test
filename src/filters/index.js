const htmlDecode = htmlStr => {
    return htmlStr
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "");
};


const imgwidth = text => {
    return text.replace(/<img/g, "<img width='100%'")
}

const removeZero = value => {
    if (typeof value == "number") {
        value = value + "";
    }
    let i = value.indexOf(".");
    if (i == -1) {
        return value;
    } else {
        return value.substr(0, i);
    }

}

const addZero = value => {
    if (parseFloat(value) > 0) {
        return (Math.round((parseFloat(value) * 100)) / 100).toFixed(2);
    } else {
        return '0.00';
    }
}

export default {
    htmlDecode,
    removeZero,
    addZero
};

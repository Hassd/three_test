

export default {
    getModelPoint(Model) {
        //获取模型中心点
        Model.geometry.computeBoundingBox();
        var centroid = new THREE.Vector3();
        centroid.addVectors(
            Model.geometry.boundingBox.min,
            Model.geometry.boundingBox.max
        );
        centroid.multiplyScalar(0.5);
        centroid.applyMatrix4(Model.matrixWorld);
        return centroid;
    },
    addLine(start, end) {  //画一条线段
        start = new THREE.Vector3(start.x, start.y, start.z);
        end = new THREE.Vector3(end.x, end.y, end.z);


        let color = 0x37ffff;
        let obj3d = new THREE.Object3D();

        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial({
            transparent: true,
            opacity: 1, //设置透明度
            linewidth: 1, //设置线的宽度
            vertexColors: true
        });
        var color2 = new THREE.Color(color);
        // 线的材质可以由2点的颜色决定

        // var p1 = new THREE.Vector3(arr[i].x, arr[i].y, arr[i].z);
        geometry.vertices.push(start);
        geometry.colors.push(color2);

        geometry.vertices.push(end);
        geometry.colors.push(color2);

        var line = new THREE.Line(geometry, material);
        obj3d.add(line);

        var geometry = new THREE.SphereGeometry(0.25);
        var material = new THREE.MeshBasicMaterial({ color: color });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(start.x, start.y, start.z);
        obj3d.add(cube);

        var geometry2 = new THREE.SphereGeometry(0.25);
        var material2 = new THREE.MeshBasicMaterial({ color: color });
        var cube2 = new THREE.Mesh(geometry2, material2);
        cube2.position.set(end.x, end.y, end.z);
        obj3d.add(cube2);
        return obj3d;
    },
    setLabel(obj) {
        let width = obj.width || 360; //canvas的宽
        let height = obj.height || 216; //canvas的高
        let title = obj.title || ""; //标签的标题文字
        let introduce = obj.introduce || ""; //标签的介绍文字
        let times = obj.times || 1; //放大倍数
        let fontColor = obj.fontColor || "#5CE6FF"; //文字颜色
        // let bgColor = obj.bgColor || 'rgba(55,255,255,0.3)';  //背景颜色
        let borderColor = obj.borderColor || "rgba(37,140,207,0.8)"; //边框颜色

        let context = document.createElement("canvas");
        context.width = width * times;
        context.height = height * times;
        var ctx = context.getContext("2d");

        //背景
        ctx.beginPath();
        ctx.moveTo(20 * times, 20 * times);
        ctx.lineTo(width * times - (40 * times), (20 * times));
        ctx.lineTo(width * times - (20 * times), (40 * times));
        ctx.lineTo(width * times - (20 * times), height * times - (20 * times));
        ctx.lineTo((40 * times), height * times - (20 * times));
        ctx.lineTo((20 * times), height * times - (40 * times));
        ctx.fillStyle = 'rgba(37,140,207,0.8)';
        ctx.fill();

        // T 字底
        ctx.save();
        ctx.beginPath();
        ctx.font = `normal normal 900  ${100 * times}px Arial`;
        ctx.textBaseline = "alphabetic"; //设置字体底线对齐绘制基线
        ctx.fillStyle = '#5CE6FF';
        ctx.textAlign = "center"; //设置字体对齐的方式 //ctx.strokeText( "left", 450, 400 );
        ctx.fillText("T", 70 * times, 110 * times);
        ctx.stroke();
        ctx.beginPath();
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(59 * times, 112 * times);
        ctx.lineTo(width * times - (45 * times), 112 * times);
        ctx.lineWidth = 8 * times;
        ctx.strokeStyle = '#5CE6FF';
        ctx.stroke();
        ctx.beginPath();

        ctx.save();
        ctx.beginPath();


        // let img = await labelImg();
        // console.log('zxcasdaqweasdzxc', img);
        // console.log('1111111111111111');
        // let img = new Image();
        // img.src = require('../assets/images/labelImg.png');
        // ctx.drawImage(img, 35 * times, 35 * times, 285 * times, 79 * times);
        // ctx.beginPath();



        //写字标题
        ctx.save();
        ctx.beginPath();
        ctx.font = `${36 * times}px "微软雅黑"`;
        ctx.textBaseline = "alphabetic"; //设置字体底线对齐绘制基线
        ctx.fillStyle = fontColor;
        ctx.textAlign = "center"; //设置字体对齐的方式 //ctx.strokeText( "left", 450, 400 );
        ctx.fillText(title, 200 * times, 90 * times);
        ctx.stroke();
        ctx.beginPath();

        //介绍
        ctx.save();
        ctx.beginPath();
        ctx.font = `${20 * times}px "微软雅黑"`;
        ctx.textBaseline = "alphabetic"; //设置字体底线对齐绘制基线
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center"; //设置字体对齐的方式 //ctx.strokeText( "left", 450, 400 );

        let arr = introduce.split("");
        let arr2 = [];
        let tmp = "";
        for (let i = 0; i < arr.length; i++) {
            if (ctx.measureText(tmp).width > 280 * times) {
                arr2.push(tmp);
                tmp = "";
            }
            tmp += arr[i];
        }
        arr2.push(tmp);
        for (let j = 0; j < arr2.length; j++) {
            ctx.fillText(arr2[j], width * times / 2, (145 + j * 25) * times);
        }
        ctx.stroke();
        ctx.beginPath();

        //两个扩折边
        ctx.save();
        ctx.beginPath();
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor = "rgba(255,255,255,0.2)";
        ctx.shadowBlur = 20 * times;
        ctx.moveTo(width * times - 60 * times, 5 * times);
        ctx.lineTo(5 * times, 5 * times);
        ctx.lineTo(5 * times, height * times - 60 * times);
        ctx.lineWidth = 4 * times;
        ctx.strokeStyle = borderColor;
        ctx.stroke();
        ctx.beginPath();
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(width * times - 5 * times, 60 * times);
        ctx.lineTo(width * times - 5 * times, height * times - 5 * times);
        ctx.lineTo(60 * times, height * times - 5 * times);
        ctx.lineWidth = 4 * times;
        ctx.strokeStyle = borderColor;
        ctx.stroke();
        ctx.beginPath();

        return context;
    },
    setLabel2(obj) {                     //使用canvas画出标签，当做Sprite的纹理
        let width = obj.width || 200;   //canvas的宽
        let height = obj.height || 80;  //canvas的高
        let title = obj.title || "";    //标签的标题文字
        let introduce = obj.introduce || "";    //标签的介绍文字
        let times = obj.times || 1;     //放大倍数
        let fontColor = obj.fontColor || '#fff';   //文字颜色
        let bgColor = obj.bgColor || 'rgba(55,255,255,0.3)';  //背景颜色
        let borderColor = obj.borderColor || 'rgba(55,255,255,0.9)';  //边框颜色


        //创建标签
        let context = document.createElement("canvas");
        context.width = width * times;
        context.height = height * times;
        var ctx = context.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(13 * times, 5 * times);
        ctx.lineTo(8 * times, 10 * times);
        ctx.lineTo(8 * times, height * times - 10 * times);
        ctx.lineTo(13 * times, height * times - 5 * times);
        ctx.lineTo(width * times - 13 * times, height * times - 5 * times);
        ctx.lineTo(width * times - 8 * times, height * times - 10 * times);
        ctx.lineTo(width * times - 8 * times, 10 * times);
        ctx.lineTo(width * times - 13 * times, 5 * times);

        ctx.fillStyle = bgColor;
        ctx.fill();

        /* 标签左边框 */
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(5 * times, 0);
        ctx.lineTo(0, 5 * times);
        ctx.lineTo(0, height * times - 5 * times);
        ctx.lineTo(5 * times, height * times);
        ctx.lineWidth = 1 * times;
        ctx.strokeStyle = borderColor;
        ctx.stroke();
        ctx.beginPath();

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(13 * times, 5 * times);
        ctx.lineTo(8 * times, 10 * times);
        ctx.lineTo(8 * times, height * times - 10 * times);
        ctx.lineTo(13 * times, height * times - 5 * times);
        ctx.lineWidth = 3 * times;
        ctx.strokeStyle = borderColor;
        ctx.stroke();
        ctx.beginPath();

        /* 标签右边框 */
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(width * times - 5 * times, 0);
        ctx.lineTo(width * times, 5 * times);
        ctx.lineTo(width * times, height * times - 5 * times);
        ctx.lineTo(width * times - 5 * times, height * times);
        ctx.lineWidth = 1 * times;
        ctx.strokeStyle = borderColor;
        ctx.stroke();
        ctx.beginPath();

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(width * times - 13 * times, 5 * times);
        ctx.lineTo(width * times - 8 * times, 10 * times);
        ctx.lineTo(width * times - 8 * times, height * times - 10 * times);
        ctx.lineTo(width * times - 13 * times, height * times - 5 * times);
        ctx.lineWidth = 3 * times;
        ctx.strokeStyle = borderColor;
        ctx.stroke();
        ctx.beginPath();

        //写字(标题)
        ctx.save();
        ctx.beginPath();
        ctx.font = 20 * times + 'px "微软雅黑"'; //设置字体
        ctx.textBaseline = "top"; //设置字体底线对齐绘制基线
        ctx.fillStyle = fontColor;
        ctx.textAlign = "center"; //设置字体对齐的方式 //ctx.strokeText( "left", 450, 400 );
        ctx.fillText(title, (width / 2) * times, 15 * times);
        ctx.stroke();
        ctx.beginPath();

        //写字(介绍)
        if (introduce) {
            let size = introduce.length;
            let rowNum = Math.ceil(size / 15);
            for (let i = 0; i < rowNum; i++) {
                ctx.save();
                ctx.beginPath();
                ctx.font = 12 * times + 'px "微软雅黑"'; //设置字体
                ctx.textBaseline = "top"; //设置字体底线对齐绘制基线
                ctx.fillStyle = fontColor;
                ctx.textAlign = "center"; //设置字体对齐的方式 //ctx.strokeText( "left", 450, 400 );
                ctx.fillText(
                    introduce.substring(i * 15, (i + 1) * 15),
                    (width / 2) * times,
                    (40 + 15 * i) * times
                );
                ctx.stroke();
                ctx.beginPath();
            }
        }

        return context;
    },
    setSprite(obj) {  //创建精灵标签
        let x = obj.x || 0;                     //标签x轴
        let y = obj.y || 0;                     //标签y轴
        let z = obj.z || 0;                     //标签z轴
        let title = obj.title || "没有标题";     //标签标题
        let introduce = obj.introduce || "";    //标签介绍
        let name = obj.name || "isNull";        //标签名
        let multiple = obj.multiple || 1;       //放大倍数
        let fontColor = obj.fontColor || '#fff';//字体颜色，建议 #fff 这种格式
        let bgColor = obj.bgColor || 'rgba(55,255,255,0.3)';    //背景颜色，建议 rgba(55,255,255,0.3) 这种格式
        let borderColor = obj.borderColor || 'rgba(37,140,207,0.8)';    //边框颜色，建议 rgba(55,255,255,0.9) 这种格式

        let canvas = this.setLabel({
            width: 360,
            height: 216,
            title: title,
            introduce: introduce,
            times: 4,
            fontColor: fontColor,
            bgColor: bgColor,
            borderColor: borderColor
        });
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        var spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true
        });
        var sprite = new THREE.Sprite(spriteMaterial);
        sprite.name = name;
        sprite.scale.set(12 * multiple, 7 * multiple, 1);
        sprite.position.x = x;
        sprite.position.y = y;
        sprite.position.z = z;
        return sprite;
    },
    setCompanySign(obj) {
        let width = obj.width || 40;
        let height = obj.height || 40;
        let times = obj.times || 1;
        return new Promise((resolve, reject) => {
            //创建公司标志
            let context = document.createElement("canvas");
            //this.user.qr_code
            context.width = width * times;
            context.height = height * times;
            var ctx = context.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, height);
            ctx.lineTo(width, height);
            ctx.lineTo(width, 0);
            ctx.fillStyle = "rgba(55,255,255,0)";
            ctx.fill();

            var img = new Image();
            img.onload = function () {
                //ctx.drawImage(图片，x轴位置，y轴位置，图片宽，图片高)
                let imgwidth = (width / 2) * times;
                let imgheight = (height / 2) * times;
                ctx.drawImage(
                    img,
                    (width - imgwidth) / 2,
                    10 * times,
                    imgwidth,
                    imgheight
                );
                console.log(this.src);
                resolve(context);
            };
            img.src = this.process + this.user.logo;
            img.onerror = function () {
                reject(context);
            };

            //写字
            ctx.save();
            ctx.beginPath();
            ctx.font = 16 * times + 'px "微软雅黑"'; //设置字体
            ctx.textBaseline = "bottom"; //设置字体底线对齐绘制基线
            ctx.fillStyle = "#FFD900";
            ctx.textAlign = "center"; //设置字体对齐的方式 //ctx.strokeText( "left", 450, 400 );
            ctx.fillText(
                this.user.nickname,
                (width / 2) * times,
                (height - 20) * times
            );
            ctx.stroke();
            ctx.beginPath();
        });
    },
    setCircular(obj) {
        obj.x = obj.x || 0;
        obj.y = obj.y || 0;
        obj.z = obj.z || 0;
        obj.multiple = obj.multiple || 1;

        let context = this.drawCircular(400 * obj.multiple);
        var geometry = new THREE.PlaneGeometry(
            400 * obj.multiple,
            400 * obj.multiple,
            5,
            5
        );
        var texture = new THREE.Texture(context);
        texture.needsUpdate = true;
        var material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true
        });
        var plane = new THREE.Mesh(geometry, material);
        plane.position.set(obj.x, obj.y, obj.z);
        plane.rotation.x = -Math.PI / 2;

        return plane;
    },
    drawCircular(wpx, times = 1) {
        let context = document.createElement("canvas");

        context.width = wpx;
        context.height = wpx;
        var ctx = context.getContext("2d");
        ctx.beginPath();
        ctx.arc(
            (wpx / 2) * times,
            (wpx / 2) * times,
            0.125 * wpx * times,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fill();

        ctx.save();
        ctx.beginPath();
        ctx.arc(
            (wpx / 2) * times,
            (wpx / 2) * times,
            0.25 * wpx * times,
            0,
            2 * Math.PI
        );
        ctx.lineWidth = 0.03 * wpx * times;
        ctx.strokeStyle = "rgba(255, 255, 255, 1)";
        ctx.stroke();

        ctx.save();
        ctx.beginPath();

        ctx.beginPath();
        ctx.arc(
            (wpx / 2) * times,
            (wpx / 2) * times,
            0.475 * wpx * times,
            0,
            2 * Math.PI
        );
        ctx.lineWidth = 0.01 * wpx * times;
        ctx.strokeStyle = "rgba(255, 255, 255, 1)";
        ctx.stroke();
        ctx.beginPath();

        return context;
    },
};
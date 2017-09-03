'use strict';

function generateImageURL(imageDatasArr) {
    imageDatasArr.forEach(function (val, index) {
        let singleImageData = require('../images/' + val.name);
        imageDatasArr[index].singleImageData = singleImageData;
    });
    return imageDatasArr;
}

function getRangRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}

let Constants = {
        centerPos: { //中心坐标
            left: 0,
            right: 0
        },
        hPosRang: {//水平方向取值范围
            leftSecX: [0, 0],
            rightSecX: [0, 0],
            Y: [0, 0]
        },
        vPosRang: {//垂直方向取值范围
            x: [0, 0],
            topY : [0, 0]
        }
};

//重新布局所有图片, centerIndex中心图片的index
function rearRange(imagesRangeArr, centerIndex) {
    let centerPos = Constants.centerPos;
    let hPosRang = Constants.hPosRang;
    let vPosRang = Constants.vPosRang;

    let hPosRangLeftSecX = hPosRang.leftSecX;
    let hPosRangRightSecX = hPosRang.rightSecX;
    let hPosRangY = hPosRang.Y;

    let vPosRangX = vPosRang.x;
    let vPosRangTopY = vPosRang.topY;

    let imagesRangTopArr = [];
    let topImgNum = Math.ceil(Math.Random * 2)
    let topImgSpliceIndex = 0;

    let imageRangeArrCenter = imagesRangeArr.splice(centerIndex, 1);
    //首先居中centerindex的图片
    imageRangeArrCenter[0].pos = centerPos;

    //取出上册图片的位置信息
    topImgSpliceIndex = Math.ceil(Math.random() * (imagesRangeArr.length - topImgNum));
    imagesRangTopArr = imagesRangeArr.splice(topImgSpliceIndex, topImgNum);
    
    //布局上册图片
    imagesRangTopArr.forEach(function(val) {
        val.pos = {
            top: getRangRandom(vPosRangTopY[0], vPosRangTopY[1]),
            left: getRangRandom(vPosRangX[0], vPosRangX[1])
        }
    });

    //布局左右两侧的图片
    imagesRangeArr.forEach(function(val, index) {
        let hPosRangLORX = null;
        if (index < imagesRangeArr.length / 2) {
            hPosRangLORX = hPosRangLeftSecX;
        } else {
            hPosRangLORX = hPosRangRightSecX;
        }

        val.pos = {
            top: getRangRandom(hPosRangY[0], hPosRangY[1]),
            left: getRangRandom(hPosRangLORX[0], hPosRangLORX[1])
        }
    });

    if (imagesRangTopArr && imagesRangTopArr[0]) {
        imagesRangeArr.splice(topImgSpliceIndex, 0, imagesRangTopArr[0]);
    }

    imagesRangeArr.splice(centerIndex, 0, imageRangeArrCenter[0]);

    return imagesRangeArr;
}

let utilObjs = {
  generateImageURL: generateImageURL,
  getRangRandom: getRangRandom,
  Constants: Constants,
  rearRange: rearRange
};

export default Object.freeze(Object.assign({}, utilObjs));

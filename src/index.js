const fs = require('fs');

const path = './src/fixtures/testData.txt'; // text文件的路径
const data = fs.readFileSync(path, 'utf-8').toString();

function getWaitMoney(wait) {
  let waitMoney = 0;
  if (wait !== 0) {
    waitMoney = Math.ceil(wait) * 0.25;
  }
  return waitMoney;
}

// eslint-disable-next-line max-lines-per-function
// eslint-disable-next-line complexity
function getkilometreMoney(kilometre) {
  let money = 0;
  if (kilometre > 2 && kilometre <= 8) {
    money = Math.ceil(kilometre - 2) * 0.8 + 6;
  } else {
    money = Math.ceil(kilometre - 8) * 1.2 + 10.8;
  }
  return money;
}

function paresMoneyPay(kilometre, wait) {
  const waitMoney = getWaitMoney(wait);
  let kilometreMoney = 0;
  if (kilometre > 0 && kilometre <= 2) {
    kilometreMoney = 6;
  } else {
    kilometreMoney = getkilometreMoney(kilometre);
  }
  return `收费${Math.round(kilometreMoney + waitMoney)}元`;
}

function Taxi(info) {
  const newsInfo = info.split('\n');
  const receiptarr = newsInfo.map(item => {
    const parseInfo = item.match(/\d+(.\d+)?/g);
    return paresMoneyPay(Number(parseInfo[0]), Number(parseInfo[1]));
  });
  return `${receiptarr.join('\n')}\n`;
}

export default function main(testDataFile = data) {
  const receipt = Taxi(testDataFile);
  return receipt;
}

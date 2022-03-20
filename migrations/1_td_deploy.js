const Str = require("@supercharge/strings");
// const BigNumber = require('bignumber.js');

var TDErc20 = artifacts.require("ERC20TD.sol");
var ERC20 = artifacts.require("DummyToken.sol");
var evaluator = artifacts.require("Evaluator.sol");
var mineERC20 = artifacts.require("MineERC20.sol");
var uni = artifacts.require("./utils/IUniswapV2Factory.sol");
var exerciceSolution = artifacts.require("ExerciceSolution.sol");

module.exports = (deployer, network, accounts) => {
  deployer.then(async () => {
    await deployTDToken(deployer, network, accounts);
    await deployEvaluator(deployer, network, accounts);
    // await setPermissionsAndRandomValues(deployer, network, accounts);
    await deployRecap(deployer, network, accounts);
    await doTd(deployer, network, accounts);
  });
};

async function deployTDToken(deployer, network, accounts) {
  TDToken = await TDErc20.at("0xc2269af51350796aF4F6D52e4736Db3A885F28D6");
  dummyToken = await ERC20.at("0xbc3b69d1abD5A39f55a9Ba50C7a2aDd933952123");
  uniswapV2FactoryAddress = "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f";
  wethAddress = "0xc778417e063141139fce010982780140aa0cd5ab";
}

async function deployEvaluator(deployer, network, accounts) {
  Evaluator = await evaluator.at("0x89a2Faa44066e94CE6B6D82927b0bbbb8709eEd7");
}

// async function setPermissionsAndRandomValues(deployer, network, accounts) {
//   await TDToken.setTeacher(Evaluator.address, true);
//   randomSupplies = [];
//   randomTickers = [];
//   for (i = 0; i < 20; i++) {
//     randomSupplies.push(Math.floor(Math.random() * 1000000000));
//     randomTickers.push(Str.random(5));
//     // randomTickers.push(web3.utils.utf8ToBytes(Str.random(5)))
//     // randomTickers.push(Str.random(5))
//   }

//   console.log(randomTickers);
//   console.log(randomSupplies);
//   // console.log(web3.utils)
//   // console.log(type(Str.random(5)0)
//   await Evaluator.setRandomTickersAndSupply(randomSupplies, randomTickers);
// }

async function deployRecap(deployer, network, accounts) {
  console.log("TDToken " + TDToken.address);
  console.log("dummyToken " + dummyToken.address);
  console.log("Evaluator " + Evaluator.address);
}

//take another address from the deploy's address
account = "0x88E95624f03251970501Da6e3fA6f93F93B06890";

async function getBalanceTdToken(deployer, network, accounts) {
  let Balance = await TDToken.balanceOf(account);
  console.log("Balance : " + Balance);
}

async function deployMineERC20(deployer, network, accounts, ticker, supply) {
  MineERC20 = await mineERC20.new(ticker, ticker, supply);
  console.log("MineERC20 " + MineERC20.address);
}

async function deployExerciceSolutions(deployer, network, accounts, MineERC20) {
  ExerciceSolution = await exerciceSolution.new(MineERC20.address);
  console.log("ExerciceSolution " + ExerciceSolution.address);
}

async function doTd(deployer, network, accounts) {
  console.log("Stating Td Amm101...");
  await getBalanceTdToken(deployer, network, accounts);

  MineERC20 = await mineERC20.at("0xF1e4055693450e1A9f2f539E9ee3Ae959cCD0d43");

  //   console.log("-------Exercice1---------");
  //   await Evaluator.ex1_showIHaveTokens({ from: account });
  //   await getBalanceTdToken(deployer, network, accounts);

  //   console.log("-------Exercice2---------");
  //   await Evaluator.ex2_showIProvidedLiquidity({ from: account });
  //   await getBalanceTdToken(deployer, network, accounts);

  //   console.log("-------Exercice6a---------");
  //   await Evaluator.ex6a_getTickerAndSupply({ from: account });
  //   await getBalanceTdToken(deployer, network, accounts);
  //   const Ticker = await Evaluator.readTicker(account);
  //   const Supply = await Evaluator.readSupply(account);
  //   console.log("ticker :" + Ticker);
  //   console.log("supply :" + Supply);

  //   console.log("-------Exercice6b---------");
  //   await deployMineERC20(deployer, network, accounts, Ticker, Supply);
  //   await Evaluator.submitErc20(MineERC20.address, { from: account });
  //   await Evaluator.ex6b_testErc20TickerAndSupply({ from: account });
  //   await getBalanceTdToken(deployer, network, accounts);

  //   console.log("-------Exercice7---------");
  //   const uniswapV2Factory = await uni.at(
  //     "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f"
  //   );
  // const addressResult = await uniswapV2Factory.createPair(
  //   "0xF1e4055693450e1A9f2f539E9ee3Ae959cCD0d43",
  //   "0xc778417e063141139fce010982780140aa0cd5ab"
  // );
  // console.log(addressResult.address);

  //   await Evaluator.submitErc20("0xF1e4055693450e1A9f2f539E9ee3Ae959cCD0d43", {
  //     from: account,
  //   });

  //   await Evaluator.ex7_tokenIsTradableOnUniswap({ from: account });
  //   await getBalanceTdToken(deployer, network, accounts);

  //   const addressResult = await uniswapV2Factory.getPair(
  //     "0xc778417e063141139fce010982780140aa0cd5ab",
  //     "0xF1e4055693450e1A9f2f539E9ee3Ae959cCD0d43"
  //   );
  //   console.log(addressResult);

  // console.log("-------Exercice8---------");

  // //   await deployExerciceSolutions(deployer, network, accounts, MineERC20);
  // ExerciceSolution = await exerciceSolution.new(
  //   MineERC20.address,
  //   "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  //   {
  //     from: account,
  //   }
  // );
  // console.log("ExerciceSolution " + ExerciceSolution.address);

  // await MineERC20.approve(ExerciceSolution.address, "2000000000000000000000", {
  //   from: account,
  // });
  // await MineERC20.transfer(ExerciceSolution.address, "2000000000000000000000", {
  //   from: account,
  // });

  // await ExerciceSolution.swapYourTokenForEth({ from: account });

  // await Evaluator.submitExercice(ExerciceSolution.address, { from: account });
  // await Evaluator.ex8_contractCanSwapVsEth({ from: account });
  // await getBalanceTdToken(deployer, network, accounts);

  // console.log("-------Exercice9---------");

  // ExerciceSolution = await exerciceSolution.new(
  //   MineERC20.address,
  //   "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  //   { from: account }
  // );
  // console.log("ExerciceSolution " + ExerciceSolution.address);

  // await MineERC20.transfer(ExerciceSolution.address, "2000000000000000000000", {
  //   from: account,
  // });

  // await Evaluator.submitExercice(ExerciceSolution.address, { from: account });

  // // await ExerciceSolution.swapYourTokenForDummyToken();
  // await Evaluator.ex9_contractCanSwapVsDummyToken({ from: account });
  // await getBalanceTdToken(deployer, network, accounts);

  console.log("-------Exercice10---------");

  ExerciceSolution = await exerciceSolution.new(
    MineERC20.address,
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    { from: account, value: "1000000000000000" }
  );
  console.log("ExerciceSolution " + ExerciceSolution.address);

  await MineERC20.transfer(ExerciceSolution.address, "2000000000000000000000", {
    from: account,
  });

  // await Evaluator.submitExercice(ExerciceSolution.address, { from: account });

  await ExerciceSolution.swapYourTokenForEth();

  await ExerciceSolution.addLiquidity();
  // await Evaluator.ex9_contractCanSwapVsDummyToken({ from: account });
  // await getBalanceTdToken(deployer, network, accounts);
}

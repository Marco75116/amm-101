pragma solidity ^0.6.0;

import "./utils/IUniswapV2Router.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./MineERC20.sol";
import "./Token.sol";
import "./utils/IUniswapV2Factory.sol";

contract ExerciceSolution {
    IUniswapV2Router public uniswap_v2_router;
    address private constant weth = 0xc778417E063141139Fce010982780140Aa0cD5Ab;
    MineERC20 public mineErc20;

    constructor(MineERC20 _mineErc20, IUniswapV2Router _uniswapV2Router)
        public
        payable
    {
        mineErc20 = _mineErc20;
        uniswap_v2_router = _uniswapV2Router;
    }

    function swapYourTokenForEth() external {
        // mineErc20.transferFrom(msg.sender, address(this), 189 ether);
        mineErc20.approve(address(uniswap_v2_router), 10 ether);

        address[] memory path;
        path = new address[](2);
        path[0] = 0xF1e4055693450e1A9f2f539E9ee3Ae959cCD0d43;
        path[1] = weth;

        uniswap_v2_router.swapExactTokensForTokens(
            10 ether,
            10 wei,
            path,
            address(this),
            block.timestamp
        );
    }

    function swapYourTokenForDummyToken() external {
        mineErc20.approve(address(uniswap_v2_router), 10 ether);

        address[] memory path;
        path = new address[](3);
        path[0] = 0xF1e4055693450e1A9f2f539E9ee3Ae959cCD0d43;
        path[1] = weth;
        path[2] = 0xbc3b69d1abD5A39f55a9Ba50C7a2aDd933952123;
        uniswap_v2_router.swapExactTokensForTokens(
            1000 wei,
            10 wei,
            path,
            address(this),
            block.timestamp
        );
    }

    function addLiquidityReverted() external {
        mineErc20.approve(address(uniswap_v2_router), 10000 ether);

        uniswap_v2_router.addLiquidityETH(
            address(mineErc20),
            1 ether,
            1,
            1,
            address(this),
            block.timestamp
        );
    }

    function addLiquidity() external {
        Token token = Token(weth);
        token.approve(address(uniswap_v2_router), 100 ether);
        mineErc20.approve(address(uniswap_v2_router), 10000 ether);

        uniswap_v2_router.addLiquidity(
            address(mineErc20),
            weth,
            92 ether,
            0.05 ether,
            1,
            1,
            address(this),
            block.timestamp
        );
    }

    event Log(string description, uint256 amount);

    function withdrawLiquidity() external {
        IUniswapV2Factory factory = IUniswapV2Factory(
            0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f
        );
        address pair = factory.getPair(address(mineErc20), weth);
        Token lpToken = Token(pair);
        uint256 liquidity = lpToken.balanceOf(address(this));
        lpToken.approve(address(uniswap_v2_router), liquidity);

        (uint256 amountA, uint256 amountB) = uniswap_v2_router.removeLiquidity(
            address(mineErc20),
            weth,
            liquidity,
            1,
            1,
            address(this),
            block.timestamp
        );

        // test
        emit Log("amountA", amountA);
        emit Log("amountB", amountB);
    }

    function withdrawLiquiditydeux() external {
        (uint256 amountA, uint256 amountB) = uniswap_v2_router
            .removeLiquidityETH(
                address(mineErc20),
                0.001 ether,
                1,
                1,
                address(this),
                block.timestamp
            );

        // test
        emit Log("amountA", amountA);
        emit Log("amountB", amountB);
    }
}

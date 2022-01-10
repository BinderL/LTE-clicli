const amount2 = (amount) => {
	const _amount = amount[1];
	if(!_amount)
		return amount[0];
	return _amount;
}

const liquidity = async function (arg){
	const _account = arg.account;
	const _factory = arg.factory;
	const _token1 = arg.token1;
	const _token2 = arg.token2;
	const _amount1 = arg.BN(arg.amount[0].toString(),"ether").toString();
	const PairAddr = await _factory.getPair(_token1.address, _token2.address);
	await _token1.transfer(PairAddr, _amount1);
	await _token2.transfer(PairAddr, arg.BN(amount2(arg.amount).toString(),"ether"),{from:_account});
	const pair = await arg.Pair.at(PairAddr);
	await pair.mint(_account);
	return pair;
}

const mint = async (arg) => {
	const _account = arg.account;
	const _token = arg.token;
	const _wMatic = arg.wMatic;
	const _amount = arg.BN(arg.amount.toString(),"ether");
	if(arg.wMatic)
		await _wMatic.deposit({value:_amount});
	if(arg.token)
		await _token.mint(_account, _amount);
}
module.exports = {liquidity, mint};



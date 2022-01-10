




const run = async (pub, account, trigger, n) => {
	if (trigger<n){
		await pub({
			method: "evm_mine",
			params: [],
			from: account
		});
		trigger++;
		await run(pub, account, trigger, n);
	}
}

module.exports = {run};

/**
 * RAM이 8GB인 개인서버를 자동으로 구매해주는 프로그램입니다.
 * 이 코드는 공식 문서에서 제공하는 코드입니다. :)
 */

/** @param {NS} ns */
export async function main(ns) {
	// How much RAM each purchase server will have
	const ram = 8;

	let i = 0;
	// Continuously try to purchase severs untill we've reach the maximum
	// amount of servers
	while (i < ns.getPurchasedServerLimit()){
		if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)){
			let hostname = ns.purchaseServer("pserv-" + i, ram);
			ns.scp("early-hack-template.js", hostname)
			ns.exec("early-hack-template.js", hostname, 3);
			i++;
		}
	await ns.sleep(1000);
	}
}
/**
 * 구매된 모든 개인 서버의 RAM을 128GB 업그레이드 하는 코드입니다.
 * 업그레이드 후, 128GB에서 최대 스레드의 early-hack-template를 실행합니다.
*/

/** @param {NS} ns */
export async function main(ns) {

	const ram = 128;

	for (let i = 0; i<25; i++){
		
		let hostname = "pserv-" + i;

		if (ns.getServerMoneyAvailable("home") < ns.getPurchasedServerUpgradeCost(hostname, ram))
			break;
			
		ns.upgradePurchasedServer(hostname, ram);
		ns.killall(hostname);
		ns.exec("early-hack-template.js", hostname, 3*(ram/8));
	}
}
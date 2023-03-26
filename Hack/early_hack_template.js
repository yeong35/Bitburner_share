/**
 * 가장 기초적인 해킹하는 코드입니다.
 * 각 서버에서 이 프로그램을 실행할 시, 프로그램이 종료되지 않는 한 돈을 벌 수 있습니다.
 * 
 * 이 코드는 공식 문서에서 제공하는 코드입니다 :)
 */

/** @param {NS} ns */
export async function main(ns) {
    
	const target = 'n00dles'
	const moneyThresh = ns.getServerMaxMoney(target) * 0.75;
	const securityThresh = ns.getServerMinSecurityLevel(target) + 5;

	// if we have the BruteSSH.exe program, use it to open SSH Port
	// the target server
	if (ns.fileExists("BruteSSH.exe", "home")){
		ns.brutessh(target);
	}
	
	ns.nuke(target);

	while(true){
		if (ns.getServerSecurityLevel(target) > securityThresh)
			await ns.weaken(target);
		else if (ns.getServerMoneyAvailable(target) < moneyThresh)
			await ns.grow(target);
		else
			await ns.hack(target);
	}
}
/**
 * 각 서버기 해킹할 수 있는 환경인지 확인하고,
 * 해킹할 수 있다면(각 port를 열 수 있다면) 해킹 후 프로그램을 돌린다.
 */
const runProgramOnEachServer = (ns, serverName) => {
	let serverPort = ns.getServerNumPortsRequired(serverName);
	let serverRam = ns.getServerMaxRam(serverName);

	ns.scp("early-hack-template.js", serverName);

	switch(serverPort){
		case 5:
			if(!ns.fileExists('SQLInject.exe'))
				break;
			ns.sqlinject(serverName);
		case 4:
			if(!ns.fileExists('HTTPWorm.exe'))
				break;
			ns.httpworm(serverName);
		case 3:
			if(!ns.fileExists('relaySMTP.exe'))
				break;
			ns.relaysmtp(serverName);
		case 2:
			if(!ns.fileExists('FTPCrack.exe'))
				break;
			ns.ftpcrack(serverName);
		case 1:
			if(!ns.fileExists('BruteSSH.exe'))
				break;
			ns.brutessh(serverName);
		default:
			ns.nuke(serverName);
			let thread = parseInt(serverRam/2.6)
			if (thread != 0)
				ns.exec("early-hack-template.js", serverName, thread);		
	}
}

/*
	전체 서버 네트워크를 순회하는 함수
	순회하면서 각 서버에 코드를 돌릴 수 있다면 NUKE(해킹)후 프로그램을 돌린다.
*/
const findPath = (ns, serverName, serverList, ignore) => {
	ignore.push(serverName);

	let scanResults = ns.scan(serverName);
    runProgramOnEachServer(ns, serverName);

	for (let server of scanResults){

		// 현재 서버가 ignores에 있으면 다음 서버 확인
		if (ignore.includes(server))
			continue;

		serverList.push(server);
		findPath(ns, server, serverList, ignore);
		serverList.pop();
	}
}

/**
 * 전체 서버에서 해킹할 수 있는 서버를 모두 확인한 후 해킹을 진행한다.
 * 진행한 후에 각 서버 RAM에 따라 가장 많은 early_hack_termplate을 실행한다. 
 */
/** @param {NS} ns */
export async function main(ns) {
	let startServer = ns.getHostname();
	findPath(ns, startServer, [], []);
}
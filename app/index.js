let x = 1;
module.exports = function(req, res) {
	res.writeHead(201, { 'Content-Type': 'text/plain' });
	res.write(`response for task ${x}\n`);
	res.end();
	
	// here we simulate async work
	setTimeout(() => {
		
		console.log(`task ${x} done\n`);
	}, x * 10000)
	
}
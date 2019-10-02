(function() {
	'use strict';

	const canvas = document.querySelector("#jsCanvas");
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;
	const ctx = canvas.getContext('2d');
	const form = document.querySelector(".jsForm");
	const input = document.querySelector("#jsInput");
	const clrBtn = document.querySelector("#jsClearBtn");

	let list = [];

	class Rect {
	};

	const clearCanvas = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	const drawGraph = function(list, widthRatio, heightRatio, barWidthRatio) {
		clearCanvas();

		const barNum = list.length;
		const graphWidth = (canvas.width * widthRatio) / barNum;
		const barWidth = graphWidth * barWidthRatio;
		const graphHeight = canvas.height * heightRatio;

		const leftBottom = [ canvas.width * ((1 - widthRatio)/2),
							canvas.height * ((1 + heightRatio)/2) ];

		ctx.fillStyle = 'black';
		for (let i=0; i<barNum; ++i) {
			ctx.fillRect(leftBottom[0] + (graphWidth*i), leftBottom[1] - (graphHeight*((i+1)/barNum)),
							barWidth, graphHeight*((list[i]+1)/barNum));
		}
	};

	const initList = function(event) {
		event.preventDefault();

		const num = input.value;
		if ( !Number.isInteger(Number(num)) ) {
			alert("Only Integer is allowed");
			return;
		}

		const tmpList = [];
		for (let i = 0; i < num; ++i)
			tmpList[i] = i;
		list = tmpList;

		clearCanvas();
		drawGraph(list, 0.7, 0.7, 0.3);
	};

	const shuffleList = function(list) {
		for (let i = 1; i < list.length; ++i) {
			const randomIdx = Math.floor(Math.random() * (i+1));

			const tmp = list[i];
			list[i] = list[randomIdx];
			list[randomIdx] = tmp;
		}
	};

	// main
	(function() {
		if (form)	{ form.addEventListener("submit", initList); }
		if (clrBtn)	{ clrBtn.addEventListener("click", clearCanvas); }

	})();
})();

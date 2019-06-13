import '../page-setup/page-setup.js';
import '../page-solution/page-solution.js';

import solve from '/solve.js';

const template = document.createElement('template');
template.innerHTML = require('./app.html');

export class App extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this._el = this.shadowRoot.querySelector('div');
		this._el_pageSetup = document.createElement('m-page-setup');
		this._el_pageSolution = document.createElement('m-page-solution');
		this._el.appendChild(this._el_pageSetup);
		
		
		
		// // debugging
		// this._el.appendChild(this._el_pageSolution);
		// let solution = ["x3", "y1", "U1", "R1", "F3", "R2"];//, "U2", "F1", "U3", "F3", "L2"];
		// let po =  {
		// 	o: [2, 1, 1, 2, 0, 0, 0, 0],
		// 	p: [2, 7, 0, 5, 3, 6, 1, 4]
		// };
		// this._el_pageSolution.solution = solution;
		// this._el_pageSolution.po = po;
		// // debugging end



		// attach events
		this._el_pageSetup.addEventListener('solve', evt => {
			let po = evt.detail;

			let data = solve(po.p, po.o);
			let solution = data.normalize.concat(data.solution);

			this._el.replaceChild(this._el_pageSolution, this._el_pageSetup);

			console.log(solution)
			console.log(po);
			this._el_pageSolution.solution = solution;
			this._el_pageSolution.po = po;
		});

		this._el_pageSolution.addEventListener('back', evt => {
			this._el.replaceChild(this._el_pageSetup, this._el_pageSolution);
		});
	}
}

customElements.define('m-app', App);

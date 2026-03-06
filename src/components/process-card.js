class ProcessCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const step = this.getAttribute('step') || '1';
        const title = this.getAttribute('title') || 'Title';
        const description = this.getAttribute('description') || 'Description';

        if (!document.getElementById('process-card-style')) {
            const style = document.createElement('style');
            style.id = 'process-card-style';
            style.textContent = `
                process-card .card {
                    position: relative;
                    overflow: hidden;
                }
                process-card .card > * {
                    position: relative;
                    z-index: 2;
                }
                process-card .card p, 
                process-card .card h3 {
                    transition: color 0.4s ease;
                }
                process-card .card:hover p, 
                process-card .card:hover h3 {
                    color: #ffffff; 
                }
                
                process-card .liquid {
                    position: absolute;
                    width: 800px; 
                    height: 800px;
                    background-color: #0b111e;
                    top: -850px;
                    left: -850px;
                    border-radius: 40%;
                    animation: process-liquid-spin 5s linear infinite;
                    transition: top 0.8s ease-in-out, left 0.8s ease-in-out;
                    z-index: 1;
                    pointer-events: none;
                }
                process-card .liquid::after {
                    content: '';
                    position: absolute;
                    top: 5%;
                    left: 5%;
                    width: 90%;
                    height: 90%;
                    background-color: #1e293b;
                    border-radius: 45%;
                    animation: process-liquid-spin 7s linear infinite reverse;
                }
                process-card .card:hover .liquid {
                    top: -200px; 
                    left: -200px;
                }
                @keyframes process-liquid-spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        this.innerHTML = `
            <div class="card bg-white p-6 border border-slate-100 rounded-2xl shadow-sm text-center md:text-left h-full group transition-all">
                <div class="step-num w-12 h-12 bg-white border-2 border-primary text-primary transition-colors rounded-xl flex items-center justify-center font-bold text-xl mb-4 mx-auto md:mx-0 relative z-[2] group-hover:bg-white group-hover:text-primary">
                    ${step}
                </div>
                <h3 class="font-display font-bold text-lg text-primary mb-2 relative z-[2]">${title}</h3>
                <p class="text-slate-600 text-sm relative z-[2]">${description}</p>
                <div class="liquid"></div>
            </div>
        `;
    }
}

customElements.define('process-card', ProcessCard);

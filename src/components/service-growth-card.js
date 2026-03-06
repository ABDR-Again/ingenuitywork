class ServiceGrowthCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const title = this.getAttribute('title') || 'Service';
        const description = this.getAttribute('description') || 'Description';
        const icon = this.getAttribute('icon') || 'web';
        const url = this.getAttribute('url') || '#';
        const gradient = this.getAttribute('gradient') || 'from-blue-50 to-indigo-100';

        if (!document.getElementById('service-growth-card-style')) {
            const style = document.createElement('style');
            style.id = 'service-growth-card-style';
            style.textContent = `
                service-growth-card .card {
                    position: relative;
                    overflow: hidden;
                    display: flex;
                }
                service-growth-card .card > * {
                    position: relative;
                    z-index: 2;
                }
                service-growth-card .card p, 
                service-growth-card .card h3,
                service-growth-card .card .more-text {
                    transition: color 0.4s ease;
                }
                service-growth-card .card:hover p, 
                service-growth-card .card:hover h3,
                service-growth-card .card:hover .more-text {
                    color: #ffffff; 
                }
                
                service-growth-card .liquid {
                    position: absolute;
                    width: 800px; 
                    height: 800px;
                    background-color: #0b111e;
                    top: -850px;
                    left: -850px;
                    border-radius: 40%;
                    animation: service-liquid-spin 5s linear infinite;
                    transition: top 0.8s ease-in-out, left 0.8s ease-in-out;
                    z-index: 1;
                    pointer-events: none;
                }
                service-growth-card .liquid::after {
                    content: '';
                    position: absolute;
                    top: 5%;
                    left: 5%;
                    width: 90%;
                    height: 90%;
                    background-color: #1e293b;
                    border-radius: 45%;
                    animation: service-liquid-spin 7s linear infinite reverse;
                }
                service-growth-card .card:hover .liquid {
                    top: -200px; 
                    left: -200px;
                }
                @keyframes service-liquid-spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        this.innerHTML = `
            <a href="${url}" class="card service-card bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-md transition-shadow no-underline text-left block">
                <div class="h-48 rounded-xl bg-slate-100 mb-6 overflow-hidden relative z-[2]">
                    <div class="absolute inset-0 bg-gradient-to-tr ${gradient}"></div>
                    <div class="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-sm z-[3]">
                        <span class="material-symbols-outlined text-primary">${icon}</span>
                    </div>
                </div>
                <h3 class="font-display font-bold text-xl text-primary mb-2 relative z-[2]">${title}</h3>
                <p class="text-slate-600 text-sm mb-6 flex-grow relative z-[2]">${description}</p>
                <div class="more-text text-primary font-semibold text-sm flex items-center gap-1 transition-all relative z-[2]">
                    Learn More <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
                <div class="liquid"></div>
            </a>
        `;
    }
}

customElements.define('service-growth-card', ServiceGrowthCard);

class WhyChooseUsCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const icon = this.getAttribute('icon') || 'star';
        const title = this.getAttribute('title') || 'Title';
        const description = this.getAttribute('description') || 'Description';

        // Add styles unique to this component only once globally
        if (!document.getElementById('why-choose-us-card-style')) {
            const style = document.createElement('style');
            style.id = 'why-choose-us-card-style';
            style.textContent = `
                /* --- CORE CARD SETUP --- */
                why-choose-us-card .card {
                    position: relative;
                    overflow: hidden; /* Keeps the liquid from spilling outside the card */
                }
                
                /* Ensures all text/images stay above the dark liquid */
                why-choose-us-card .card > * {
                    position: relative;
                    z-index: 2;
                }
                
                why-choose-us-card .card p, 
                why-choose-us-card .card h3,
                why-choose-us-card .card span {
                    transition: color 0.4s ease, border-color 0.4s ease, background-color 0.4s ease;
                }
                
                why-choose-us-card .card:hover p, 
                why-choose-us-card .card:hover h3,
                why-choose-us-card .card:hover .material-symbols-outlined {
                    color: #ffffff; 
                }

                why-choose-us-card .card:hover .icon-box {
                    background-color: rgba(255,255,255,0.1);
                    border-color: rgba(255,255,255,0.2);
                }
                
                /* --- THE LIQUID ANIMATION --- */
                why-choose-us-card .liquid {
                    position: absolute;
                    width: 800px; 
                    height: 800px;
                    background-color: #0b111e; /* Match primary brand color */
                    top: -850px;
                    left: -850px;
                    border-radius: 40%;
                    animation: card-liquid-spin 5s linear infinite;
                    transition: top 0.8s ease-in-out, left 0.8s ease-in-out;
                    z-index: 1;
                    pointer-events: none; /* Prevents the liquid from stealing clicks */
                }
                
                /* The second layer for depth */
                why-choose-us-card .liquid::after {
                    content: '';
                    position: absolute;
                    top: 5%;
                    left: 5%;
                    width: 90%;
                    height: 90%;
                    background-color: #1e293b; /* A slightly darker shade, surface-dark */
                    border-radius: 45%;
                    animation: card-liquid-spin 7s linear infinite reverse;
                }
                
                /* The hover trigger that pulls the liquid down */
                why-choose-us-card .card:hover .liquid {
                    top: -200px; 
                    left: -200px;
                }
                
                /* The spinning keyframes that create the wobbly edge */
                @keyframes card-liquid-spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        this.innerHTML = `
            <div class="card wcu-card p-8 rounded-2xl bg-surface-light border border-slate-100 transition-all group h-full">
                <div class="icon-box w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform relative z-[2]">
                    <span class="material-symbols-outlined">${icon}</span>
                </div>
                <h3 class="font-display font-bold text-xl text-primary mb-3 relative z-[2]">${title}</h3>
                <p class="text-slate-600 relative z-[2]">${description}</p>
                <div class="liquid"></div>
            </div>
        `;
    }
}

customElements.define('why-choose-us-card', WhyChooseUsCard);

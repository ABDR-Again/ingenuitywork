class TestimonialCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const clientName = this.getAttribute('client-name') || 'Client Name';
        const clientRole = this.getAttribute('client-role') || 'Role, Company';
        const avatarUrl = this.getAttribute('avatar-url') || 'https://i.pravatar.cc/150';
        const quote = this.getAttribute('quote') || 'This is a great testimonial.';
        
        // Randomize the liquid color slightly to add variety as requested
        const colors = [
            { main: 'bg-indigo-500', alt: 'bg-indigo-600', text: 'text-indigo-500' }, 
            { main: 'bg-blue-500', alt: 'bg-blue-600', text: 'text-blue-500' }, 
            { main: 'bg-sky-500', alt: 'bg-sky-600', text: 'text-sky-500' }, 
            { main: 'bg-violet-500', alt: 'bg-violet-600', text: 'text-violet-500' }, 
            { main: 'bg-fuchsia-500', alt: 'bg-fuchsia-600', text: 'text-fuchsia-500' }
        ];
        
        const forceColorParam = this.getAttribute('color-index');
        let selectedColor;
        if (forceColorParam !== null && !isNaN(parseInt(forceColorParam))) {
            selectedColor = colors[parseInt(forceColorParam) % colors.length];
        } else {
            selectedColor = colors[Math.floor(Math.random() * colors.length)];
        }

        if (!document.getElementById('testimonial-card-style')) {
            const style = document.createElement('style');
            style.id = 'testimonial-card-style';
            style.textContent = `
                /* --- BASE CARD STYLES & ENTRY ANIMATION --- */
                testimonial-card .card {
                    /* Required dimensions as requested */
                    width: 350px;
                    height: 400px; 
                    
                    position: relative;
                    overflow: hidden; /* Crucial: Keeps liquid and ripple inside */
                    cursor: pointer;
                    
                    /* Ensure content stays above the liquid */
                    z-index: 2; 

                    /* Initial state for entry animation */
                    opacity: 0;
                    transform: perspective(1000px) translateY(50px) rotateX(-10deg);
                    transition: 
                        transform 0.1s ease-out, /* Fast transition for JS 3D tilt */
                        opacity 0.8s ease-out;   /* Slow transition for initial entry */

                    background: #0a0e17;
                    border-radius: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                    margin: 15px;
                }

                /* State when JS adds the 'appear' class on page load */
                testimonial-card .card.appear {
                    opacity: 1;
                    transform: perspective(1000px) translateY(0) rotateX(0deg);
                }

                /* Ensure all child elements (text, images) sit above the liquid */
                testimonial-card .card > *:not(.liquid):not(.liquid-alt):not(.ripple) {
                    position: relative;
                    z-index: 2;
                }

                testimonial-card .card-content {
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    transition: color 0.4s ease;
                    color: #e0e6ed;
                    height: 100%;
                    box-sizing: border-box;
                }
                
                testimonial-card .card:hover .card-content {
                    color: #ffffff;
                }

                /* --- Avatar --- */
                testimonial-card .avatar-container {
                    position: relative;
                    width: 80px;
                    height: 80px;
                    margin-bottom: 20px;
                }
                
                testimonial-card .avatar-img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid rgba(255, 255, 255, 0.08);
                    transition: border-color 0.4s ease;
                }
                
                testimonial-card .card:hover .avatar-img {
                    border-color: rgba(255, 255, 255, 0.5);
                }

                /* --- Quote Icon --- */
                testimonial-card .quote-icon {
                    font-size: 50px;
                    line-height: 1;
                    margin-bottom: 10px;
                    opacity: 0.6;
                    transition: color 0.4s ease, transform 0.4s ease;
                    font-family: serif;
                }
                
                testimonial-card .card:hover .quote-icon {
                    color: #ffffff !important;
                    transform: translateY(-5px);
                }

                /* --- Text --- */
                testimonial-card .testimonial-text {
                    font-size: 15px;
                    font-weight: 300;
                    line-height: 1.6;
                    margin-bottom: 25px;
                    font-style: italic;
                    flex-grow: 1;
                }
                
                testimonial-card .client-name {
                    font-weight: 700;
                    font-size: 16px;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    margin: 0;
                }
                
                testimonial-card .client-role {
                    font-size: 13px;
                    color: #94a3b8;
                    font-weight: 400;
                    transition: color 0.4s ease;
                    margin: 5px 0 0 0;
                }
                
                testimonial-card .card:hover .client-role {
                    color: rgba(255, 255, 255, 0.8);
                }

                /* --- THE LIQUID HOVER EFFECT --- */
                testimonial-card .liquid, testimonial-card .liquid-alt {
                    position: absolute;
                    width: 900px; 
                    height: 900px;
                    top: -950px;
                    left: -950px;
                    border-radius: 40%;
                    animation: testimonial-spin 6s linear infinite;
                    transition: top 1s ease-in-out, left 1s ease-in-out;
                    z-index: 1;
                    pointer-events: none; 
                }

                testimonial-card .liquid-alt {
                    width: 810px; /* 90% */
                    height: 810px;
                    top: -855px; /* offset slightly to center inside liquid */
                    left: -855px;
                    border-radius: 42%;
                    animation: testimonial-spin 8s linear infinite reverse;
                }

                /* Trigger liquid on hover */
                testimonial-card .card:hover .liquid {
                    top: -250px; 
                    left: -250px;
                }
                testimonial-card .card:hover .liquid-alt {
                    top: -205px; 
                    left: -205px;
                }

                /* --- CLICK RIPPLE EFFECT --- */
                testimonial-card .ripple {
                    position: absolute;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: testimonial-ripple-animation 0.6s linear;
                    pointer-events: none;
                    z-index: 3; 
                }

                /* --- KEYFRAMES --- */
                @keyframes testimonial-spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @keyframes testimonial-ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                /* Layout for the container of these cards */
                .testimonials-grid {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 20px;
                    padding: 20px 0;
                }
            `;
            document.head.appendChild(style);
        }

        // Apply specific color to this instance
        const liquidColorClass = selectedColor.main;
        const liquidColorAltClass = selectedColor.alt;
        const textColorClass = selectedColor.text;

        this.innerHTML = `
            <div class="card bg-primary rounded-3xl border border-white/10 shadow-xl m-4 w-[350px] h-[400px]">
                <div class="liquid ${liquidColorClass}"></div>
                <div class="liquid-alt ${liquidColorAltClass}"></div>
                
                <div class="card-content">
                    <div class="avatar-container relative w-20 h-20 mb-5">
                        <img src="${avatarUrl}" alt="${clientName}" class="avatar-img w-full h-full rounded-full object-cover border-[3px] border-white/10 transition-colors duration-400 hover:border-white/50">
                    </div>
                    <div class="quote-icon ${textColorClass} text-[50px] leading-none mb-2 opacity-60 transition-all duration-400 font-serif">“</div>
                    <p class="testimonial-text text-[15px] font-light leading-relaxed mb-6 italic flex-grow text-slate-200">"${quote}"</p>
                    <h3 class="client-name font-bold text-[16px] tracking-wide uppercase m-0 text-white">${clientName}</h3>
                    <p class="client-role text-[13px] text-slate-400 font-normal transition-colors duration-400 mt-1 hover:text-white/80">${clientRole}</p>
                </div>
            </div>
        `;

        // -------------------------
        // JS Logic (Tilt & Ripple)
        // -------------------------
        const cardEl = this.querySelector('.card');

        // 2. 3D Tilt Hover Effect
        cardEl.addEventListener('mousemove', (e) => {
            const cardRect = cardEl.getBoundingClientRect();
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            
            const centerX = cardRect.left + cardWidth / 2;
            const centerY = cardRect.top + cardHeight / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateX = (+mouseY / (cardHeight / 2)) * -10; 
            const rotateY = (+mouseX / (cardWidth / 2)) * 10;  
            
            cardEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        cardEl.addEventListener('mouseleave', () => {
            if(cardEl.classList.contains('appear')) {
                cardEl.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
            } else {
                 cardEl.style.transform = `perspective(1000px) translateY(50px) rotateX(-10deg)`;
            }
        });

        // 3. Click Ripple Effect
        cardEl.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const d = Math.max(this.clientWidth, this.clientHeight);
            ripple.style.width = ripple.style.height = d + 'px';

            const rect = this.getBoundingClientRect();
            ripple.style.left = e.clientX - rect.left - d/2 + 'px';
            ripple.style.top = e.clientY - rect.top - d/2 + 'px';

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
}

customElements.define('testimonial-card', TestimonialCard);

document.addEventListener('DOMContentLoaded', function() {
    // Fade in the main content
    const container = document.querySelector('.container');
    container.style.opacity = 0;
    fadeIn(container, 1000);

    // Add hover effect to QR code
    const qrCode = document.querySelector('.qr-code');
    qrCode.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
    });
    qrCode.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });

});

function fadeIn(element, duration) {
    let opacity = 0;
    const interval = 50;
    const gap = interval / duration;

    function animate() {
        opacity += gap;
        element.style.opacity = opacity;

        if (opacity >= 1) {
            clearInterval(fading);
        }
    }

    const fading = setInterval(animate, interval);
}

function typeWriter(element, text, speed) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Particle Background 

function createParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5
        });
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.x += particle.dx;
            particle.y += particle.dy;

            if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
        });
    }

    animate();
}

createParticleBackground();

// Tilt effect on card
const card = document.querySelector('.card');

card.addEventListener('mousemove', tiltCard);
card.addEventListener('mouseleave', resetTilt);

function tiltCard(e) {
    const cardRect = this.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;
    
    const rotateX = (mouseY / cardRect.height) * 20;
    const rotateY = -(mouseX / cardRect.width) * 20;

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function resetTilt() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
}




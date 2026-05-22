document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("billing-toggle");
    const priceElements = document.querySelectorAll(".price-val");
    
    // Elementos da Modal
    const modal = document.getElementById("package-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalPrice = document.getElementById("modal-price");
    const modalFeatures = document.getElementById("modal-features");
    const closeButton = document.querySelector(".close-button");

    // 1. Lógica do Switch Mensal / Anual
    toggle.addEventListener("change", () => {
        const isAnnual = toggle.checked;
        priceElements.forEach(el => {
            const targetPrice = isAnnual ? el.getAttribute("data-annual") : el.getAttribute("data-monthly");
            el.style.opacity = 0;
            setTimeout(() => {
                el.textContent = targetPrice;
                el.style.opacity = 1;
            }, 150);
        });
    });

    // 2. Lógica Dinâmica da Modal (Ver Pacote)
    const actionButtons = document.querySelectorAll(".card .btn");

    actionButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            
            const title = card.querySelector("h3").innerText;
            const price = card.querySelector(".price").innerText;
            const features = card.querySelectorAll("ul li");

            modalTitle.innerText = `Plano ${title}`;
            modalPrice.innerText = price;
            
            modalFeatures.innerHTML = "";
            features.forEach(feature => {
                const li = document.createElement("li");
                li.innerText = feature.innerText;
                modalFeatures.appendChild(li);
            });

            modal.classList.add("show");
        });
    });

    closeButton.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });

    // 3. Efeito Dinâmico de Inclinação 3D
    const cards = document.querySelectorAll(".card, .modal-content");
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const cardRect = card.getBoundingClientRect();
            const mouseX = e.clientX - (cardRect.left + cardRect.width / 2);
            const mouseY = e.clientY - (cardRect.top + cardRect.height / 2);
            
            const rotateX = ((mouseY / cardRect.height) * -10).toFixed(2);
            const rotateY = ((mouseX / cardRect.width) * 10).toFixed(2);

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
            card.style.transition = "transform 0.5s ease";
        });

        card.addEventListener("mouseenter", () => {
            card.style.transition = "none";
        });
    });
});
// Mobile menu functionality
document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const mobileMenu = document.querySelector(".mobile-menu")
    let mobileMenuOpen = false

    mobileMenuBtn.addEventListener("click", () => {
        mobileMenuOpen = !mobileMenuOpen
        if (mobileMenuOpen) {
            mobileMenu.style.display = "flex"
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>'
        } else {
            mobileMenu.style.display = "none"
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
        }
    })

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll(".mobile-menu a")
    mobileMenuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.style.display = "none"
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
            mobileMenuOpen = false
        })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
        if (mobileMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.style.display = "none"
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
            mobileMenuOpen = false
        }
    })
})

// Copy account number functionality
function copyAccount(accountNumber, bankName) {
    navigator.clipboard
        .writeText(accountNumber)
        .then(() => {
            showCopyNotification(`Número de cuenta de ${bankName} copiado`)

            // Find the button that was clicked and show visual feedback
            const buttons = document.querySelectorAll(".copy-btn")
            buttons.forEach((btn) => {
                if (btn.onclick && btn.onclick.toString().includes(accountNumber)) {
                    btn.classList.add("copied")
                    btn.innerHTML = '<i class="fas fa-check"></i>'

                    setTimeout(() => {
                        btn.classList.remove("copied")
                        btn.innerHTML = '<i class="fas fa-copy"></i>'
                    }, 2000)
                }
            })
        })
        .catch((err) => {
            console.error("Error copying to clipboard: ", err)
                // Fallback for older browsers
            const textArea = document.createElement("textarea")
            textArea.value = accountNumber
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand("copy")
            document.body.removeChild(textArea)
            showCopyNotification(`Número de cuenta de ${bankName} copiado`)
        })
}

// Show copy notification
function showCopyNotification(message) {
    const notification = document.getElementById("copyNotification")
    const messageSpan = notification.querySelector("span")
    messageSpan.textContent = message

    notification.classList.add("show")

    setTimeout(() => {
        notification.classList.remove("show")
    }, 3000)
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
            const headerHeight = document.querySelector(".header").offsetHeight
            const targetPosition = target.offsetTop - headerHeight - 20

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            })
        }
    })
})

// Contact form functionality
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const nombre = formData.get("nombre");
    const apellido = formData.get("apellido");
    const email = formData.get("email");
    const telefono = formData.get("telefono");
    const mensaje = formData.get("mensaje");

    const numeroWhatsApp = "573108853158"; // ← Tu número real
    const texto = `Hola, soy ${nombre} ${apellido}.\n\nMi correo es: ${email}\nMi teléfono: ${telefono}\n\nMensaje:\n${mensaje}`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible")
        }
    })
}, observerOptions)

// Add fade-in animation to sections
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section")
    sections.forEach((section) => {
        section.classList.add("fade-in")
        observer.observe(section)
    })
})

// Header scroll effect
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header")
    if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.95)"
        header.style.backdropFilter = "blur(10px)"
    } else {
        header.style.background = "white"
        header.style.backdropFilter = "none"
    }
})

// Donation button click tracking
document.querySelectorAll('a[href="#donaciones"]').forEach((btn) => {
    btn.addEventListener("click", () => {
        // You can add analytics tracking here
        console.log("Donation button clicked")
    })
})

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
        // Verifica si ya está cargada (por caché)
        if (img.complete) {
            img.style.opacity = "1"
        } else {
            img.style.opacity = "0"
            img.style.transition = "opacity 0.3s ease"
            img.addEventListener("load", function() {
                this.style.opacity = "1"
            })
        }
    })
})


// Keyboard navigation support
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        // Close mobile menu if open
        const mobileMenu = document.querySelector(".mobile-menu")
        const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
        if (mobileMenu.style.display === "flex") {
            mobileMenu.style.display = "none"
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
        }
    }
})

// Add focus styles for accessibility
document.addEventListener("DOMContentLoaded", () => {
    const focusableElements = document.querySelectorAll("a, button, input, textarea, select")
    focusableElements.forEach((element) => {
        element.addEventListener("focus", function() {
            this.style.outline = "2px solid #ea580c"
            this.style.outlineOffset = "2px"
        })

        element.addEventListener("blur", function() {
            this.style.outline = "none"
        })
    })
})

// Performance optimization: Lazy loading for images
if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target
                if (img.dataset.src) {
                    img.src = img.dataset.src
                    img.removeAttribute("data-src")
                    imageObserver.unobserve(img)
                }
            }
        })
    })

    // Apply lazy loading to images that have data-src attribute
    document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img)
    })
}

// Add print styles support
window.addEventListener("beforeprint", () => {
    document.body.classList.add("printing")
})

window.addEventListener("afterprint", () => {
    document.body.classList.remove("printing")
})
/**
 * PROJETS DATA
 * C'est ici que vous pouvez facilement ajouter, modifier ou supprimer vos projets.
 * Pour ajouter un nouveau projet, copiez un bloc et modifiez ses valeurs.
 */
const projects = [
    {
        title: "Plateforme d'Analyse Intelligente",
        description: "Analyse de données avec interface graphique et web. Plateforme permettant l'exploration et la visualisation de données de manière intuitive.",
        technologies: ["Python 3", "Django", "Tkinter", "HTML/CSS/JS"],
        icon: "fa-chart-network"
    },
    {
        title: "Gestion des Absences et Notes",
        description: "Application full-stack de gestion scolaire. Permet le suivi complet des élèves, des absences et la génération de bulletins.",
        technologies: ["React", "Node.js", "HTML/CSS/JS"],
        icon: "fa-school"
    },
    {
        title: "Plateforme de Vente Immobilière",
        description: "Site e-commerce immobilier avec base de données relationnelle. Consultation, filtrage et mise en favoris de biens immobiliers.",
        technologies: ["PHP", "SQL", "HTML/CSS/JS"],
        icon: "fa-building"
    },
    {
        title: "Plateforme Question & Réponse",
        description: "Forum collaboratif type Stack Overflow. Les utilisateurs peuvent poser des questions, répondre et voter pour les meilleures solutions.",
        technologies: ["Django", "HTML/CSS/JS"],
        icon: "fa-comments"
    },
    {
        title: "Système de Gestion de Vols",
        description: "Interface de gestion et suivi des vols en temps réel. Tableau de bord interactif pour les compagnies aériennes.",
        technologies: ["HTML", "CSS", "JavaScript"],
        icon: "fa-plane"
    },
    {
        title: "Dashboard Analytique — Bono Bois",
        description: "Tableau de bord de visualisation de données pour PME. KPI, graphiques dynamiques et rapports d'activité.",
        technologies: ["HTML", "CSS", "JavaScript"],
        icon: "fa-chart-pie"
    }
];

/**
 * Fonction pour générer dynamiquement les cartes de projets
 */
function renderProjects() {
    const container = document.getElementById('projects-container');
    
    if (!container) return;

    // Vider le conteneur avant de rendre
    container.innerHTML = '';

    projects.forEach((project, index) => {
        // Créer l'élément de la carte
        const card = document.createElement('div');
        card.className = `project-card glass fade-in delay-${(index % 3) + 1}`;
        
        // Générer les balises de technologies
        const techTags = project.technologies
            .map(tech => `<span>${tech}</span>`)
            .join('');

        // Icône par défaut si non spécifiée
        const iconClass = project.icon || 'fa-code';

        // Remplir la carte avec le HTML
        card.innerHTML = `
            <div class="project-icon">
                <i class="fa-solid ${iconClass}"></i>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${techTags}
            </div>
        `;

        // Ajouter la carte au conteneur
        container.appendChild(card);
    });
}

/**
 * Initialisation de la page
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Générer les projets
    renderProjects();

    // 2. Mettre à jour l'année dans le footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 3. Gestion de la Navbar au scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 5. Animations au scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionnel : arrêter d'observer une fois l'animation jouée
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Sélectionner tous les éléments à animer (incluant ceux générés dynamiquement)
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.fade-in');
        animatedElements.forEach(el => observer.observe(el));
    }, 100); // Petit délai pour laisser le temps au DOM dynamique (projets) de se créer
});

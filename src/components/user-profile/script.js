class UserProfile {
    constructor() {
        this.userData = {
            name: 'Alejandro Barrera',
            role: 'Desarrollador Full Stack',
            email: 'alejandro91dark@hotmail.es',
            location: 'Santiago, Chile',
            joinDate: 'Enero 2026',
            phone: '+56 9 1234 5678',
            avatar: 'avatar.jpg',
            stats: {
                projects: 12,
                commits: 248,
                contributions: '1.2k'
            },
            skills: ['JavaScript', 'React', 'Node.js', 'Git', 'DevOps', 'CI/CD'],
            isOnline: true
        };

        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.loadUserData();
        this.animateStats();
    }

    cacheElements() {
        // Elementos del DOM
        this.elements = {
            userName: document.getElementById('userName'),
            userRole: document.getElementById('userRole'),
            userEmail: document.getElementById('userEmail'),
            userLocation: document.getElementById('userLocation'),
            userJoinDate: document.getElementById('userJoinDate'),
            userPhone: document.getElementById('userPhone'),
            avatarImg: document.getElementById('avatarImg'),
            statProjects: document.getElementById('statProjects'),
            statCommits: document.getElementById('statCommits'),
            statContributions: document.getElementById('statContributions'),
            skillsContainer: document.getElementById('skillsContainer'),
            editBtn: document.getElementById('editBtn'),
            contactBtn: document.getElementById('contactBtn'),
            shareBtn: document.getElementById('shareBtn')
        };
    }

    bindEvents() {
        // Event listeners para los botones
        this.elements.editBtn.addEventListener('click', () => this.handleEdit());
        this.elements.contactBtn.addEventListener('click', () => this.handleContact());
        this.elements.shareBtn.addEventListener('click', () => this.handleShare());

        // Hover effects para las estadísticas
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => this.handleStatHover(e, true));
            item.addEventListener('mouseleave', (e) => this.handleStatHover(e, false));
        });

        // Click en skills
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('click', (e) => this.handleSkillClick(e));
        });
    }

    loadUserData() {
        // Cargar datos del usuario desde localStorage o API
        const savedData = this.loadFromLocalStorage();
        if (savedData) {
            this.userData = { ...this.userData, ...savedData };
        }

        this.renderUserData();
    }

    renderUserData() {
        // Renderizar información del usuario
        this.elements.userName.textContent = this.userData.name;
        this.elements.userRole.textContent = this.userData.role;
        this.elements.userEmail.textContent = this.userData.email;
        this.elements.userLocation.textContent = this.userData.location;
        this.elements.userJoinDate.textContent = `Miembro desde ${this.userData.joinDate}`;
        this.elements.userPhone.textContent = this.userData.phone;

        // Renderizar estadísticas
        this.elements.statProjects.textContent = this.userData.stats.projects;
        this.elements.statCommits.textContent = this.userData.stats.commits;
        this.elements.statContributions.textContent = this.userData.stats.contributions;

        // Renderizar avatar si existe
        if (this.userData.avatar) {
            this.elements.avatarImg.src = this.userData.avatar;
            this.elements.avatarImg.style.display = 'block';
        }
    }

    animateStats() {
        // Animar las estadísticas al cargar
        const stats = document.querySelectorAll('.stat-value');
        stats.forEach((stat, index) => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(10px)';

            setTimeout(() => {
                stat.style.transition = 'all 0.5s ease-out';
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });
    }

    handleEdit() {
        // Simular edición de perfil
        this.showNotification('Función de edición en desarrollo', 'info');

        // Aquí podrías abrir un modal de edición
        console.log('Editar perfil:', this.userData);
    }

    handleContact() {
        // Abrir cliente de correo
        const subject = encodeURIComponent('Contacto desde perfil');
        const body = encodeURIComponent(`Hola ${this.userData.name},\n\n`);
        window.location.href = `mailto:${this.userData.email}?subject=${subject}&body=${body}`;

        this.showNotification('Abriendo cliente de correo...', 'success');
    }

    handleShare() {
        // Compartir perfil
        const profileUrl = window.location.href;

        if (navigator.share) {
            navigator.share({
                title: `Perfil de ${this.userData.name}`,
                text: `${this.userData.role} - ${this.userData.email}`,
                url: profileUrl
            })
                .then(() => this.showNotification('Perfil compartido exitosamente', 'success'))
                .catch((error) => console.log('Error al compartir:', error));
        } else {
            // Fallback: copiar al portapapeles
            this.copyToClipboard(profileUrl);
            this.showNotification('URL copiada al portapapeles', 'success');
        }
    }

    handleStatHover(event, isEntering) {
        const statValue = event.currentTarget.querySelector('.stat-value');
        if (isEntering) {
            statValue.style.transform = 'scale(1.1)';
        } else {
            statValue.style.transform = 'scale(1)';
        }
    }

    handleSkillClick(event) {
        const skill = event.target.textContent;
        this.showNotification(`Habilidad: ${skill}`, 'info');

        // Aquí podrías filtrar proyectos por habilidad, etc.
        console.log('Skill seleccionada:', skill);
    }

    showNotification(message, type = 'info') {
        // Crear notificación temporal
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('userProfile');
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error al cargar datos del localStorage:', error);
            return null;
        }
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem('userProfile', JSON.stringify(this.userData));
        } catch (error) {
            console.error('Error al guardar datos en localStorage:', error);
        }
    }

    updateUserData(newData) {
        this.userData = { ...this.userData, ...newData };
        this.renderUserData();
        this.saveToLocalStorage();
    }
}

// Animaciones CSS adicionales
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar el componente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const userProfile = new UserProfile();

    // Exponer la instancia globalmente para debugging
    window.userProfile = userProfile;

    console.log('✅ Componente de perfil de usuario inicializado');
});

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserProfile;
}

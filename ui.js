/* ============================================
   ICE DYNASTY - UI JavaScript
   ============================================ */

// ==================== UI MANAGER ====================
class UIManager {
    constructor() {
        this.currentPage = 'dashboard';
        this.isMobileMenuOpen = false;
    }

    // Initialize UI
    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupColorPicker();
        this.setupModals();
        this.setupTooltips();
    }

    // Navigation
    setupNavigation() {
        const navTabs = document.querySelectorAll('.nav-tab');
        navTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const pageId = tab.dataset.page;
                this.showPage(pageId);
            });
        });
    }

    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
        
        // Show selected page
        const page = document.getElementById('page-' + pageId);
        if (page) {
            page.classList.add('active');
        }
        
        // Update nav tabs
        const navTab = document.querySelector(`[data-page="${pageId}"]`);
        if (navTab) {
            navTab.classList.add('active');
        }
        
        // Update sidebar
        this.updateSidebarActive(pageId);
        
        this.currentPage = pageId;
    }

    updateSidebarActive(pageId) {
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        const mapping = {
            'dashboard': 0,
            'roster': 1,
            'lines': 2,
            'tactics': 3,
            'match': 4,
            'market': 5,
            'training': 6,
            'academy': 7,
            'facilities': 8,
            'league': 9,
            'news': 10
        };
        
        const index = mapping[pageId];
        if (index !== undefined && sidebarItems[index]) {
            sidebarItems[index].classList.add('active');
        }
    }

    // Mobile Menu
    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
            
            // Close on outside click
            document.addEventListener('click', (e) => {
                if (this.isMobileMenuOpen && 
                    !sidebar.contains(e.target) && 
                    !menuToggle.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
        }
    }

    closeMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('open');
            this.isMobileMenuOpen = false;
        }
    }

    // Color Picker
    setupColorPicker() {
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                colorOptions.forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
            });
        });
    }

    // Modals
    setupModals() {
        const modalOverlay = document.getElementById('playerModal');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    this.closeModal();
                }
            });
        }
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    }

    closeModal() {
        const modal = document.getElementById('playerModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Tooltips
    setupTooltips() {
        const elements = document.querySelectorAll('[data-tooltip]');
        elements.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                this.showTooltip(e, el.dataset.tooltip);
            });
            el.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    showTooltip(e, text) {
        let tooltip = document.querySelector('.tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            document.body.appendChild(tooltip);
        }
        tooltip.textContent = text;
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY + 10 + 'px';
        tooltip.style.display = 'block';
    }

    hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }
}

// ==================== NOTIFICATION SYSTEM ====================
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.maxNotifications = 3;
    }

    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        this.notifications.push(notification);
        
        // Limit notifications
        if (this.notifications.length > this.maxNotifications) {
            const old = this.notifications.shift();
            if (old) old.remove();
        }
        
        // Auto remove
        setTimeout(() => {
            notification.style.animation = 'notifOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    success(message) { this.show(message, 'success'); }
    warning(message) { this.show(message, 'warning'); }
    error(message) { this.show(message, 'error'); }
    info(message) { this.show(message, 'info'); }
}

// ==================== ANIMATION MANAGER ====================
class AnimationManager {
    constructor() {
        this.animations = new Map();
    }

    // Page transitions
    animatePageIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    // Goal celebration
    animateGoal(element) {
        element.classList.add('goal');
        setTimeout(() => {
            element.classList.remove('goal');
        }, 1000);
    }

    // Stat change
    animateStatChange(element, newValue, oldValue) {
        const isIncrease = newValue > oldValue;
        element.style.transition = 'all 0.3s ease';
        element.style.transform = isIncrease ? 'scale(1.2)' : 'scale(0.8)';
        element.style.color = isIncrease ? 'var(--success)' : 'var(--danger)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 300);
    }

    // Progress bar
    animateProgressBar(element, targetWidth) {
        element.style.transition = 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.width = targetWidth + '%';
    }

    // Button press
    animateButtonPress(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 100);
    }

    // Card hover
    animateCardHover(card, isEnter) {
        if (isEnter) {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = '0 12px 40px rgba(0, 212, 255, 0.2)';
        } else {
            card.style.transform = '';
            card.style.boxShadow = '';
        }
    }

    // Momentum shift
    animateMomentum(element, value) {
        element.style.transition = 'left 0.5s ease';
        element.style.left = value + '%';
    }

    // Player card slide
    animatePlayerCard(card, direction) {
        card.style.transition = 'all 0.3s ease';
        card.style.transform = direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)';
        card.style.opacity = '0';
        
        setTimeout(() => {
            card.style.transform = '';
            card.style.opacity = '';
        }, 300);
    }
}

// ==================== FORM MANAGER ====================
class FormManager {
    constructor() {
        this.validators = {
            required: (value) => value.trim() !== '',
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            minLength: (value, min) => value.length >= min,
            maxLength: (value, max) => value.length <= max,
            number: (value) => !isNaN(value) && !isNaN(parseFloat(value))
        };
    }

    // Validate form
    validateForm(formId) {
        const form = document.getElementById(formId);
        if (!form) return true;
        
        const inputs = form.querySelectorAll('[data-validate]');
        let isValid = true;
        
        inputs.forEach(input => {
            const rules = input.dataset.validate.split(',');
            rules.forEach(rule => {
                const [ruleName, param] = rule.split(':');
                const validator = this.validators[ruleName];
                if (validator && !validator(input.value, param)) {
                    this.showInputError(input);
                    isValid = false;
                } else {
                    this.clearInputError(input);
                }
            });
        });
        
        return isValid;
    }

    showInputError(input) {
        input.classList.add('error');
        let error = input.parentElement.querySelector('.error-message');
        if (!error) {
            error = document.createElement('div');
            error.className = 'error-message';
            input.parentElement.appendChild(error);
        }
        error.textContent = input.dataset.error || 'Invalid input';
    }

    clearInputError(input) {
        input.classList.remove('error');
        const error = input.parentElement.querySelector('.error-message');
        if (error) error.remove();
    }

    // Get form data
    getFormData(formId) {
        const form = document.getElementById(formId);
        if (!form) return {};
        
        const data = {};
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            data[input.id || input.name] = input.value;
        });
        
        return data;
    }

    // Reset form
    resetForm(formId) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.value = '';
            this.clearInputError(input);
        });
    }
}

// ==================== TABLE MANAGER ====================
class TableManager {
    constructor() {
        this.sortColumn = null;
        this.sortDirection = 'asc';
    }

    // Sort table
    sortTable(tableId, column) {
        const table = document.getElementById(tableId);
        if (!table) return;
        
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        if (this.sortColumn === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column;
            this.sortDirection = 'asc';
        }
        
        rows.sort((a, b) => {
            const aVal = a.cells[this.getColumnIndex(table, column)].textContent;
            const bVal = b.cells[this.getColumnIndex(table, column)].textContent;
            
            if (this.sortDirection === 'asc') {
                return aVal.localeCompare(bVal);
            } else {
                return bVal.localeCompare(aVal);
            }
        });
        
        rows.forEach(row => tbody.appendChild(row));
    }

    getColumnIndex(table, columnName) {
        const headers = table.querySelectorAll('th');
        for (let i = 0; i < headers.length; i++) {
            if (headers[i].textContent.toLowerCase().includes(columnName.toLowerCase())) {
                return i;
            }
        }
        return 0;
    }

    // Filter table
    filterTable(tableId, searchTerm) {
        const table = document.getElementById(tableId);
        if (!table) return;
        
        const rows = table.querySelectorAll('tbody tr');
        const term = searchTerm.toLowerCase();
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    }

    // Paginate table
    paginateTable(tableId, itemsPerPage, page = 1) {
        const table = document.getElementById(tableId);
        if (!table) return;
        
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const totalPages = Math.ceil(rows.length / itemsPerPage);
        
        rows.forEach((row, index) => {
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            row.style.display = index >= start && index < end ? '' : 'none';
        });
        
        return totalPages;
    }
}

// ==================== CHART MANAGER ====================
class ChartManager {
    constructor() {
        this.charts = new Map();
    }

    // Create simple bar chart
    createBarChart(containerId, data, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const maxValue = Math.max(...data.map(d => d.value));
        const barWidth = options.barWidth || 40;
        const barGap = options.barGap || 10;
        
        container.innerHTML = data.map(item => {
            const height = (item.value / maxValue) * 100;
            return `
                <div class="chart-bar" style="width: ${barWidth}px; margin: 0 ${barGap/2}px;">
                    <div class="chart-bar-fill" style="height: ${height}%; background: ${item.color || 'var(--ice-blue)'}"></div>
                    <div class="chart-bar-label">${item.label}</div>
                </div>
            `;
        }).join('');
    }

    // Create progress ring
    createProgressRing(containerId, percentage, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const size = options.size || 80;
        const strokeWidth = options.strokeWidth || 8;
        const color = options.color || 'var(--ice-blue)';
        
        container.innerHTML = `
            <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
                <circle cx="${size/2}" cy="${size/2}" r="${(size - strokeWidth)/2}" 
                    fill="none" stroke="var(--tertiary-dark)" stroke-width="${strokeWidth}"/>
                <circle cx="${size/2}" cy="${size/2}" r="${(size - strokeWidth)/2}" 
                    fill="none" stroke="${color}" stroke-width="${strokeWidth}"
                    stroke-dasharray="${2 * Math.PI * (size - strokeWidth) * percentage / 100}"
                    stroke-dashoffset="${2 * Math.PI * (size - strokeWidth) * (100 - percentage) / 100}"
                    transform="rotate(-90 ${size/2} ${size/2})"/>
            </svg>
        `;
    }
}

// ==================== STORAGE MANAGER ====================
class StorageManager {
    constructor() {
        this.prefix = 'ice_dynasty_';
    }

    // Save to localStorage
    save(key, data) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Save failed:', e);
            return false;
        }
    }

    // Load from localStorage
    load(key) {
        try {
            const data = localStorage.getItem(this.prefix + key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Load failed:', e);
            return null;
        }
    }

    // Remove from localStorage
    remove(key) {
        localStorage.removeItem(this.prefix + key);
    }

    // Clear all data
    clear() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        });
    }

    // Export data
    export() {
        const data = {};
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(this.prefix)) {
                data[key] = localStorage.getItem(key);
            }
        });
        return JSON.stringify(data);
    }

    // Import data
    import(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            Object.keys(data).forEach(key => {
                localStorage.setItem(key, data[key]);
            });
            return true;
        } catch (e) {
            console.error('Import failed:', e);
            return false;
        }
    }
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    window.ui = new UIManager();
    window.notifications = new NotificationManager();
    window.animations = new AnimationManager();
    window.forms = new FormManager();
    window.tables = new TableManager();
    window.charts = new ChartManager();
    window.storage = new StorageManager();
    
    // Initialize UI
    if (typeof window.ui.init === 'function') {
        window.ui.init();
    }
    
    console.log('Ice Dynasty UI initialized!');
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        UIManager,
        NotificationManager,
        AnimationManager,
        FormManager,
        TableManager,
        ChartManager,
        StorageManager
    };
}
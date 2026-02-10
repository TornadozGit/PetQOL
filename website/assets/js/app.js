// ===== ENHANCED APP ARCHITECTURE =====
        class PetQOL {
            constructor() {
                this.currentPet = null;
                this.currentSection = 'dashboard';
                this.theme = localStorage.getItem('petqol_theme') || 'light';
                this.init();
            }

            init() {
                // ADDITION: Check if user has seen splash screen
                const hasSeenWelcome = localStorage.getItem('petqol_welcome_seen');
                if (!hasSeenWelcome) {
                    const splash = document.getElementById('splash-screen');
                    if (splash) splash.classList.remove('hidden');
                }

                this.applyTheme();
                this.loadData();
                this.setupEventListeners();
                
                // If returning user (hasSeenWelcome), show welcome toast.
                // If new user (!hasSeenWelcome), they see the splash screen instead.
                if (hasSeenWelcome) {
                   this.showWelcome();
                }

                this.navigate('dashboard');
                
                const savedName = localStorage.getItem('petqol_user_name');
    const savedEmail = localStorage.getItem('petqol_user_email');

    if (savedName && savedEmail) {
        // 1. تحديث حقول الإدخال في صفحة الإعدادات (إذا كانت الصفحة مفتوحة)
        const nameInput = document.getElementById('setting-name');
        const emailInput = document.getElementById('setting-email');
        
        if (nameInput) nameInput.value = savedName;
        if (emailInput) emailInput.value = savedEmail;

        // 2. تحديث الاسم في القائمة الجانبية
        this.updateUserProfile(savedName, savedEmail);
    }
            }

            // ===== THEME MANAGEMENT =====
            applyTheme() {
                document.body.setAttribute('data-bs-theme', this.theme);
                localStorage.setItem('petqol_theme', this.theme);
                
                // Toggle Icon in Sidebar
                const themeBtn = document.querySelector('.sidebar .btn-icon i.bi-moon-stars, .sidebar .btn-icon i.bi-sun');
                if(themeBtn) {
                   themeBtn.className = this.theme === 'light' ? 'bi bi-moon-stars' : 'bi bi-sun';
                }
            }

            toggleTheme() {
                this.theme = this.theme === 'light' ? 'dark' : 'light';
                this.applyTheme();
                this.showToast(`Switched to ${this.theme} mode`);
            }

            toggleSidebar() {
                const sidebar = document.querySelector('.sidebar');
                const isOpen = sidebar.classList.contains('active');
                
                if (isOpen) {
                    sidebar.classList.remove('active');
                    document.body.classList.remove('sidebar-open');
                } else {
                    sidebar.classList.add('active');
                    document.body.classList.add('sidebar-open');
                }
            }

            // ===== DATA MANAGEMENT =====
            loadData() {
                // Load pets
                const pets = JSON.parse(localStorage.getItem('petqol_pets') || '[]');
                if (pets.length > 0) {
                    const selectedId = localStorage.getItem('petqol_selected_pet');
                    this.currentPet = selectedId ? pets.find(p => p.id === selectedId) : pets[0];
                }
                this.updatePetSelector();
            }

            saveData() {
                // Save current state
                if (this.currentPet) {
                    localStorage.setItem('petqol_selected_pet', this.currentPet.id);
                }
            }

            // ===== NAVIGATION =====
            navigate(section) {
                // Hide all sections
                document.querySelectorAll('.section').forEach(el => {
                    el.classList.remove('active');
                });

                // Update nav
                document.querySelectorAll('.nav-link, .nav-btn').forEach(el => {
                    el.classList.remove('active');
                });

                // Show target section
                document.getElementById(section).classList.add('active');
                this.currentSection = section;

                // Update active nav
                document.querySelectorAll(`[onclick*="${section}"]`).forEach(el => {
                    if (el.classList.contains('nav-link') || el.classList.contains('nav-btn')) {
                        el.classList.add('active');
                    }
                });

                // Close sidebar on mobile if navigating
                if (window.innerWidth < 992) {
                    this.toggleSidebar(); 
                    document.querySelector('.sidebar').classList.remove('active'); // Force remove just in case
                    document.body.classList.remove('sidebar-open');
                }

                // Scroll to top
                window.scrollTo(0, 0);

                // Load section data
                this.loadSectionData(section);
            }

            loadSectionData(section) {
                switch(section) {
                    case 'dashboard':
                        this.loadDashboard();
                        break;
                    case 'pets':
                        this.loadPets();
                        break;
                    case 'history':
                        this.loadHistory();
                        break;
                    case 'insights':
                        this.loadInsights();
                        break;
                    case 'health':
                        this.loadHealthPlan();
                        break;
                    case 'checkin':
                        checkin.reset();
                        break;
                    // NEW CASE FOR PREMIUM
                    case 'premium':
                        // Static page, no data loading required
                        break;
                }
            }

            // ===== PET MANAGEMENT =====
            updatePetSelector() {
                const pets = JSON.parse(localStorage.getItem('petqol_pets') || '[]');
                const dropdown = document.getElementById('pet-dropdown-list');
                const currentName = document.getElementById('current-pet-name');

                dropdown.innerHTML = '';
                pets.forEach(pet => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <a class="dropdown-item ${this.currentPet?.id === pet.id ? 'active' : ''}" 
                           href="#" onclick="event.preventDefault(); app.selectPet('${pet.id}')">
                            <i class="fa-solid fa-paw me-2"></i>${pet.name}
                        </a>
                    `;
                    dropdown.appendChild(li);
                });

                if (pets.length === 0) {
                    currentName.textContent = 'Select Pet';
                    dropdown.innerHTML = `
                        <li><a class="dropdown-item" href="#" onclick="app.showAddPetModal()">
                            <i class="bi bi-plus me-2"></i>Add your first pet
                        </a></li>
                    `;
                } else if (this.currentPet) {
                    currentName.textContent = this.currentPet.name;
                }
            }

            selectPet(petId) {
                const pets = JSON.parse(localStorage.getItem('petqol_pets') || '[]');
                this.currentPet = pets.find(p => p.id === petId);
                localStorage.setItem('petqol_selected_pet', petId);
                this.updatePetSelector();
                this.loadSectionData(this.currentSection);
                this.showToast(`Selected ${this.currentPet.name}`);
                
                // Close dropdown manually
                const dropdownElement = document.querySelector('.dropdown-toggle');
                const dropdownInstance = bootstrap.Dropdown.getInstance(dropdownElement);
                if (dropdownInstance) dropdownInstance.hide();
            }

            showAddPetModal() {
                const modal = new bootstrap.Modal(document.getElementById('addPetModal'));
                modal.show();
            }

            savePet() {
                const name = document.getElementById('pet-name').value.trim();
                if (!name) {
                    this.showToast('Please enter a name for your pet', 'error');
                    return;
                }

                const pet = {
                    id: Date.now().toString(),
                    name: name,
                    type: document.getElementById('pet-type').value,
                    breed: document.getElementById('pet-breed').value.trim(),
                    age: document.getElementById('pet-age').value.trim(),
                    weight: document.getElementById('pet-weight').value.trim(),
                    createdAt: new Date().toISOString(),
                    avatar: this.getPetAvatar(document.getElementById('pet-type').value)
                };

                // Save to localStorage
                const pets = JSON.parse(localStorage.getItem('petqol_pets') || '[]');
                pets.push(pet);
                localStorage.setItem('petqol_pets', JSON.stringify(pets));

                // Close modal and reset form
                bootstrap.Modal.getInstance(document.getElementById('addPetModal')).hide();
                document.getElementById('add-pet-form').reset();

                // Update UI
                this.currentPet = pet;
                this.updatePetSelector();
                this.loadPets();
                this.showToast(`${pet.name} added successfully! 🎉`);
            }

            getPetAvatar(type) {
                const avatars = {
                    'Dog': '🐕',
                    'Cat': '🐈',
                    'Bird': '🦜',
                    'Rabbit': '🐇',
                    'Fish': '🐟',
                    'Other': '🐾'
                };
                return avatars[type] || '🐾';
            }

            // ===== DASHBOARD =====
            loadDashboard() {
                if (!this.currentPet) {
                    this.showEmptyDashboard();
                    return;
                }

                // Load pet's data
                const logs = JSON.parse(localStorage.getItem(`petqol_logs_${this.currentPet.id}`) || '[]');
                
                if (logs.length === 0) {
                    this.showEmptyDashboard();
                    return;
                }

                // Calculate stats
                const latestLog = logs[0];
                const avgScore = logs.reduce((sum, log) => sum + log.score, 0) / logs.length;
                const streak = this.calculateStreak(logs);
                const trend = this.calculateTrend(logs);

                // Update UI
                document.getElementById('dash-wellness').textContent = latestLog.score;
                document.getElementById('dash-wellness-status').textContent = this.getStatusLabel(latestLog.score);
                document.getElementById('dash-streak').textContent = streak;
                document.getElementById('dash-trend').textContent = `${trend > 0 ? '+' : ''}${trend}%`;

                // Update wellness ring
                const ring = document.getElementById('wellness-ring');
                const circumference = 2 * Math.PI * 54;
                const offset = circumference - (latestLog.score / 100) * circumference;
                ring.style.strokeDasharray = `${circumference} ${circumference}`;
                ring.style.strokeDashoffset = offset;

                document.getElementById('wellness-score').textContent = latestLog.score;

                // Load recent activity
                this.loadRecentActivity(logs.slice(0, 5));
            }

            showEmptyDashboard() {
                document.getElementById('dash-wellness').textContent = '--';
                document.getElementById('dash-wellness-status').textContent = 'Add your first check-in';
                document.getElementById('dash-streak').textContent = '0';
                document.getElementById('dash-trend').textContent = '--%';
                
                const ring = document.getElementById('wellness-ring');
                const circumference = 2 * Math.PI * 54;
                ring.style.strokeDasharray = `${circumference} ${circumference}`;
                ring.style.strokeDashoffset = circumference;
                document.getElementById('wellness-score').textContent = '--';

                const recentActivity = document.getElementById('recent-activity');
                recentActivity.innerHTML = `
                    <div class="text-center py-5">
                        <i class="bi bi-heart-pulse text-muted" style="font-size: 3rem;"></i>
                        <h5 class="mt-3">No check-ins yet</h5>
                        <p class="text-muted">Start tracking your pet's wellness</p>
                        <button class="btn btn-primary mt-2" onclick="app.navigate('checkin')">
                            Start First Check-in
                        </button>
                    </div>
                `;
            }

            calculateStreak(logs) {
                if (logs.length === 0) return 0;
                
                let streak = 1;
                let lastDate = new Date(logs[0].date);
                
                for (let i = 1; i < logs.length; i++) {
                    const currentDate = new Date(logs[i].date);
                    const diffDays = Math.floor((lastDate - currentDate) / (1000 * 60 * 60 * 24));
                    
                    if (diffDays === 1) {
                        streak++;
                        lastDate = currentDate;
                    } else {
                        break;
                    }
                }
                
                return streak;
            }

            calculateTrend(logs) {
                if (logs.length < 2) return 0;
                
                const lastWeek = logs.slice(0, 7);
                const previousWeek = logs.slice(7, 14);
                
                if (previousWeek.length === 0) return 0;
                
                const currentAvg = lastWeek.reduce((sum, log) => sum + log.score, 0) / lastWeek.length;
                const previousAvg = previousWeek.reduce((sum, log) => sum + log.score, 0) / previousWeek.length;
                
                return Math.round(((currentAvg - previousAvg) / previousAvg) * 100);
            }

            getStatusLabel(score) {
                if (score >= 90) return 'Excellent';
                if (score >= 75) return 'Very Good';
                if (score >= 60) return 'Good';
                if (score >= 40) return 'Fair';
                return 'Needs Attention';
            }

            loadRecentActivity(logs) {
                const container = document.getElementById('recent-activity');
                if (logs.length === 0) {
                    container.innerHTML = '<p class="text-muted text-center py-4">No recent activity</p>';
                    return;
                }

                let html = '<div class="list-group list-group-flush">';
                logs.forEach(log => {
                    const date = new Date(log.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                    });
                    
                    html += `
                        <div class="list-group-item border-0 px-0">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <div class="fw-medium">Check-in on ${date}</div>
                                    <div class="text-muted small">Score: ${log.score} • ${this.getStatusLabel(log.score)}</div>
                                    ${log.notes ? `<div class="text-muted small mt-1">${log.notes.substring(0, 60)}${log.notes.length > 60 ? '...' : ''}</div>` : ''}
                                </div>
                                <span class="badge ${this.getStatusBadge(log.score)}">${log.score}</span>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';
                
                container.innerHTML = html;
            }

            getStatusBadge(score) {
                if (score >= 90) return 'bg-success';
                if (score >= 75) return 'bg-primary';
                if (score >= 60) return 'bg-warning';
                if (score >= 40) return 'bg-secondary';
                return 'bg-danger';
            }

            // ===== PETS PAGE =====
            loadPets() {
                const pets = JSON.parse(localStorage.getItem('petqol_pets') || '[]');
                const container = document.getElementById('pets-grid');
                
                if (pets.length === 0) {
                    container.innerHTML = `
                        <div class="col-12">
                            <div class="card p-5 text-center">
                                <i class="fa-solid fa-paw text-muted" style="font-size: 4rem;"></i>
                                <h3 class="mt-3">No Pets Added</h3>
                                <p class="text-muted mb-4">Add your first pet to start tracking wellness</p>
                                <button class="btn btn-primary" onclick="app.showAddPetModal()">
                                    <i class="bi bi-plus-lg me-2"></i> Add First Pet
                                </button>
                            </div>
                        </div>
                    `;
                    return;
                }

                let html = '';
                pets.forEach(pet => {
                    const logs = JSON.parse(localStorage.getItem(`petqol_logs_${pet.id}`) || '[]');
                    const latestLog = logs[0];
                    const isCurrent = this.currentPet?.id === pet.id;
                    
                    html += `
                        <div class="col-md-6 col-lg-4">
                            <div class="card p-4 ${isCurrent ? 'border-primary border-2' : ''}" 
                                 onclick="app.selectPet('${pet.id}')" style="cursor: pointer;">
                                <div class="d-flex align-items-start justify-content-between mb-3">
                                    <div class="d-flex align-items-center gap-3">
                                        <div class="fs-1">${pet.avatar}</div>
                                        <div>
                                            <h5 class="mb-1">${pet.name}</h5>
                                            <div class="text-muted small">${pet.type} • ${pet.age || 'No age'}</div>
                                        </div>
                                    </div>
                                    ${isCurrent ? '<i class="bi bi-check-circle-fill text-primary"></i>' : ''}
                                </div>
                                
                                ${latestLog ? `
                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                        <div>
                                            <div class="text-muted small">Latest Score</div>
                                            <div class="fs-3 fw-bold">${latestLog.score}</div>
                                        </div>
                                        <div class="text-end">
                                            <div class="text-muted small">Total Check-ins</div>
                                            <div class="fs-3 fw-bold">${logs.length}</div>
                                        </div>
                                    </div>
                                    <div class="progress" style="height: 6px;">
                                        <div class="progress-bar bg-primary" style="width: ${latestLog.score}%"></div>
                                    </div>
                                ` : `
                                    <div class="text-center py-3">
                                        <p class="text-muted mb-3">No check-ins yet</p>
                                        <button class="btn btn-outline btn-sm" 
                                                onclick="event.stopPropagation(); app.selectPet('${pet.id}'); app.navigate('checkin')">
                                            Start First Check-in
                                        </button>
                                    </div>
                                `}
                                
                                <div class="d-flex gap-2 mt-4">
                                    <button class="btn btn-outline btn-sm flex-grow-1"
                                            onclick="event.stopPropagation(); app.selectPet('${pet.id}')">
                                        Select
                                    </button>
                                    <button class="btn btn-outline btn-sm text-danger"
                                            onclick="event.stopPropagation(); app.deletePet('${pet.id}')">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                container.innerHTML = html;
            }

            deletePet(petId) {
                if (confirm('Are you sure you want to delete this pet? All associated data will be lost.')) {
                    let pets = JSON.parse(localStorage.getItem('petqol_pets') || '[]');
                    pets = pets.filter(p => p.id !== petId);
                    localStorage.setItem('petqol_pets', JSON.stringify(pets));
                    
                    localStorage.removeItem(`petqol_logs_${petId}`);
                    
                    if (this.currentPet?.id === petId) {
                        this.currentPet = pets.length > 0 ? pets[0] : null;
                    }
                    
                    this.updatePetSelector();
                    this.loadPets();
                    this.showToast('Pet deleted');
                }
            }

            // ===== HISTORY =====
            loadHistory() {
                if (!this.currentPet) {
                    this.showEmptyHistory();
                    return;
                }

                const logs = JSON.parse(localStorage.getItem(`petqol_logs_${this.currentPet.id}`) || '[]');
                const container = document.getElementById('history-table');
                
                if (logs.length === 0) {
                    this.showEmptyHistory();
                    return;
                }

                let html = '';
                logs.forEach(log => {
                    const date = new Date(log.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });
                    
                    html += `
                        <tr>
                            <td>${date}</td>
                            <td>
                                <span class="badge ${this.getStatusBadge(log.score)}">${log.score}</span>
                            </td>
                            <td>${this.getStatusLabel(log.score)}</td>
                            <td>${log.mood || '--'}</td>
                            <td class="d-none d-md-table-cell">${log.notes ? log.notes.substring(0, 30) + (log.notes.length > 30 ? '...' : '') : '--'}</td>
                            <td>
                                <button class="btn btn-sm btn-outline" onclick="app.viewLogDetails('${log.id}')">
                                    <i class="bi bi-eye"></i>
                                </button>
                                <button class="btn btn-sm btn-outline text-danger" onclick="app.deleteLog('${log.id}')">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                });
                
                container.innerHTML = html;
            }

            showEmptyHistory() {
                const container = document.getElementById('history-table');
                container.innerHTML = `
                    <tr>
                        <td colspan="6" class="text-center py-5">
                            <i class="bi bi-clock-history text-muted" style="font-size: 3rem;"></i>
                            <h5 class="mt-3">No History Yet</h5>
                            <p class="text-muted mb-4">Start tracking your pet's wellness</p>
                            <button class="btn btn-primary" onclick="app.navigate('checkin')">
                                Start First Check-in
                            </button>
                        </td>
                    </tr>
                `;
            }

            viewLogDetails(logId) {
                // Implementation for viewing log details
                this.showToast('View log details feature coming soon!');
            }

            deleteLog(logId) {
                if (confirm('Are you sure you want to delete this check-in?')) {
                    const logs = JSON.parse(localStorage.getItem(`petqol_logs_${this.currentPet.id}`) || '[]');
                    const updatedLogs = logs.filter(log => log.id !== logId);
                    localStorage.setItem(`petqol_logs_${this.currentPet.id}`, JSON.stringify(updatedLogs));
                    this.loadHistory();
                    this.showToast('Check-in deleted');
                }
            }

            exportHistory() {
                if (!this.currentPet) {
                    this.showToast('Select a pet first', 'error');
                    return;
                }

                const logs = JSON.parse(localStorage.getItem(`petqol_logs_${this.currentPet.id}`) || '[]');
                const data = {
                    pet: this.currentPet,
                    logs: logs,
                    exportedAt: new Date().toISOString()
                };

                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `petqol-history-${this.currentPet.name}-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                URL.revokeObjectURL(url);
                
                this.showToast('History exported successfully');
            }

            // ===== INSIGHTS =====
            loadInsights() {
                if (!this.currentPet) {
                    this.showEmptyInsights();
                    return;
                }

                const logs = JSON.parse(localStorage.getItem(`petqol_logs_${this.currentPet.id}`) || '[]');
                
                if (logs.length === 0) {
                    this.showEmptyInsights();
                    return;
                }

                // Calculate pillar averages
                const pillars = {
                    Physical: 0,
                    Emotional: 0,
                    Environment: 0,
                    Enrichment: 0
                };

                let pillarCount = 0;
                
                logs.forEach(log => {
                    if (log.pillars) {
                        Object.keys(pillars).forEach(pillar => {
                            pillars[pillar] += log.pillars[pillar] || 0;
                        });
                        pillarCount++;
                    }
                });

                // Generate fallback data if no pillar data exists
                if (pillarCount === 0) {
                    logs.forEach(log => {
                        const base = Math.max(40, Math.min(90, log.score));
                        pillars.Physical += base + (Math.random() * 20 - 10);
                        pillars.Emotional += base + (Math.random() * 20 - 10);
                        pillars.Environment += base + (Math.random() * 20 - 10);
                        pillars.Enrichment += base + (Math.random() * 20 - 10);
                    });
                    pillarCount = logs.length;
                }

                // Update UI
                Object.keys(pillars).forEach(pillar => {
                    const avg = Math.round(pillars[pillar] / pillarCount);
                    const element = document.getElementById(`pillar-${pillar.toLowerCase()}`);
                    const bar = document.getElementById(`pillar-${pillar.toLowerCase()}-bar`);
                    
                    if (element) element.textContent = `${avg}%`;
                    if (bar) {
                        bar.style.width = `${avg}%`;
                        // Animate the bar
                        setTimeout(() => {
                            bar.style.transition = 'width 1s ease';
                        }, 100);
                    }
                });

                // Load patterns
                this.loadPatterns(logs);
                
                // Load weekly focus
                this.loadWeeklyFocus(pillars, pillarCount);
            }

            showEmptyInsights() {
                const patterns = document.getElementById('patterns-list');
                patterns.innerHTML = `
                    <div class="text-center py-5">
                        <i class="bi bi-graph-up-arrow text-muted" style="font-size: 3rem;"></i>
                        <h5 class="mt-3">No Data Yet</h5>
                        <p class="text-muted mb-4">Complete your first check-in to see insights</p>
                        <button class="btn btn-primary" onclick="app.navigate('checkin')">
                            Start First Check-in
                        </button>
                    </div>
                `;
            }

            loadPatterns(logs) {
                const container = document.getElementById('patterns-list');
                
                if (logs.length < 3) {
                    container.innerHTML = `
                        <div class="alert alert-info">
                            <i class="bi bi-info-circle me-2"></i>
                            Complete more check-ins to see pattern analysis
                        </div>
                    `;
                    return;
                }

                // Analyze patterns
                const lastWeek = logs.slice(0, 7);
                const avgScore = lastWeek.reduce((sum, log) => sum + log.score, 0) / lastWeek.length;
                const bestDay = lastWeek.reduce((best, log) => log.score > best.score ? log : best);
                const worstDay = lastWeek.reduce((worst, log) => log.score < worst.score ? log : worst);
                
                container.innerHTML = `
                    <div class="mb-3">
                        <div class="fw-medium mb-1">Weekly Average</div>
                        <div class="fs-4 text-gradient">${Math.round(avgScore)}</div>
                    </div>
                    <div class="mb-3">
                        <div class="fw-medium mb-1">Best Day</div>
                        <div>${new Date(bestDay.date).toLocaleDateString('en-US', { weekday: 'long' })} (${bestDay.score})</div>
                    </div>
                    <div class="mb-3">
                        <div class="fw-medium mb-1">Worst Day</div>
                        <div>${new Date(worstDay.date).toLocaleDateString('en-US', { weekday: 'long' })} (${worstDay.score})</div>
                    </div>
                    <div>
                        <div class="fw-medium mb-1">Trend</div>
                        <div>${avgScore >= 70 ? '📈 Improving' : avgScore >= 50 ? '↔ Stable' : '📉 Needs attention'}</div>
                    </div>
                `;
            }

            loadWeeklyFocus(pillars, count) {
                const averages = {};
                Object.keys(pillars).forEach(pillar => {
                    averages[pillar] = Math.round(pillars[pillar] / count);
                });

                // Find weakest pillar
                const weakest = Object.keys(averages).reduce((a, b) => averages[a] < averages[b] ? a : b);
                document.getElementById('focus-priority').textContent = weakest;

                // Generate action items
                const actions = {
                    Physical: [
                        'Increase daily exercise by 15 minutes',
                        'Review diet with veterinarian',
                        'Schedule annual check-up'
                    ],
                    Emotional: [
                        'Add 20 minutes of playtime daily',
                        'Try calming music or pheromones',
                        'Monitor for stress signals'
                    ],
                    Environment: [
                        'Clean and refresh bedding/litter',
                        'Check room temperature',
                        'Ensure quiet resting area'
                    ],
                    Enrichment: [
                        'Introduce new puzzle toy',
                        'Practice new trick',
                        'Arrange playdate'
                    ]
                };

                const actionList = document.getElementById('focus-actions');
                actionList.innerHTML = actions[weakest].map(action => `
                    <li class="mb-2">
                        <i class="bi bi-check-circle text-success me-2"></i>
                        ${action}
                    </li>
                `).join('');
            }

            refreshInsights() {
                this.loadInsights();
                this.showToast('Insights refreshed');
            }

            // ===== HEALTH PLAN =====
            loadHealthPlan() {
                const container = document.getElementById('health-schedule');
                const goals = document.getElementById('health-goals');
                
                if (!this.currentPet) {
                    container.innerHTML = `
                        <div class="text-center py-5">
                            <p class="text-muted">Select a pet to view health plan</p>
                        </div>
                    `;
                    goals.innerHTML = '';
                    return;
                }

                // Generate weekly schedule
                const schedule = [
                    { day: 'Monday', activity: 'Morning walk & playtime', time: '8:00 AM' },
                    { day: 'Tuesday', activity: 'Training session', time: '6:00 PM' },
                    { day: 'Wednesday', activity: 'Grooming & massage', time: '7:00 PM' },
                    { day: 'Thursday', activity: 'Socialization time', time: '5:00 PM' },
                    { day: 'Friday', activity: 'Long walk & exploration', time: '8:00 AM' },
                    { day: 'Saturday', activity: 'Playdate or park visit', time: '10:00 AM' },
                    { day: 'Sunday', activity: 'Rest & relaxation', time: 'All day' }
                ];

                container.innerHTML = schedule.map(item => `
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                        <div>
                            <div class="fw-medium">${item.day}</div>
                            <div class="text-muted small">${item.activity}</div>
                        </div>
                        <div class="text-muted">${item.time}</div>
                    </div>
                `).join('');

                // Set goals
                goals.innerHTML = `
                    <div class="mb-3">
                        <div class="fw-medium mb-1">Daily Exercise</div>
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar bg-primary" style="width: 75%"></div>
                        </div>
                        <div class="text-muted small">45/60 minutes</div>
                    </div>
                    <div class="mb-3">
                        <div class="fw-medium mb-1">Training Progress</div>
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar bg-success" style="width: 60%"></div>
                        </div>
                        <div class="text-muted small">3/5 commands mastered</div>
                    </div>
                    <div class="mb-3">
                        <div class="fw-medium mb-1">Weight Management</div>
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar bg-warning" style="width: 90%"></div>
                        </div>
                        <div class="text-muted small">Healthy weight maintained</div>
                    </div>
                `;
            }

            generateHealthPlan() {
                this.showToast('Generating personalized health plan...');
                setTimeout(() => {
                    this.loadHealthPlan();
                    this.showToast('Health plan generated successfully!');
                }, 1000);
            }

            // ===== UTILITIES =====
            showWelcome() {
                const hasVisited = localStorage.getItem('petqol_has_visited');
                if (!hasVisited) {
                    setTimeout(() => {
                        this.showToast('Welcome to PetQOL! Start by adding your first pet 🐾');
                    }, 1000);
                    localStorage.setItem('petqol_has_visited', 'true');
                }
            }

            // NEW FUNCTION: Dismiss Splash
            dismissSplash() {
                const splash = document.getElementById('splash-screen');
                if (splash) {
                    splash.classList.add('hidden');
                }
                localStorage.setItem('petqol_welcome_seen', 'true');
                // Optional: navigate to dashboard if not there (though init handles this)
                if (this.currentSection !== 'dashboard') {
                     this.navigate('dashboard');
                }
            }

            showToast(message, type = 'success') {
                const toastEl = document.getElementById('successToast');
                const toastBody = document.getElementById('toast-message');
                
                toastBody.textContent = message;
                
                const toast = new bootstrap.Toast(toastEl, {
                    delay: 3000
                });
                toast.show();
            }

            showNotification() {
                this.showToast('You have 3 unread notifications');
            }

            quickStats() {
                if (!this.currentPet) {
                    this.showToast('Select a pet first', 'error');
                    return;
                }
                this.navigate('insights');
            }

            exportAllData() {
                const data = {
                    pets: JSON.parse(localStorage.getItem('petqol_pets') || '[]'),
                    settings: {
                        theme: this.theme
                    },
                    exportedAt: new Date().toISOString()
                };

                // Add logs for each pet
                data.pets.forEach(pet => {
                    pet.logs = JSON.parse(localStorage.getItem(`petqol_logs_${pet.id}`) || '[]');
                });

                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `petqol-backup-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                URL.revokeObjectURL(url);
                
                this.showToast('All data exported successfully');
            }

            importData() {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                
                input.onchange = (e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    
                    reader.onload = (event) => {
                        try {
                            const data = JSON.parse(event.target.result);
                            
                            if (confirm('Import will replace current data. Continue?')) {
                                if (data.pets) {
                                    localStorage.setItem('petqol_pets', JSON.stringify(data.pets));
                                    data.pets.forEach(pet => {
                                        if (pet.logs) {
                                            localStorage.setItem(`petqol_logs_${pet.id}`, JSON.stringify(pet.logs));
                                        }
                                    });
                                }
                                
                                if (data.settings?.theme) {
                                    this.theme = data.settings.theme;
                                    this.applyTheme();
                                }
                                
                                this.init();
                                this.showToast('Data imported successfully');
                            }
                        } catch (error) {
                            this.showToast('Invalid backup file', 'error');
                        }
                    };
                    
                    reader.readAsText(file);
                };
                
                input.click();
            }

            resetData() {
                if (confirm('Are you sure? This will delete all data and cannot be undone.')) {
                    localStorage.clear();
                    this.init();
                    this.showToast('All data has been reset');
                }
            }

            setupEventListeners() {
                // Close sidebar when clicking outside on mobile (Overlay logic)
                document.addEventListener('click', (e) => {
                    const sidebar = document.querySelector('.sidebar');
                    const toggleBtn = document.querySelector('.header .btn-icon.btn-outline');
                    
                    if (window.innerWidth < 992 && document.body.classList.contains('sidebar-open')) {
                        if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                            this.toggleSidebar();
                        }
                    }
                });
            }
            
                saveSettings() {
                    // 1. جلب القيم من الحقول
                    const name = document.getElementById('setting-name').value.trim();
                    const email = document.getElementById('setting-email').value.trim();
            
                    // 2. التحقق من البيانات (Validation)
                    if (!name || !email) {
                        this.showToast('Please fill in both Name and Email', 'error');
                        return;
                    }
            
                    // 3. الحفظ في LocalStorage
                    localStorage.setItem('petqol_user_name', name);
                    localStorage.setItem('petqol_user_email', email);
            
                    // 4. تحديث الواجهة فوراً (Update UI)
                    this.updateUserProfile(name, email);
            
                    // 5. إظهار رسالة نجاح
                    this.showToast('Settings saved successfully! 🎉');
                }
                
                    updateUserProfile(name, email) {
                        // تحديث الاسم في القائمة الجانبية (Sidebar)
                        const sidebarNameElement = document.querySelector('.sidebar .fw-medium');
                        if (sidebarNameElement) {
                            sidebarNameElement.textContent = name;
                    }
                 }
        }

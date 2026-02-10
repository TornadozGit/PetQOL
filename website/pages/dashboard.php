<section id="dashboard" class="section active">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h1 class="display-2 mb-1">Welcome back 👋</h1>
            <p class="text-muted">Track your pet's wellness journey</p>
        </div>
        <div class="d-flex gap-2">
            <button class="btn btn-outline" onclick="app.quickStats()">
                <i class="bi bi-download me-2"></i> <span class="d-none d-sm-inline">Export</span>
            </button>
        </div>
    </div>

    <!-- Stats Overview -->
    <div class="stats-grid">
        <div class="card stat-card">
            <div class="stat-icon"><i class="bi bi-heart-pulse"></i></div>
            <div>
                <div class="text-muted small">Current Wellness</div>
                <div class="stat-value" id="dash-wellness">--</div>
                <div class="small text-muted" id="dash-wellness-status">Loading...</div>
            </div>
        </div>
        <div class="card stat-card">
            <div class="stat-icon"><i class="bi bi-calendar-check"></i></div>
            <div>
                <div class="text-muted small">Check-in Streak</div>
                <div class="stat-value" id="dash-streak">0</div>
                <div class="small text-muted">Days in a row</div>
            </div>
        </div>
        <div class="card stat-card">
            <div class="stat-icon"><i class="bi bi-graph-up"></i></div>
            <div>
                <div class="text-muted small">Weekly Trend</div>
                <div class="stat-value" id="dash-trend">--%</div>
                <div class="small text-muted">vs last week</div>
            </div>
        </div>
    </div>

    <!-- Wellness Progress & Focus -->
    <div class="row g-4 mb-4">
        <div class="col-lg-8">
            <div class="card p-4">
                <h5 class="mb-3">Wellness Progress</h5>
                <div class="d-flex flex-column flex-lg-row align-items-center align-items-lg-start justify-content-between gap-4">
                    <div class="wellness-ring">
                        <svg width="120" height="120" style="transform: rotate(-90deg);">
                            <circle cx="60" cy="60" r="54" stroke="var(--border)" stroke-width="8" fill="none"/>
                            <circle id="wellness-ring" cx="60" cy="60" r="54" stroke="var(--primary)" stroke-width="8" fill="none" stroke-dasharray="339" stroke-dashoffset="339" stroke-linecap="round"/>
                        </svg>
                        <div class="wellness-score" id="wellness-score">--</div>
                    </div>
                    <div class="flex-grow-1 w-100">
                        <h6 class="mb-3">Focus Areas</h6>
                        <div id="focus-areas">
                            <div class="d-flex align-items-center mb-2"><div class="progress flex-grow-1" style="height: 8px;"><div class="progress-bar bg-primary" style="width: 85%"></div></div><small class="ms-2 text-nowrap">Physical</small></div>
                            <div class="d-flex align-items-center mb-2"><div class="progress flex-grow-1" style="height: 8px;"><div class="progress-bar bg-success" style="width: 65%"></div></div><small class="ms-2 text-nowrap">Emotional</small></div>
                            <div class="d-flex align-items-center mb-2"><div class="progress flex-grow-1" style="height: 8px;"><div class="progress-bar bg-warning" style="width: 45%"></div></div><small class="ms-2 text-nowrap">Environment</small></div>
                            <div class="d-flex align-items-center"><div class="progress flex-grow-1" style="height: 8px;"><div class="progress-bar bg-info" style="width: 75%"></div></div><small class="ms-2 text-nowrap">Enrichment</small></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card p-4 h-100">
                <h5 class="mb-3">Quick Actions</h5>
                <div class="d-grid gap-2">
                    <button class="btn btn-primary" onclick="app.navigate('checkin')"><i class="bi bi-plus-circle me-2"></i> New Check-in</button>
                    <button class="btn btn-outline" onclick="app.navigate('health')"><i class="bi bi-heart me-2"></i> View Health Plan</button>
                    <button class="btn btn-outline" onclick="app.showAddPetModal()"><i class="fa-solid fa-paw me-2"></i> Add New Pet</button>
                    <button class="btn btn-outline" onclick="app.quickStats()"><i class="bi bi-graph-up me-2"></i> View Insights</button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Recent Activity -->
    <div class="card p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="mb-0">Recent Activity</h5>
            <a href="#" onclick="app.navigate('history')" class="text-primary text-decoration-none small">View All</a>
        </div>
        <div id="recent-activity"></div>
    </div>
</section>
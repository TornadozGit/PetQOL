<nav class="sidebar">
    <div class="sidebar-header">
        <div class="d-flex align-items-center gap-2 mb-3">
            <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                <i class="fa-solid fa-paw text-white"></i>
            </div>
            <div>
                <h4 class="mb-0 fw-bold">PetQOL</h4>
                <small class="text-muted">Pet Wellness Tracker</small>
            </div>
        </div>
    </div>

    <div class="nav-items flex-grow-1">
        <div class="nav-item"><a href="#" onclick="app.navigate('dashboard')" class="nav-link active"><i class="bi bi-speedometer2"></i><span>Dashboard</span></a></div>
        <div class="nav-item"><a href="#" onclick="app.navigate('pets')" class="nav-link"><i class="fa-solid fa-paw"></i><span>My Pets</span></a></div>
        <div class="nav-item"><a href="#" onclick="app.navigate('checkin')" class="nav-link"><i class="bi bi-heart-pulse"></i><span>Check-in</span></a></div>
        <div class="nav-item"><a href="#" onclick="app.navigate('history')" class="nav-link"><i class="bi bi-clock-history"></i><span>History</span></a></div>
        <div class="nav-item"><a href="#" onclick="app.navigate('insights')" class="nav-link"><i class="bi bi-graph-up-arrow"></i><span>Insights</span></a></div>
        <div class="nav-item"><a href="#" onclick="app.navigate('health')" class="nav-link"><i class="bi bi-heart"></i><span>Health Plan</span></a></div>
        
        <!-- Premium Link -->
        <div class="nav-item mt-3">
            <a href="#" onclick="app.navigate('premium')" class="nav-link" style="background: rgba(245, 158, 11, 0.1); color: #B45309;">
                <i class="bi bi-gem text-warning"></i>
                <span>Premium Plan</span>
            </a>
        </div>

        <div class="nav-item"><a href="#" onclick="app.navigate('settings')" class="nav-link"><i class="bi bi-gear"></i><span>Settings</span></a></div>
    </div>

    <div class="mt-auto pt-4 border-top">
        <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-2">
                <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width: 36px; height: 36px;"><i class="bi bi-person"></i></div>
                <div><div class="small fw-medium">Alex Johnson</div><div class="small text-muted">Pet Parent</div></div>
            </div>
            <button class="btn btn-icon btn-outline" onclick="app.toggleTheme()"><i class="bi bi-moon-stars"></i></button>
        </div>
    </div>
</nav>
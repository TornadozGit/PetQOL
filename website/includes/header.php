<header class="header">
    <div class="d-flex align-items-center gap-3">
        <button class="btn btn-icon btn-outline d-lg-none" onclick="app.toggleSidebar()"><i class="bi bi-list"></i></button>
        <div class="dropdown">
            <button class="btn btn-outline d-flex align-items-center gap-2" data-bs-toggle="dropdown">
                <i class="fa-solid fa-paw"></i>
                <span id="current-pet-name" class="text-truncate" style="max-width: 120px;">Select Pet</span>
                <i class="bi bi-chevron-down"></i>
            </button>
            <ul class="dropdown-menu" id="pet-dropdown-list"></ul>
        </div>
    </div>
    <div class="header-actions">
        <button class="btn btn-icon btn-outline position-relative" onclick="app.showNotification()">
            <i class="bi bi-bell"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger p-1">3</span>
        </button>
        <button class="btn btn-primary d-none d-sm-inline-flex" onclick="app.navigate('checkin')">
            <i class="bi bi-plus-circle me-2"></i> New Check-in
        </button>
        <button class="btn btn-primary btn-icon d-sm-none" onclick="app.navigate('checkin')">
            <i class="bi bi-plus-lg"></i>
        </button>
    </div>
</header>
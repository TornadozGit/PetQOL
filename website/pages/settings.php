<section id="settings" class="section">
    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 gap-3">
        <div>
            <h2 class="display-2 mb-1">Settings</h2>
            <p class="text-muted">Manage your account and preferences</p>
        </div>
    </div>

    <div class="row g-4">
        <div class="col-lg-6">
            <div class="card p-4">
                <h5 class="mb-4">Account</h5>
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" id="setting-name" value="Alex Johnson">
                </div>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" id="setting-email" value="alex@example.com">
                </div>
                <button class="btn btn-primary" onclick="app.saveSettings()">Save Changes</button>
            </div>
        </div>

        <div class="col-lg-6">
            <div class="card p-4">
                <h5 class="mb-4">Preferences</h5>
                <div class="form-check form-switch mb-3">
                    <input class="form-check-input" type="checkbox" id="notifications" checked>
                    <label class="form-check-label" for="notifications">Enable notifications</label>
                </div>
                <div class="form-check form-switch mb-3">
                    <input class="form-check-input" type="checkbox" id="dark-mode" onchange="app.toggleTheme()">
                    <label class="form-check-label" for="dark-mode">Dark mode</label>
                </div>
                <div class="mb-3">
                    <label class="form-label">Check-in Reminders</label>
                    <select class="form-select">
                        <option>Daily at 9:00 AM</option>
                        <option>Daily at 6:00 PM</option>
                        <option>Twice daily</option>
                        <option>None</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card p-4">
                <h5 class="mb-4">Data Management</h5>
                <div class="d-flex flex-wrap gap-3">
                    <button class="btn btn-outline" onclick="app.exportAllData()">
                        <i class="bi bi-download me-2"></i> Export All Data
                    </button>
                    <button class="btn btn-outline" onclick="app.importData()">
                        <i class="bi bi-upload me-2"></i> Import Data
                    </button>
                    <button class="btn btn-outline text-danger" onclick="app.resetData()">
                        <i class="bi bi-trash me-2"></i> Reset All Data
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>
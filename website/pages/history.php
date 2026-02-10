<section id="history" class="section">
    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 gap-3">
        <div>
            <h2 class="display-2 mb-1">Check-in History</h2>
            <p class="text-muted">Track your pet's wellness journey</p>
        </div>
        <div class="d-flex gap-2">
            <button class="btn btn-outline" onclick="app.exportHistory()">
                <i class="bi bi-download me-2"></i> Export
            </button>
        </div>
    </div>

    <div class="card p-0 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover mb-0 align-middle">
                <thead class="bg-light">
                    <tr>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Status</th>
                        <th>Mood</th>
                        <th class="d-none d-md-table-cell">Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="history-table">
                    <!-- Filled by JavaScript -->
                </tbody>
            </table>
        </div>
    </div>
</section>
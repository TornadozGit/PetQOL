<section id="health" class="section">
    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 gap-3">
        <div>
            <h2 class="display-2 mb-1">Health Plan</h2>
            <p class="text-muted">Personalized wellness roadmap</p>
        </div>
        <button class="btn btn-primary" onclick="app.generateHealthPlan()">
            <i class="bi bi-file-earmark-plus me-2"></i> Generate Plan
        </button>
    </div>

    <div class="row g-4">
        <div class="col-lg-8">
            <div class="card p-4">
                <h5 class="mb-4">Weekly Schedule</h5>
                <div id="health-schedule">
                    <!-- Filled by JavaScript -->
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card p-4">
                <h5 class="mb-4">Health Goals</h5>
                <div id="health-goals">
                    <!-- Filled by JavaScript -->
                </div>
            </div>
        </div>
    </div>
</section>